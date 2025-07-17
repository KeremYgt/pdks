const db  = require('../../db');
const { CRUD } = require('../../db/MongoDB');


module.exports = async (req, res) => {
  try {
    const { user_id, name, surname } = req.body;

    // Gerekli alan kontrolü
    if (!user_id || !name || !surname) {
      return res.status(400).json({ status: false, message: 'ID, ad ve soyad girilmelidir' });
    }

    // Silme işlemi
    const result = await new CRUD('pdks', 'users').deleteOne(
      {
      user_id,
      name,
      surname
    }
  );

    if (result && result.deletedCount === 0) {
      return res.status(404).json({ status: false, message: 'Kullanıcı bulunamadı veya bilgiler uyuşmuyor' });
    }

    res.json({ status: true, message: 'Kullanıcı başarıyla silindi' });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Silme sırasında sunucu hatası oluştu' });
  }
};
