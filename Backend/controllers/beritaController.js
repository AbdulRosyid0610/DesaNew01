const db = require('../Config/db');

// 1. TAMBAH BERITA
exports.tambahBerita = (req, res) => {
  const { judul, kategori, tanggal, deskripsi, isi_lengkap, gambar } = req.body;

  const query = `INSERT INTO berita 
    (judul, kategori, tanggal, deskripsi, isi_lengkap, gambar) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    judul, kategori, tanggal || new Date().toISOString().split('T')[0],
    deskripsi, isi_lengkap, gambar || ''
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error tambah berita:", err);
      return res.status(500).json({ message: "Gagal menyimpan berita" });
    }
    res.status(201).json({ message: "Berita berhasil disimpan!", id: result.insertId });
  });
};

// 2. AMBIL SEMUA BERITA
exports.getAllBerita = (req, res) => {
  db.query("SELECT * FROM berita ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("Error ambil berita:", err);
      return res.status(500).json({ message: "Gagal mengambil data berita" });
    }
    res.json(results);
  });
};

// 3. UPDATE BERITA
exports.updateBerita = (req, res) => {
  const { id } = req.params;
  const { judul, kategori, tanggal, deskripsi, isi_lengkap, gambar } = req.body;

  const query = `UPDATE berita SET 
    judul=?, kategori=?, tanggal=?, deskripsi=?, isi_lengkap=?, gambar=? 
    WHERE id=?`;

  const values = [judul, kategori, tanggal, deskripsi, isi_lengkap, gambar, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error update berita:", err);
      return res.status(500).json({ message: "Gagal mengupdate berita" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }
    res.json({ message: "Berita berhasil diperbarui!" });
  });
};

// 4. HAPUS BERITA
exports.deleteBerita = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM berita WHERE id=?", [id], (err, result) => {
    if (err) {
      console.error("Error hapus berita:", err);
      return res.status(500).json({ message: "Gagal menghapus berita" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }
    res.json({ message: "Berita berhasil dihapus!" });
  });
};