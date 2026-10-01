// src/Admin/Berita.jsx

import { useState, useEffect } from "react";
import {
  FaEdit,
  FaPlus,
  FaTrash,
  FaCalendarAlt,
  FaFileExcel,
  FaSearch,
  FaImage,
  FaTimes,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import "./Berita.css";

// ========================================
// IMPORT GAMBAR FALLBACK
// ========================================
import budayaImg from "../assets/Images/Budaya.jpg";
import pertanianImg from "../assets/Images/Pertanian.jpg";
import infrastrukturImg from "../assets/Images/infrastruktur.jpg";
import pendidikanImg from "../assets/Images/pendidikan.jpg";
import lingkunganImg from "../assets/Images/lingkungan.jpg";

// ========================================
// MAPPING WARNA PER KATEGORI
// ========================================
const warnaKategori = {
  Budaya: { color: "#fce4ec", textColor: "#c62828" },
  Pertanian: { color: "#e8f5e9", textColor: "#2e7d32" },
  Infrastruktur: { color: "#e3f2fd", textColor: "#0d47a1" },
  Pendidikan: { color: "#fff3e0", textColor: "#e65100" },
  Lingkungan: { color: "#e0f7fa", textColor: "#00695c" },
  Kesehatan: { color: "#f3e5f5", textColor: "#6a1b9a" },
  Umum: { color: "#eceff1", textColor: "#37474f" },
};

// Mapping gambar fallback per kategori
const gambarFallback = {
  Budaya: budayaImg,
  Pertanian: pertanianImg,
  Infrastruktur: infrastrukturImg,
  Pendidikan: pendidikanImg,
  Lingkungan: lingkunganImg,
};

function Berita() {
  const [berita, setBerita] = useState([]);
  const [selectedBerita, setSelectedBerita] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [search, setSearch] = useState("");

  const emptyForm = {
    id: "",
    kategori: "Budaya",
    tanggal: "",
    judul: "",
    deskripsi: "",
    isiLengkap: "",
    gambar: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  // ========================================
  // AMBIL DATA DARI BACKEND
  // ========================================
  const ambilDataBerita = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/berita");
      if (!response.ok) throw new Error("Gagal mengambil data");
      const result = await response.json();

      const mapped = result.map((item) => {
        const warna = warnaKategori[item.kategori] || warnaKategori.Umum;
        return {
          id: `BRT${String(item.id).padStart(3, "0")}`,
          _dbId: item.id,
          kategori: item.kategori || "Umum",
          tanggal: item.tanggal || "",
          judul: item.judul || "",
          deskripsi: item.deskripsi || "",
          isiLengkap: item.isi_lengkap || "",
          gambar: item.gambar || gambarFallback[item.kategori] || "",
          color: warna.color,
          textColor: warna.textColor,
        };
      });
      setBerita(mapped);
    } catch (error) {
      console.error("Gagal ambil data berita:", error);
      setBerita([]);
    }
  };

  useEffect(() => {
    ambilDataBerita();
  }, []);

  // ========================================
  // FILTER BERITA
  // ========================================
  const filtered = berita.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.judul.toLowerCase().includes(keyword) ||
      item.kategori.toLowerCase().includes(keyword) ||
      item.id.toLowerCase().includes(keyword) ||
      item.tanggal.toLowerCase().includes(keyword)
    );
  });

  // ========================================
  // TAMBAH BERITA
  // ========================================
  const handleTambah = () => {
    const nextId = `BRT${String(berita.length + 1).padStart(3, "0")}`;
    const today = new Date().toLocaleDateString("id-ID", {
      day: "2-digit", month: "long", year: "numeric",
    });
    setFormData({ ...emptyForm, id: nextId, tanggal: today });
    setIsEdit(false);
    setShowForm(true);
  };

  // ========================================
  // EDIT BERITA
  // ========================================
  const handleEdit = (item) => {
    setFormData(item);
    setIsEdit(true);
    setShowForm(true);
  };

  // ========================================
  // SIMPAN BERITA (Tambah / Edit)
  // ========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      judul: formData.judul,
      kategori: formData.kategori,
      tanggal: formData.tanggal,
      deskripsi: formData.deskripsi,
      isi_lengkap: formData.isiLengkap,
      gambar: formData.gambar,
    };

    try {
      let response;
      if (isEdit) {
        response = await fetch(`http://localhost:5000/api/berita/${formData._dbId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch("http://localhost:5000/api/berita", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        alert(isEdit ? "Berita berhasil diperbarui!" : "Berita baru berhasil ditambahkan!");
        setShowForm(false);
        setFormData(emptyForm);
        ambilDataBerita();
      } else {
        const err = await response.json();
        alert("Gagal: " + (err.message || "Terjadi kesalahan"));
      }
    } catch (error) {
      console.error(error);
      alert("Tidak bisa terhubung ke server. Pastikan backend berjalan.");
    }
  };

  // ========================================
  // HAPUS BERITA
  // ========================================
  const handleDelete = async (id, dbId) => {
    if (!window.confirm(`Hapus berita dengan ID ${id}?`)) return;
    try {
      const response = await fetch(`http://localhost:5000/api/berita/${dbId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Berita berhasil dihapus!");
        ambilDataBerita();
      } else {
        alert("Gagal menghapus berita");
      }
    } catch (error) {
      console.error(error);
      alert("Tidak bisa terhubung ke server");
    }
  };

  // ========================================
  // HANDLE FORM
  // ========================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ========================================
  // UPLOAD FOTO
  // ========================================
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar (JPG, PNG, dll)!");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2MB!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, gambar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // ========================================
  // HAPUS FOTO
  // ========================================
  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, gambar: "" }));
  };

  // ========================================
  // EXPORT EXCEL
  // ========================================
  const handleExportExcel = () => {
    const dataToExport = filtered.map((item, index) => ({
      No: index + 1,
      "ID Berita": item.id,
      Kategori: item.kategori,
      Tanggal: item.tanggal,
      "Judul Berita": item.judul,
      Deskripsi: item.deskripsi,
      "Isi Lengkap": item.isiLengkap,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    worksheet["!cols"] = [
      { wch: 5 }, { wch: 10 }, { wch: 15 }, { wch: 18 },
      { wch: 40 }, { wch: 60 }, { wch: 80 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Berita");

    const today = new Date().toLocaleDateString("id-ID").replace(/\//g, "-");
    XLSX.writeFile(workbook, `Data_Berita_Desa_Margalaksana_${today}.xlsx`);
    alert(`Berhasil mengexport ${dataToExport.length} berita ke Excel!`);
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="berita-page">
      <div className="page-heading">
        <div>
          <h2>Kelola Berita</h2>
          <p>Kelola berita dan informasi seputar Desa Margalaksana.</p>
        </div>
        <div className="page-actions">
          <button className="btn-excel" onClick={handleExportExcel}>
            <FaFileExcel /> Export Excel
          </button>
          <button className="primary-button" onClick={handleTambah}>
            <FaPlus /> Tambah Berita
          </button>
        </div>
      </div>

      <div className="berita-toolbar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berita berdasarkan judul, kategori, atau ID..."
          />
        </div>
        <span className="result-count">{filtered.length} berita ditemukan</span>
      </div>

      <div className="berita-grid">
        {filtered.map((item) => (
          <div key={item._dbId || item.id} className="berita-card">
            <div className="berita-image-wrapper">
              <img
                src={item.gambar}
                alt={item.judul}
                className="berita-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
              <span
                className="berita-badge"
                style={{ backgroundColor: item.color, color: item.textColor }}
              >
                {item.kategori}
              </span>
              <div className="berita-actions-overlay">
                <button className="overlay-btn edit" title="Edit" onClick={() => handleEdit(item)}>
                  <FaEdit />
                </button>
                <button className="overlay-btn delete" title="Hapus" onClick={() => handleDelete(item.id, item._dbId)}>
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="berita-content">
              <span className="berita-tanggal">
                <FaCalendarAlt />
                {item.tanggal}
              </span>
              <h3 className="berita-judul">{item.judul}</h3>
              <p className="berita-deskripsi">{item.deskripsi}</p>
              <button className="berita-button" onClick={() => setSelectedBerita(item)}>
                Baca Selengkapnya →
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty-state" style={{ gridColumn: "1 / -1" }}>
            Tidak ada berita yang cocok dengan pencarian.
          </div>
        )}
      </div>

      {/* MODAL BACA SELENGKAPNYA */}
      {selectedBerita && (
        <div className="modal-overlay" onClick={() => setSelectedBerita(null)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedBerita.judul}</h3>
              <button className="modal-close" onClick={() => setSelectedBerita(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="berita-detail-image-wrapper">
                <img src={selectedBerita.gambar} alt={selectedBerita.judul} className="berita-detail-image" />
              </div>
              <div className="berita-detail-meta">
                <span
                  className="berita-badge-static"
                  style={{ backgroundColor: selectedBerita.color, color: selectedBerita.textColor }}
                >
                  {selectedBerita.kategori}
                </span>
                <span className="berita-tanggal-static">
                  <FaCalendarAlt />
                  {selectedBerita.tanggal}
                </span>
              </div>
              <p className="berita-detail-isi">{selectedBerita.isiLengkap}</p>
            </div>
            <div className="modal-footer-actions">
              <button className="btn-secondary" onClick={() => setSelectedBerita(null)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH / EDIT */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{isEdit ? "Edit Berita" : "Tambah Berita Baru"}</h3>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group full-width">
                <label>Foto Berita</label>
                <div className="foto-upload-area">
                  {formData.gambar ? (
                    <div className="foto-preview">
                      <img src={formData.gambar} alt="Preview" />
                      <button type="button" className="foto-remove" onClick={handleRemovePhoto} title="Hapus Foto">
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <label className="foto-upload-label" htmlFor="foto-upload-berita">
                      <FaImage />
                      <span>Klik untuk upload foto</span>
                      <small>Format: JPG, PNG (Maks. 2MB)</small>
                    </label>
                  )}
                  <input
                    id="foto-upload-berita"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>ID Berita</label>
                  <input name="id" value={formData.id} readOnly className="input-readonly" />
                </div>
                <div className="form-group">
                  <label>Tanggal</label>
                  <input name="tanggal" value={formData.tanggal} onChange={handleChange} required placeholder="Contoh: 20 Juli 2026" />
                </div>
                <div className="form-group full-width">
                  <label>Kategori</label>
                  <select name="kategori" value={formData.kategori} onChange={handleChange}>
                    <option value="Budaya">Budaya</option>
                    <option value="Pertanian">Pertanian</option>
                    <option value="Infrastruktur">Infrastruktur</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Lingkungan">Lingkungan</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Judul Berita</label>
                  <input name="judul" value={formData.judul} onChange={handleChange} required placeholder="Judul berita..." />
                </div>
                <div className="form-group full-width">
                  <label>Deskripsi Singkat</label>
                  <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows="2" required placeholder="Ringkasan singkat (muncul di kartu)..." />
                </div>
                <div className="form-group full-width">
                  <label>Isi Lengkap Berita</label>
                  <textarea name="isiLengkap" value={formData.isiLengkap} onChange={handleChange} rows="6" required placeholder="Isi berita lengkap (muncul saat Baca Selengkapnya)..." />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Batal</button>
                <button type="submit" className="btn-primary">
                  {isEdit ? "Simpan Perubahan" : "Tambah Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Berita;