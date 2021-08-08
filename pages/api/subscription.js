import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
    const { user } = getSession(req, res);

    if (user) {
        res.redirect('/api/stripe/createPortalSession');
    } else {
        res.redirect('/api/auth/login');
    }
};