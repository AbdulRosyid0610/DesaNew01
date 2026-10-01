// src/Admin/Pengaduan.jsx
import { useMemo, useState, useEffect } from "react";
import { FaEdit, FaPlus, FaSearch, FaTrash, FaEye, FaExclamationTriangle, FaCheckCircle, FaClock, FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import "./AdminDashboard.css";

const fallbackPengaduan = [];

const getTodayInputDate = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
};

const normalizeDateForInput = (value) => {
  if (!value) return getTodayInputDate();

  // Format: YYYY-MM-DD
  if (/^\\d{4}-\\d{2}-\\d{2}$/.test(value)) return value;

  // Format ISO lengkap
  if (/^\\d{4}-\\d{2}-\\d{2}T/.test(value)) {
    return value.slice(0, 10);
  }

  // Format Indonesia seperti "30 Juni 2026"
  const months = {
    Januari: "01",
    Februari: "02",
    Maret: "03",
    April: "04",
    Mei: "05",
    Juni: "06",
    Juli: "07",
    Agustus: "08",
    September: "09",
    Oktober: "10",
    November: "11",
    Desember: "12",
  };

  const match = String(value).trim().match(/^(\\d{1,2})\\s+([A-Za-z]+)\\s+(\\d{4})$/);

  if (match && months[match[2]]) {
    return `${match[3]}-${months[match[2]]}-${String(match[1]).padStart(2, "0")}`;
  }

  return value;
};

const compressImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const maxWidth = 700;
        const maxHeight = 700;

        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // JPEG jauh lebih ringan untuk dikirim melalui JSON.
        let quality = 0.65;
        let result = canvas.toDataURL("image/jpeg", quality);

        while (result.length > 90000 && quality > 0.35) {
          quality -= 0.05;
          result = canvas.toDataURL("image/jpeg", quality);
        }

        resolve(result);
      };

      img.onerror = () => reject(new Error("Gagal membaca gambar."));
      img.src = reader.result;
    };

    reader.onerror = () => reject(new Error("Gagal membaca file gambar."));
    reader.readAsDataURL(file);
  });

