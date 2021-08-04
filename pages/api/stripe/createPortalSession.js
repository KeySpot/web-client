import process from 'process';

import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import stripeConfig from 'stripe';

import getToken from '../../../lib/token';

const stripe = stripeConfig(process.env.STRIPE_SECRET_KEY);
const origin = process.env.URL;
const apiUrl = process.env.API_URL;

export default withApiAuthRequired(async function handler(req, res) {
    const { user } = getSession(req, res);
    
    const token = await getToken();
    const returnUrl = origin;

    const response = await fetch(`${apiUrl}/subscriptions/${user.sub}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    const customerId = data ? data.customerId : null;

    if (customerId) {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl,
        });
    
        res.redirect(303, portalSession.url);
    } else {
        res.redirect('/api/stripe/createCheckoutSession');
    }
});