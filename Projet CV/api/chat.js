// api/chat.js — Vercel Serverless Function (CommonJS)
//
// ╔══════════════════════════════════════════════════════╗
// ║  SETUP VERCEL (à faire UNE SEULE FOIS) :            ║
// ║  1. vercel.com → ton projet → Settings              ║
// ║  2. Environment Variables → Add New                 ║
// ║  3. Key:   ANTHROPIC_API_KEY                        ║
// ║     Value: sk-ant-api03-xxxxxxxx  (ta clé)          ║
// ║  4. Clique "Save" puis redéploie le projet          ║
// ╚══════════════════════════════════════════════════════╝

module.exports = async function handler(req, res) {

    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { messages, systemPrompt } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Invalid or missing messages array' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        console.error('[chat.js] ANTHROPIC_API_KEY is not set');
        return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured on Vercel' });
    }

    try {
        const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 350,
                system: systemPrompt || 'Tu es un assistant utile.',
                messages: messages.slice(-8)
            })
        });

        const data = await anthropicRes.json();

        if (!anthropicRes.ok) {
            console.error('[chat.js] Anthropic error:', data);
            return res.status(anthropicRes.status).json({ error: data?.error?.message || 'Anthropic API error' });
        }

        const reply = data?.content?.[0]?.text || '';
        return res.status(200).json({ reply });

    } catch (err) {
        console.error('[chat.js] Fetch error:', err.message);
        return res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
};
