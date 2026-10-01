const db = require("../Config/db");

// 1. TAMBAH PENGADUAN
exports.tambahPengaduan = (req, res) => {
  const {
    nama_pelapor,
    no_hp,
    alamat,
    kategori,
    judul,
    isi_pengaduan,
    tanggal,
    status,
    tanggapan,
    prioritas,
    tanggal_ditangani,
    foto,
  } = req.body;

  const query = `
    INSERT INTO pengaduan
    (
      nama_pelapor,
      no_hp,
      alamat,
      kategori,
      judul,
      isi_pengaduan,
      tanggal,
      status,
      tanggapan,
      prioritas,
      tanggal_ditangani,
      foto
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nama_pelapor || "",
    no_hp || "",
    alamat || "",
    kategori || "Infrastruktur",
    judul || "",
    isi_pengaduan || "",
    tanggal || new Date().toISOString().split("T")[0],
    status || "Menunggu",
    tanggapan || "",
    prioritas || "Sedang",
    tanggal_ditangani || "",
    foto || "",
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("ERROR TAMBAH PENGADUAN:", err);
      return res.status(500).json({
        message: "Gagal menyimpan pengaduan",
        error: err.message,
      });
    }

    res.status(201).json({
      message: "Pengaduan berhasil dikirim!",
      id: result.insertId,
    });
  });
};


// 2. AMBIL SEMUA PENGADUAN
exports.getAllPengaduan = (req, res) => {
  db.query(
    "SELECT * FROM pengaduan ORDER BY id DESC",
    (err, results) => {
      if (err) {
        console.error("ERROR AMBIL PENGADUAN:", err);

        return res.status(500).json({
          message: "Gagal mengambil data pengaduan",
          error: err.message,
        });
      }

      res.json(results);
    }
  );
};


// 3. UPDATE PENGADUAN
exports.updatePengaduan = (req, res) => {
  const { id } = req.params;

  const {
    nama_pelapor,
    no_hp,
    alamat,
    kategori,
    judul,
    isi_pengaduan,
    tanggal,
    status,
    tanggapan,
    prioritas,
    tanggal_ditangani,
    foto,
  } = req.body;

  const query = `
    UPDATE pengaduan
    SET
      nama_pelapor = ?,
      no_hp = ?,
      alamat = ?,
      kategori = ?,
      judul = ?,
      isi_pengaduan = ?,
      tanggal = ?,
      status = ?,
      tanggapan = ?,
      prioritas = ?,
      tanggal_ditangani = ?,
      foto = ?
    WHERE id = ?
  `;

  const values = [
    nama_pelapor || "",
    no_hp || "",
    alamat || "",
    kategori || "Infrastruktur",
    judul || "",
    isi_pengaduan || "",
    tanggal || "",
    status || "Menunggu",
    tanggapan || "",
    prioritas || "Sedang",
    tanggal_ditangani || "",
    foto || "",
    id,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("ERROR UPDATE PENGADUAN:", err);

      return res.status(500).json({
        message: "Gagal mengupdate pengaduan",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Data pengaduan tidak ditemukan",
      });
    }

    res.json({
      message: "Pengaduan berhasil diperbarui!",
    });
  });
};


// 4. HAPUS PENGADUAN
exports.deletePengaduan = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM pengaduan WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("ERROR HAPUS PENGADUAN:", err);

        return res.status(500).json({
          message: "Gagal menghapus pengaduan",
          error: err.message,
        });
      }

      res.json({
        message: "Pengaduan berhasil dihapus!",
      });
    }
  );
};