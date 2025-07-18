const  db  = require('../../db');
const { CONFIG } = require('../../constants');


module.exports = async (req, res) => {
  try {
    const { email, password, name, role, surname, telefon, user_id, office_id, project_id } = req.body;

    if (!email || !password || !name || !surname || !telefon || !user_id || !office_id || !role ||!project_id) {
      return res.status(400).json({ status: false, message: 'Tüm alanlar zorunludur.' });
    }

    // Aynı email ile kullanıcı var mı kontrolü
    const existingUser = await new db.MongoDB.CRUD('pdks', 'users').find({ email }, [0, 1]);
    if (existingUser.length > 0) {
      return res.status(409).json({ status: false, message: 'Bu email zaten kayıtlı.' });
    }
    // Aynı user id ile kullanıcı var mı kontrolü
    const existingUserByUserId = await new db.MongoDB.CRUD('pdks', 'users').find({ user_id }, [0, 1]);
    if (existingUserByUserId.length > 0) {
      return res.status(409).json({ status: false, message: 'Bu user_id zaten kullanılıyor.' });
    }
    
    const newUser = {
		  name,
		  surname,
     	email,
	  	telefon,
	  	password,
	  	user_id,
	  	office_id,
	  	role,
	  	project_id,
      created_at: new Date(),
    };

    await new db.MongoDB.CRUD('pdks', 'users').insert(newUser);

    res.json({ status: true, message: 'Kullanıcı başarıyla eklendi.', data: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Kullanıcı eklenemedi.' });
  }
};
