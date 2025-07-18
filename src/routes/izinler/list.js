const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const izinler = await new db.MongoDB.CRUD('pdks', 'izinler').find({}, [0, 100]);
    res.json({ status: true, data: izinler });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'İzinler listelenemedi.' });
  }
};
