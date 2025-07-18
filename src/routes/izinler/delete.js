const db = require('../../db');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
  try {
    const izinId = req.params.id;

    const result = await new db.MongoDB.CRUD('pdks', 'izinler').delete({ _id: new ObjectId(izinId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ status: false, message: 'İzin bulunamadı.' });
    }

    res.json({ status: true, message: 'İzin silindi.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Silme işlemi başarısız.' });
  }
};
