export default async function handler(req, res) {
    const response = await fetch(req.query.url);
    const data = await response.text();
    res.json({ content: data });
}