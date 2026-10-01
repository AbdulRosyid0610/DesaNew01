const db = require('../Config/db');

// ==========================================
// 1. TAMBAH WARGA (POST)
// ==========================================
exports.tambahWarga = (req, res) => {
  const { 
    nik, no_kk, nama_lengkap, tempat_lahir, tgl_lahir, jk, alamat, 
    rt, rw, dusun, agama, status_perkawinan, pendidikan, pekerjaan, status_warga, no_hp 
  } = req.body;

  const query = `INSERT INTO warga 
    (nik, no_kk, nama_lengkap, tempat_lahir, tgl_lahir, jk, alamat, rt, rw, dusun, agama, status_perkawinan, pendidikan, pekerjaan, status_warga, no_hp) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    nik, no_kk, nama_lengkap, tempat_lahir, tgl_lahir, jk, alamat, 
    rt, rw, dusun, agama, status_perkawinan, pendidikan, pekerjaan, status_warga, no_hp
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error tambah warga:", err);
      return res.status(500).json({ message: "Gagal menyimpan data ke database" });
    }
    res.status(201).json({ message: "Data warga berhasil disimpan!", id: result.insertId });
  });
};

// ==========================================
// 2. AMBIL SEMUA WARGA (GET)
// ==========================================
exports.getAllWarga = (req, res) => {
  db.query("SELECT * FROM warga ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("Error ambil data:", err);
      return res.status(500).json({ message: "Gagal mengambil data" });
    }
    res.json(results);
  });
};

// ==========================================
// 3. UPDATE WARGA (PUT) - Untuk Fitur Edit
// ==========================================
exports.updateWarga = (req, res) => {
  const { id } = req.params;
  const { 
    nik, no_kk, nama_lengkap, tempat_lahir, tgl_lahir, jk, alamat, 
    rt, rw, dusun, agama, status_perkawinan, pendidikan, pekerjaan, status_warga, no_hp 
  } = req.body;

  const query = `UPDATE warga SET 
    nik=?, no_kk=?, nama_lengkap=?, tempat_lahir=?, tgl_lahir=?, jk=?, alamat=?, 
    rt=?, rw=?, dusun=?, agama=?, status_perkawinan=?, pendidikan=?, pekerjaan=?, status_warga=?, no_hp=? 
    WHERE id=?`;

  const values = [
    nik, no_kk, nama_lengkap, tempat_lahir, tgl_lahir, jk, alamat, 
    rt, rw, dusun, agama, status_perkawinan, pendidikan, pekerjaan, status_warga, no_hp, id
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error update warga:", err);
      return res.status(500).json({ message: "Gagal mengupdate data" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data warga tidak ditemukan" });
    }
    res.json({ message: "Data warga berhasil diperbarui!" });
  });
};

// ==========================================
// 4. HAPUS WARGA (DELETE) - Untuk Fitur Hapus
// ==========================================
exports.deleteWarga = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM warga WHERE id=?", [id], (err, result) => {
    if (err) {
      console.error("Error hapus warga:", err);
      return res.status(500).json({ message: "Gagal menghapus data" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data warga tidak ditemukan" });
    }
    res.json({ message: "Data warga berhasil dihapus!" });
  });
};