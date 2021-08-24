import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import process from 'process';

const url = process.env.URL;

export default handleAuth({
    async login(req, res) {
        let referedPath = req.headers.referer.replace(url, "");
        if (referedPath === "/" || referedPath === "") {
            referedPath = "/records";
        }

        try {
            await handleLogin(req, res, {
                returnTo: referedPath 
            });
        } catch (error) {
            res.status(error.sdtatus || 500).end(error.message);
        }
    }
});