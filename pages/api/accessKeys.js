import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import process from 'process';
import getToken from '../../lib/token';

const apiUrl = process.env.API_URL;

export default withApiAuthRequired(async function handler(req, res) {
    const { user } = getSession(req, res);
    const token = await getToken();

    const response = await fetch(`${apiUrl}/records/accessKeys/${user.sub}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    
    res.json(data);
});