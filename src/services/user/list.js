const db= require('../../db');

module.exports = async (req, res) => {
  try {
    const users = await new db.MongoDB.CRUD('pdks', 'users').find({}, [0, 100]);
    res.json({ status: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Kullanıcılar alınamadı.' });
  }
};
