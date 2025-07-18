const db = require('../../db');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
  try {
    const izinId = req.params.id;
    const { izin_baslangic_tarihi, izin_bitis_tarihi, aciklama } = req.body;

    const updateData = {
      ...(izin_baslangic_tarihi && { izin_baslangic_tarihi: new Date(izin_baslangic_tarihi) }),
      ...(izin_bitis_tarihi && { izin_bitis_tarihi: new Date(izin_bitis_tarihi) }),
      ...(aciklama && { aciklama }),
    };

    const result = await new db.MongoDB.CRUD('pdks', 'izinler').update({ _id: new ObjectId(izinId) }, updateData);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ status: false, message: 'İzin bulunamadı veya zaten aynı.' });
    }

    res.json({ status: true, message: 'İzin güncellendi.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Güncelleme başarısız.' });
  }
};