function Pengaduan() {
  const [search, setSearch] = useState("");
  const [pengaduan, setPengaduan] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // ✅ State untuk Lightbox (Lihat gambar besar)
  const [lightboxImage, setLightboxImage] = useState(null);

  const emptyForm = {
    id: "",
    namaPelapor: "",
    noHP: "",
    kategori: "Infrastruktur",
    judul: "",
    isi: "",
    lokasi: "",
    tanggalPengaduan: getTodayInputDate(),
    foto: "",
    status: "Menunggu",
    tanggapanAdmin: "",
    tanggalDitangani: "",
    prioritas: "Sedang",
  };
  const [formData, setFormData] = useState(emptyForm);

  // ✅ FUNGSI AMBIL DATA DARI BACKEND
  const ambilDataPengaduan = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/pengaduan");
      if (!response.ok) throw new Error("Gagal mengambil data");
      const result = await response.json();

      const mapped = result.map((item) => ({
        id: item.id ? `PGD${String(item.id).padStart(3, "0")}` : "",
        _dbId: item.id,
        namaPelapor: item.nama_pelapor || "",
        noHP: item.no_hp || "",
        kategori: item.kategori || "Infrastruktur",
        judul: item.judul || "",
        isi: item.isi_pengaduan || "",
        lokasi: item.alamat || item.lokasi || "",
        tanggalPengaduan: normalizeDateForInput(item.tanggal),
        foto: item.foto || "",
        status: item.status || "Menunggu",
        tanggapanAdmin: item.tanggapan || "",
        tanggalDitangani: item.tanggal_ditangani || "",
        prioritas: item.prioritas || "Sedang",
      }));
      setPengaduan(mapped);
    } catch (error) {
      console.error("Gagal ambil data pengaduan:", error);
      setPengaduan(fallbackPengaduan);
    }
  };

  useEffect(() => {
    ambilDataPengaduan();
  }, []);

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();
    return pengaduan.filter(
      (item) =>
        item.id.toLowerCase().includes(keyword) ||
        item.namaPelapor.toLowerCase().includes(keyword) ||
        item.judul.toLowerCase().includes(keyword) ||
        item.kategori.toLowerCase().includes(keyword) ||
        item.lokasi.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword)
    );
  }, [search, pengaduan]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Menunggu": return "badge-warning";
      case "Diproses": return "badge-info";
      case "Selesai": return "badge-success";
      case "Ditolak": return "badge-danger";
      default: return "badge-secondary";
    }
  };

  const getPriorityClass = (prioritas) => {
    switch (prioritas) {
      case "Tinggi": return "badge-danger";
      case "Sedang": return "badge-warning";
      case "Rendah": return "badge-success";
      default: return "badge-secondary";
    }
  };

  const handleTambah = () => {
    const nextId = `PGD${String(pengaduan.length + 1).padStart(3, "0")}`;
    setFormData({ ...emptyForm, id: nextId });
    setPreviewImage(null);
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setFormData({
      ...item,
      tanggalPengaduan: normalizeDateForInput(item.tanggalPengaduan),
      noHP: item.noHP || "",
      foto: item.foto || "",
    });

    setPreviewImage(item.foto || null);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Mohon pilih file gambar (JPG, PNG, dll)");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5MB.");
      e.target.value = "";
      return;
    }

    try {
      const compressedImage = await compressImage(file);

      setPreviewImage(compressedImage);
      setFormData((prev) => ({
        ...prev,
        foto: compressedImage,
      }));
    } catch (error) {
      console.error("Gagal memproses gambar:", error);
      alert("Gambar gagal diproses. Silakan pilih gambar lain.");
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nama_pelapor: formData.namaPelapor || "",
      no_hp: formData.noHP || "",
      alamat: formData.lokasi || "",
      kategori: formData.kategori || "Infrastruktur",
      judul: formData.judul || "",
      isi_pengaduan: formData.isi || "",
      tanggal: normalizeDateForInput(formData.tanggalPengaduan),
      status: formData.status || "Menunggu",
      tanggapan: formData.tanggapanAdmin || "",
      prioritas: formData.prioritas || "Sedang",
      tanggal_ditangani: formData.tanggalDitangani || "",
      foto: formData.foto || "",
    };

    try {
      let response;

      if (isEdit) {
        if (!formData._dbId) {
          alert("ID database pengaduan tidak ditemukan.");
          return;
        }

        response = await fetch(
          `http://localhost:5000/api/pengaduan/${formData._dbId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      } else {
        response = await fetch("http://localhost:5000/api/pengaduan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

      if (!response.ok) {
        console.error("Response backend:", result);

        alert(
          result.message ||
          result.error ||
          "Terjadi kesalahan pada server."
        );
        return;
      }

      alert(
        isEdit
          ? "Data pengaduan berhasil diperbarui!"
          : "Pengaduan berhasil ditambahkan!"
      );

      setShowModal(false);
      setPreviewImage(null);
      setFormData(emptyForm);
      await ambilDataPengaduan();
    } catch (error) {
      console.error("Error submit pengaduan:", error);

      alert(
        "Tidak bisa terhubung ke server. Pastikan backend berjalan di port 5000."
      );
    }
  };

  const deletePengaduan = async (id, dbId) => {
    if (!window.confirm(`Hapus data pengaduan dengan ID ${id}?`)) return;
    try {
      const response = await fetch(`http://localhost:5000/api/pengaduan/${dbId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Pengaduan berhasil dihapus!");
        ambilDataPengaduan();
      } else {
        alert("Gagal menghapus data");
      }
    } catch (error) {
      console.error(error);
      alert("Tidak bisa terhubung ke server");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExportExcel = () => {
    const dataToExport = filtered.map((item, index) => ({
      "No": index + 1,
      "ID Pengaduan": item.id,
      "Nama Pelapor": item.namaPelapor,
      "Kategori": item.kategori,
      "Judul Pengaduan": item.judul,
      "Isi Pengaduan": item.isi,
      "Lokasi": item.lokasi,
      "Tanggal Pengaduan": item.tanggalPengaduan,
      "Status": item.status,
      "Prioritas": item.prioritas,
      "Tanggapan Admin": item.tanggapanAdmin || "-",
      "Tanggal Ditangani": item.tanggalDitangani || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    worksheet["!cols"] = [
      { wch: 5 },  { wch: 12 }, { wch: 18 }, { wch: 15 },
      { wch: 30 }, { wch: 50 }, { wch: 30 }, { wch: 18 },
      { wch: 12 }, { wch: 10 }, { wch: 40 }, { wch: 18 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pengaduan");

    const today = new Date().toLocaleDateString("id-ID").replace(/\//g, "-");
    XLSX.writeFile(workbook, `Data_Pengaduan_Desa_Margalaksana_${today}.xlsx`);
    alert(`Berhasil mengexport ${dataToExport.length} pengaduan ke Excel!`);
  };

  const stats = {
    total: pengaduan.length,
    menunggu: pengaduan.filter((p) => p.status === "Menunggu").length,
    diproses: pengaduan.filter((p) => p.status === "Diproses").length,
    selesai: pengaduan.filter((p) => p.status === "Selesai").length,
  };

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <h2>Pengaduan Warga</h2>
          <p>Kelola laporan dan pengaduan dari warga Desa Margalaksana.</p>
        </div>
        <div className="page-actions">
          <button className="btn-excel" onClick={handleExportExcel}>
            <FaFileExcel /> Export Excel
          </button>
          <button className="primary-button" onClick={handleTambah}>
            <FaPlus /> Tambah Pengaduan
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total"><FaExclamationTriangle /></div>
          <div><p>Total Pengaduan</p><h3>{stats.total}</h3></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning"><FaClock /></div>
          <div><p>Menunggu</p><h3>{stats.menunggu}</h3></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info"><FaClock /></div>
          <div><p>Diproses</p><h3>{stats.diproses}</h3></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success"><FaCheckCircle /></div>
          <div><p>Selesai</p><h3>{stats.selesai}</h3></div>
        </div>
      </div>

      <div className="panel">
        <div className="toolbar">
          <div className="search-box">
            <FaSearch />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari ID, Pelapor, Judul, Kategori, atau Status..."
            />
          </div>
          <span className="result-count">{filtered.length} pengaduan ditemukan</span>
        </div>

        <div
          className="table-wrapper"
          style={{ overflowX: "auto", width: "100%" }}
        >
          <table
            className="data-table"
            style={{ minWidth: "1500px", width: "100%" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Foto</th>
                <th>Pelapor</th>
                <th>Kategori</th>
                <th>Judul Pengaduan</th>
                <th>Lokasi</th>
                <th>Tgl Pengaduan</th>
                <th>Prioritas</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._dbId || item.id}>
                  <td>
                    <strong>{item.id}</strong>
                  </td>
                  <td>
                    {item.foto ? (
                      <img
                        src={item.foto}
                        alt="Bukti"
                        onClick={() => setLightboxImage(item.foto)}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          border: "1px solid #ddd",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#999",
                          fontStyle: "italic",
                        }}
                      >
                        Tidak ada
                      </span>
                    )}
                  </td>
                  <td>{item.namaPelapor}</td>
                  <td>{item.kategori}</td>
                  <td>{item.judul}</td>
                  <td>{item.lokasi}</td>
                  <td>{item.tanggalPengaduan}</td>
                  <td>
                    <span
                      className={`badge ${getPriorityClass(item.prioritas)}`}
                    >
                      {item.prioritas}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${getStatusClass(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="icon-button view"
                        title="Lihat Detail"
                        onClick={() => setSelectedItem(item)}
                      >
                        <FaEye />
                      </button>
                      <button
                        type="button"
                        className="icon-button edit"
                        title="Edit"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        type="button"
                        className="icon-button delete"
                        title="Hapus"
                        onClick={() =>
                          deletePengaduan(item.id, item._dbId)
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">Data pengaduan tidak ditemukan.</div>
        )}
      </div>

      {/* ✅ LIGHTBOX: Lihat Gambar Besar */}
      {lightboxImage && (
        <div 
          className="modal-overlay" 
          onClick={() => setLightboxImage(null)}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            zIndex: 9999
          }}
        >
          <div style={{ position: "relative", maxWidth: "90%", maxHeight: "90%" }}>
            <button 
              onClick={() => setLightboxImage(null)}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                background: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                fontSize: "20px",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#333"
              }}
            >
              ×
            </button>
            <img 
              src={lightboxImage} 
              alt="Bukti Pengaduan" 
              style={{ 
                maxWidth: "100%", 
                maxHeight: "85vh", 
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                display: "block"
              }} 
            />
          </div>
        </div>
      )}

      {/* MODAL DETAIL PENGADUAN */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detail Pengaduan: {selectedItem.id}</h3>
              <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item"><span>ID Pengaduan</span><strong>{selectedItem.id}</strong></div>
                <div className="detail-item"><span>Nama Pelapor</span><strong>{selectedItem.namaPelapor}</strong></div>
                <div className="detail-item"><span>Kategori</span><strong>{selectedItem.kategori}</strong></div>
                <div className="detail-item"><span>Prioritas</span>
                  <strong><span className={`badge ${getPriorityClass(selectedItem.prioritas)}`}>{selectedItem.prioritas}</span></strong>
                </div>
                <div className="detail-item full-width"><span>Judul Pengaduan</span><strong>{selectedItem.judul}</strong></div>
                <div className="detail-item full-width"><span>Isi Pengaduan</span><strong>{selectedItem.isi}</strong></div>
                <div className="detail-item full-width"><span>Lokasi</span><strong>{selectedItem.lokasi}</strong></div>
                <div className="detail-item"><span>Tanggal Pengaduan</span><strong>{selectedItem.tanggalPengaduan}</strong></div>
                <div className="detail-item"><span>Status</span>
                  <strong><span className={`badge ${getStatusClass(selectedItem.status)}`}>{selectedItem.status}</span></strong>
                </div>
                <div className="detail-item full-width"><span>Tanggapan Admin</span><strong>{selectedItem.tanggapanAdmin || "-"}</strong></div>
                <div className="detail-item"><span>Tanggal Ditangani</span><strong>{selectedItem.tanggalDitangani || "-"}</strong></div>
                
                <div className="detail-item full-width">
                  <span>Foto Bukti</span>
                  {selectedItem.foto ? (
                    <div style={{ marginTop: "8px" }}>
                      <img 
                        src={selectedItem.foto} 
                        alt="Bukti Pengaduan" 
                        onClick={() => setLightboxImage(selectedItem.foto)}
                        style={{ 
                          maxWidth: "100%", 
                          maxHeight: "300px", 
                          borderRadius: "8px", 
                          border: "1px solid #ddd",
                          cursor: "pointer"
                        }} 
                      />
                    </div>
                  ) : (
                    <strong style={{ fontStyle: "italic", color: "#888" }}>Tidak ada foto bukti</strong>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORM TAMBAH / EDIT PENGADUAN */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{isEdit ? "Edit Pengaduan" : "Tambah Pengaduan Baru"}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>ID Pengaduan</label>
                  <input name="id" value={formData.id} readOnly className="input-readonly" />
                </div>
                <div className="form-group">
                  <label>Nama Pelapor</label>
                  <input name="namaPelapor" value={formData.namaPelapor} onChange={handleChange} required placeholder="Nama lengkap pelapor" />
                </div>
                <div className="form-group">
                  <label>No. HP</label>
                  <input
                    name="noHP"
                    value={formData.noHP || ""}
                    onChange={handleChange}
                    placeholder="Nomor HP pelapor"
                  />
                </div>

                <div className="form-group">
                  <label>Kategori</label>
                  <select name="kategori" value={formData.kategori} onChange={handleChange}>
                    <option value="Infrastruktur">Infrastruktur</option>
                    <option value="Lingkungan">Lingkungan</option>
                    <option value="Keamanan">Keamanan</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Administrasi">Administrasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Prioritas</label>
                  <select name="prioritas" value={formData.prioritas} onChange={handleChange}>
                    <option value="Rendah">Rendah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Tinggi">Tinggi</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Judul Pengaduan</label>
                  <input name="judul" value={formData.judul} onChange={handleChange} required placeholder="Ringkasan singkat masalah" />
                </div>
                <div className="form-group full-width">
                  <label>Isi Pengaduan</label>
                  <textarea name="isi" value={formData.isi} onChange={handleChange} required rows="4" placeholder="Jelaskan detail pengaduan..." />
                </div>
                <div className="form-group full-width">
                  <label>Lokasi</label>
                  <input name="lokasi" value={formData.lokasi} onChange={handleChange} required placeholder="Contoh: Kp. Cibangkong RT 02/RW 08" />
                </div>
                <div className="form-group">
                  <label>Tanggal Pengaduan</label>
                  <input
                    type="date"
                    name="tanggalPengaduan"
                    value={formData.tanggalPengaduan || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Menunggu">Menunggu</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Tanggapan Admin</label>
                  <textarea name="tanggapanAdmin" value={formData.tanggapanAdmin} onChange={handleChange} rows="3" placeholder="Tulis tanggapan untuk pelapor..." />
                </div>
                <div className="form-group">
                  <label>Tanggal Ditangani</label>
                  <input name="tanggalDitangani" value={formData.tanggalDitangani} onChange={handleChange} placeholder="Contoh: 11 September 2026" />
                </div>
                
                <div className="form-group full-width">
                  <label>Foto Bukti (Upload Gambar)</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    style={{
                      padding: "10px",
                      border: "1px dashed #ccc",
                      borderRadius: "8px",
                      width: "100%",
                      background: "#f9f9f9",
                      cursor: "pointer",
                      marginBottom: "10px"
                    }}
                  />
                  
                  {(previewImage || formData.foto) && (
                    <div style={{ 
                      marginTop: "10px", 
                      padding: "10px", 
                      border: "1px solid #ddd", 
                      borderRadius: "8px",
                      backgroundColor: "#fafafa"
                    }}>
                      <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px", fontWeight: "bold" }}>
                        Preview Gambar:
                      </p>
                      <img 
                        src={previewImage || formData.foto} 
                        alt="Preview Bukti" 
                        style={{ 
                          maxWidth: "100%", 
                          maxHeight: "250px", 
                          borderRadius: "8px", 
                          border: "1px solid #ddd",
                          objectFit: "contain",
                          display: "block",
                          margin: "0 auto"
                        }} 
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData(prev => ({ ...prev, foto: "" }));
                          const fileInput = document.querySelector('input[type="file"]');
                          if (fileInput) fileInput.value = "";
                        }}
                        style={{ 
                          display: "block", 
                          marginTop: "10px", 
                          fontSize: "12px", 
                          color: "#fff", 
                          backgroundColor: "#dc3545",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          border: "none", 
                          cursor: "pointer",
                          margin: "10px auto 0"
                        }}
                      >
                        Hapus Gambar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" className="btn-primary">{isEdit ? "Simpan Perubahan" : "Tambah Pengaduan"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pengaduan;