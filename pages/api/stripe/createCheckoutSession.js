import process from 'process';

import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import stripeConfig from 'stripe';

const stripe = stripeConfig(process.env.STRIPE_SECRET_KEY);
const origin = process.env.URL;

export default withApiAuthRequired(async function handler(req, res) {
    const { user } = getSession(req, res);
    const priceId = process.env.STRIPE_PRICE_ID;

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        metadata: {
            sub: user.sub,
        },
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${origin}/records?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/`,
    });
    
    res.redirect(303, session.url);
});