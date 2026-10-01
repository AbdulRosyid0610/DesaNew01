const db = require('../Config/db');

exports.getStats = async (req, res) => {
  try {
    const query = (sql) => new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    const totalWarga = await query("SELECT COUNT(*) as total FROM warga");
    const totalUmkm = await query("SELECT COUNT(*) as total FROM umkm");
    const umkmAktif = await query("SELECT COUNT(*) as total FROM umkm WHERE status = 'Aktif'");
    const totalBerita = await query("SELECT COUNT(*) as total FROM berita");
    const totalPengaduan = await query("SELECT COUNT(*) as total FROM pengaduan");

    res.json({
      warga: { total: totalWarga[0].total },
      umkm: { total: totalUmkm[0].total, aktif: umkmAktif[0].total },
      berita: { total: totalBerita[0].total },
      pengaduan: { total: totalPengaduan[0].total },
    });
  } catch (error) {
    console.error("Error ambil statistik dashboard:", error);
    res.status(500).json({ message: "Gagal mengambil statistik dashboard" });
  }
};