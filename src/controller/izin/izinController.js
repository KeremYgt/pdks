

module.exports = {
    createIzin: async (req, res) => {
        try {
            const { user_id, izin_baslangic_tarihi, izin_bitis_tarihi } = req.body;
            if (!user_id || !izin_baslangic_tarihi || !izin_bitis_tarihi) {
                return res.status(400).json({ status: false, message: "Eksik bilgi!" });
            }

            const izin = await izinRepository.create({ user_id, izin_baslangic_tarihi, izin_bitis });
            return res.status(200).json({ status: true, message: "İzin oluşturuldu", result: izin });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Sunucu hatası", error });
        }
    },

    getAllIzin: async (req, res) => {
        try {
            const izinler = await izinRepository.getAll();
            return res.status(200).json({ status: true, result: izinler });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Sunucu hatası", error });
        }
    }
};
