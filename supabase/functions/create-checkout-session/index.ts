// Deno Supabase Edge Function: create-checkout-session
// Creates a Stripe Checkout Session for one-time $2.99 purchase
// Associates session with the authenticated Supabase user and persists identifiers

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.17.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Json = Record<string, unknown> | Array<unknown> | string | number | boolean | null;

function jsonResponse(body: Json, status = 200, origin?: string) {
    const headers = new Headers({
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "Vary": "Origin",
    });
    if (origin) {
        headers.set("Access-Control-Allow-Origin", origin);
        headers.set("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type");
        headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    }
    return new Response(JSON.stringify(body), { status, headers });
}

serve(async (req: Request) => {
    const origin = req.headers.get("origin") ?? "https://www.bestpartygames.net";

    if (req.method === "OPTIONS") {
        return jsonResponse({ ok: true }, 200, origin);
    }

    if (req.method !== "POST") {
        return jsonResponse({ error: "Method not allowed" }, 405, origin);
    }

    try {
        const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
        const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");

        if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !STRIPE_SECRET_KEY) {
            return jsonResponse({ error: "Missing server configuration" }, 500, origin);
        }

        const stripe = new Stripe(STRIPE_SECRET_KEY, {
            apiVersion: "2024-06-20",
        } as any);

        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return jsonResponse({ error: "Missing Authorization header" }, 401, origin);
        }

        // Create an admin client to verify JWT and update DB with service role
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
            global: {
                headers: { Authorization: authHeader },
            },
        });

        // Verify the authenticated user
        const { data: userResult, error: userErr } = await supabase.auth.getUser();
        if (userErr || !userResult?.user) {
            return jsonResponse({ error: "Unauthorized" }, 401, origin);
        }

        const userId = userResult.user.id;
        const userEmail = userResult.user.email ?? undefined;

        // Load existing user profile to get stripe_customer_id
        const { data: profile, error: profileErr } = await supabase
            .from("users")
            .select("id, stripe_customer_id")
            .eq("id", userId)
            .single();

        if (profileErr) {
            return jsonResponse({ error: "User profile not found" }, 400, origin);
        }

        let customerId = profile?.stripe_customer_id as string | null | undefined;

        // Create Stripe customer if not exists
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: userEmail,
                metadata: { supabase_user_id: userId },
            });
            customerId = customer.id;

            // Persist customer id
            const { error: updateErr } = await supabase
                .from("users")
                .update({ stripe_customer_id: customerId })
                .eq("id", userId);
            if (updateErr) {
                // Not fatal to session creation, but reportable
                console.error("Failed to persist stripe_customer_id", updateErr);
            }
        }

        // Price is provided by the user as Stripe price id
        const PRICE_ID = "price_1SA5RpPPNczvU2jzoJC0k1Oy"; // $2.99 one-time

        const successUrl = `${origin.replace(/\/$/, "")}/premium-success.html?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${origin.replace(/\/$/, "")}/premium.html`;

        // Parse optional coupon or promotion_code
        const body = await req.json().catch(() => ({}));
        const userCoupon: string | undefined = (body && typeof body.coupon === 'string') ? body.coupon : undefined;
        const userPromotionCode: string | undefined = (body && typeof body.promotion_code === 'string') ? body.promotion_code : undefined;

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            customer: customerId!,
            line_items: [
                { price: PRICE_ID, quantity: 1 },
            ],
            // Let Stripe Checkout show the promotion code field
            allow_promotion_codes: true,
            // Pre-apply coupon/promotion if provided
            discounts: userPromotionCode || userCoupon ? [
                userPromotionCode ? { promotion_code: userPromotionCode } : { coupon: userCoupon! }
            ] : undefined,
            success_url: successUrl,
            cancel_url: cancelUrl,
            client_reference_id: userId,
            metadata: {
                supabase_user_id: userId,
                email: userEmail ?? "",
            },
        });

        // Persist session id to correlate in webhook
        const { error: sessErr } = await supabase
            .from("users")
            .update({ stripe_session_id: session.id })
            .eq("id", userId);
        if (sessErr) {
            console.error("Failed to persist stripe_session_id", sessErr);
        }

        return jsonResponse({ url: session.url }, 200, origin);
    } catch (err) {
        console.error("create-checkout-session error", err);
        return jsonResponse({ error: "Internal server error" }, 500, req.headers.get("origin") ?? undefined);
    }
});


