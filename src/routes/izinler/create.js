const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { user_id, izin_baslangic_tarihi, izin_bitis_tarihi, aciklama } = req.body;

    if (!user_id || !izin_baslangic_tarihi || !izin_bitis_tarihi) {
      return res.status(400).json({ status: false, message: 'Tüm alanlar zorunludur.' });
    }

    const newIzin = {
      user_id,
      izin_baslangic_tarihi: new Date(izin_baslangic_tarihi),
      izin_bitis_tarihi: new Date(izin_bitis_tarihi),
      aciklama: aciklama || '',
      created_at: new Date(),
    };

    await new db.MongoDB.CRUD('pdks', 'izinler').insert(newIzin);

    res.status(201).json({ status: true, message: 'İzin eklendi', data: newIzin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'İzin eklenemedi.' });
  }
};
