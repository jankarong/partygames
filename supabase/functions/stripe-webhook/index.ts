// Deno Supabase Edge Function: stripe-webhook
// Handles Stripe webhook events and updates Supabase user premium status

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.17.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function textResponse(body: string, status = 200) {
    return new Response(body, {
        status,
        headers: { "Content-Type": "text/plain" },
    });
}

serve(async (req: Request) => {
    if (req.method !== "POST") {
        return textResponse("Method not allowed", 405);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
        console.error("Missing server configuration envs");
        return textResponse("Server not configured", 500);
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
        apiVersion: "2024-06-20",
    } as any);

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
        return textResponse("Missing Stripe-Signature", 400);
    }
    const rawBody = await req.text();

    let event: Stripe.Event;
    try {
        // Use async variant required by Deno runtime
        event = await stripe.webhooks.constructEventAsync(rawBody, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook signature verification failed", err);
        return textResponse("Invalid signature", 400);
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const sessionId = session.id;
            const stripeCustomerId = typeof session.customer === "string" ? session.customer : session.customer?.id;

            // Try correlate by saved stripe_session_id first
            const { data: userBySession } = await supabaseAdmin
                .from("users")
                .select("id, stripe_customer_id")
                .eq("stripe_session_id", sessionId)
                .maybeSingle();

            let userId: string | undefined = userBySession?.id as string | undefined;

            if (!userId && stripeCustomerId) {
                // Fallback: correlate via customer id
                const { data: userByCustomer } = await supabaseAdmin
                    .from("users")
                    .select("id")
                    .eq("stripe_customer_id", stripeCustomerId)
                    .maybeSingle();
                userId = userByCustomer?.id as string | undefined;
            }

            if (!userId) {
                // Last fallback: client_reference_id
                if (session.client_reference_id) {
                    userId = session.client_reference_id;
                }
            }

            if (!userId) {
                console.error("Unable to correlate user for session", sessionId);
                return textResponse("No user found", 200);
            }

            const updates: Record<string, unknown> = {
                is_premium: true,
                premium_purchased_at: new Date().toISOString(),
            };
            if (stripeCustomerId) {
                updates["stripe_customer_id"] = stripeCustomerId;
            }

            const { error: upErr } = await supabaseAdmin
                .from("users")
                .update(updates)
                .eq("id", userId);
            if (upErr) {
                console.error("Failed to update premium status", upErr);
                return textResponse("Failed to update", 500);
            }
        }

        // For idempotency and other events we simply 200 OK
        return textResponse("ok", 200);
    } catch (err) {
        console.error("Webhook handler error", err);
        return textResponse("server error", 500);
    }
});



