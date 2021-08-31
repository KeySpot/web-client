import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import process from 'process';
import getToken from '../../../lib/token';

const apiUrl = process.env.API_URL;

export default withApiAuthRequired(async function handler(req, res) {
    const { user } = getSession(req, res);
    const token = await getToken();

    try {
        const response = await fetch(`${apiUrl}/records/${user.sub}/${req.query.accessKey}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        res.status(200);
        res.send();
    } catch (error) {
        res.status(400);
        res.send();
    }
});