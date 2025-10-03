// /api/players.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  // Basic CORS (ok for testing; tighten origin later)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;

    if (!payload?.username) {
      return res.status(400).json({ error: 'username required' });
    }

    // Temporary debug logs (remove later)
    console.log('ENV URL exists:', !!process.env.SUPABASE_URL);
    console.log('ENV KEY exists:', !!process.env.SUPABASE_SERVICE_KEY);
    console.log('Incoming payload:', payload);

    const { error } = await supabase
      .from('players')
      .upsert(payload, { onConflict: 'username' });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({ error: error.message });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('API error:', e);
    return res.status(500).json({ error: e.message });
  }
};
