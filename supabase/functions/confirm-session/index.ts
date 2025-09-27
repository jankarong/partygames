// Deno Supabase Edge Function: confirm-session
// Given a Stripe Checkout session_id, verify completion and mark user premium

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.17.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function json(body: unknown, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return json({ ok: true }, 200);
    }
    if (req.method !== "POST") {
        return json({ error: "Method not allowed" }, 405);
    }
    try {
        const { session_id } = await req.json();
        if (!session_id) return json({ error: "Missing session_id" }, 400);

        const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
        const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
        if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !STRIPE_SECRET_KEY) {
            return json({ error: "Server not configured" }, 500);
        }

        const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" } as any);
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

        const session = await stripe.checkout.sessions.retrieve(session_id);
        if (!session) return json({ error: "Session not found" }, 404);

        const stripeCustomerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
        const refUserId = (session.client_reference_id as string | null) || undefined;

        if (session.status !== "complete" && session.payment_status !== "paid") {
            return json({ status: session.status, payment_status: session.payment_status }, 200);
        }

        // Resolve user id
        let userId: string | undefined = refUserId;
        if (!userId) {
            const { data: bySession } = await supabase
                .from("users")
                .select("id")
                .eq("stripe_session_id", session.id)
                .maybeSingle();
            userId = bySession?.id as string | undefined;
        }
        if (!userId && stripeCustomerId) {
            const { data: byCustomer } = await supabase
                .from("users")
                .select("id")
                .eq("stripe_customer_id", stripeCustomerId)
                .maybeSingle();
            userId = byCustomer?.id as string | undefined;
        }
        if (!userId) return json({ error: "User not found for session" }, 404);

        const updates: Record<string, unknown> = {
            is_premium: true,
            premium_purchased_at: new Date().toISOString(),
        };
        if (stripeCustomerId) updates["stripe_customer_id"] = stripeCustomerId;

        const { error: upErr } = await supabase.from("users").update(updates).eq("id", userId);
        if (upErr) return json({ error: "Failed to update" }, 500);

        return json({ ok: true });
    } catch (e) {
        console.error(e);
        return json({ error: "Server error" }, 500);
    }
});



