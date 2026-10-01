const db = require('../Config/db');

// 1. TAMBAH UMKM
exports.tambahUmkm = (req, res) => {
  const { nama_usaha, pemilik, kategori, produk, deskripsi, alamat, rt, rw, no_hp, tahun_berdiri, jumlah_produk, harga_mulai, foto, status } = req.body;

  const query = `INSERT INTO umkm 
    (nama_usaha, pemilik, kategori, produk, deskripsi, alamat, rt, rw, no_hp, tahun_berdiri, jumlah_produk, harga_mulai, foto, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [nama_usaha, pemilik, kategori, produk, deskripsi, alamat, rt, rw, no_hp, tahun_berdiri, jumlah_produk, harga_mulai, foto, status || 'Aktif'];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error tambah UMKM:", err);
      return res.status(500).json({ message: "Gagal menyimpan data UMKM" });
    }
    res.status(201).json({ message: "Data UMKM berhasil disimpan!", id: result.insertId });
  });
};

// 2. AMBIL SEMUA UMKM
exports.getAllUmkm = (req, res) => {
  db.query("SELECT * FROM umkm ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("Error ambil UMKM:", err);
      return res.status(500).json({ message: "Gagal mengambil data UMKM" });
    }
    res.json(results);
  });
};

// 3. UPDATE UMKM
exports.updateUmkm = (req, res) => {
  const { id } = req.params;
  const { nama_usaha, pemilik, kategori, produk, deskripsi, alamat, rt, rw, no_hp, tahun_berdiri, jumlah_produk, harga_mulai, foto, status } = req.body;

  const query = `UPDATE umkm SET 
    nama_usaha=?, pemilik=?, kategori=?, produk=?, deskripsi=?, alamat=?, rt=?, rw=?, no_hp=?, tahun_berdiri=?, jumlah_produk=?, harga_mulai=?, foto=?, status=? 
    WHERE id=?`;

  const values = [nama_usaha, pemilik, kategori, produk, deskripsi, alamat, rt, rw, no_hp, tahun_berdiri, jumlah_produk, harga_mulai, foto, status, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error update UMKM:", err);
      return res.status(500).json({ message: "Gagal mengupdate data UMKM" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data UMKM tidak ditemukan" });
    }
    res.json({ message: "Data UMKM berhasil diperbarui!" });
  });
};

// 4. HAPUS UMKM
exports.deleteUmkm = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM umkm WHERE id=?", [id], (err, result) => {
    if (err) {
      console.error("Error hapus UMKM:", err);
      return res.status(500).json({ message: "Gagal menghapus data UMKM" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data UMKM tidak ditemukan" });
    }
    res.json({ message: "Data UMKM berhasil dihapus!" });
  });
};