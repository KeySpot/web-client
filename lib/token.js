const apiJwtIssuer = process.env.API_JWT_ISSUER;
const clientId = process.env.AUTH0_CLIENT_ID;
const clientSecret = process.env.AUTH0_CLIENT_SECRET;
const apiAudience = process.env.API_AUDIENCE;

let token = null;

async function fetchApiToken() {
    const response = await fetch(`${apiJwtIssuer}/oauth/token`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            'client_id': clientId,
            'client_secret': clientSecret,
            'audience': apiAudience,
            'grant_type': 'client_credentials'
        })
    });
    
    return (await response.json()).access_token;
}

export default async function getToken() {
    if (!token) {
        token = await fetchApiToken();
    }

    return token;
};