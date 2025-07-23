const db = require('../../db');

module.exports.kontrolEt = async (req, res) => {
  const { user_id, terminal_id } = req.body;

  if (!user_id || !terminal_id) {
    return res.status(400).json({ status: false, message: 'user id ve terminal id zorunludur' });
  }

  try {
    const izinKaydi = await new db.MongoDB.CRUD('pdks', 'terminalizin').find({ user_id, terminal_id });

    if (izinKaydi.length > 0) {
      return res.json({ status: true, message: 'Girişe izin verildi.' });
    } else {
      return res.status(403).json({ status: false, message: 'Bu terminal için izniniz yok.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Sunucu hatası.' });
  }
};
