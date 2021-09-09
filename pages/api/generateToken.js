import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import process from 'process';
import getToken from '../../lib/token';

const apiUrl = process.env.API_URL;

export default withApiAuthRequired(async function handler(req, res) {
    const { user } = getSession(req, res);
    const auth0Token = await getToken();

    const response = await fetch(`${apiUrl}/tokens/${user.sub}`, {
        headers: {
            Authorization: `Bearer ${auth0Token}`
        }
    });

    const cliToken = await response.json();
    res.json({token: cliToken});
});