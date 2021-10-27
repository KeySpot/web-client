import process from 'process';

const apiUrl = process.env.API_URL;

export default async function handler(req, res) {
    try {
        switch (req.method.toLowerCase()) {
            case 'get':
                const response = await fetch(`${apiUrl}/${req.query.accessKey}?name=true`);
                const data = await response.json();
                res.json(data);
                break;
            case 'patch':
                await fetch(`${apiUrl}/${req.query.accessKey}${Object.keys(req.query).length > 0 ? '?' + Object.entries(req.query).map(kvp => `${kvp[0]}=${kvp[1]}`).join('&') : ''}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(req.body),
                });
                res.status(200);
                res.send();
                break;
        }
    }
    catch (error) {
        res.status(400);
        res.send();
    }
};