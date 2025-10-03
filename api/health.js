// /api/health.js
module.exports = async (req, res) => {
  try {
    const hasUrl = !!process.env.SUPABASE_URL;
    const hasKey = !!process.env.SUPABASE_SERVICE_KEY;
    res.status(200).json({
      ok: true,
      runtime: "node",
      hasUrl,
      hasKey
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};
