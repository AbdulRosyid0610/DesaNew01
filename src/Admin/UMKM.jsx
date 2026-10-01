// src/Admin/KelolaUMKM.jsx

import { useMemo, useState, useEffect } from "react";
import {
  FaEdit,
  FaPlus,
  FaSearch,
  FaTrash,
  FaEye,
  FaStore,
  FaImage,
  FaTimes,
  FaFileExcel,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import "./AdminDashboard.css";

// ========================================
// FALLBACK
// ========================================
const fallbackUMKM = [];

function KelolaUMKM() {
  const [search, setSearch] = useState("");
  const [umkm, setUmkm] = useState([]);
  const [selectedUMKM, setSelectedUMKM] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // ========================================
  // FORM KOSONG
  // ========================================
  const emptyForm = {
    id: "",
    namaUMKM: "",
    namaPemilik: "",
    kategori: "Makanan & Minuman",
    produk: "",
    deskripsi: "",
    alamat: "",
    rt: "",
    rw: "",
    noHP: "",
    tahunBerdiri: "",
    jumlahProduk: "",
    hargaMulai: "",
    foto: "",
    status: "Aktif",
  };

  const [formData, setFormData] = useState(emptyForm);

  // ========================================
  // AMBIL DATA UMKM
  // ========================================
  const ambilDataUMKM = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/umkm"
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data UMKM");
      }

      const result = await response.json();

      if (!Array.isArray(result)) {
        throw new Error("Data dari server bukan array");
      }

      const mapped = result.map((item) => ({
        // ID DATABASE TETAP
        id: item.id,

        namaUMKM: item.nama_usaha || "",
        namaPemilik: item.pemilik || "",
        kategori:
          item.kategori || "Makanan & Minuman",
        produk: item.produk || "",
        deskripsi: item.deskripsi || "",
        alamat: item.alamat || "",
        rt: item.rt || "",
        rw: item.rw || "",
        noHP: item.no_hp || "",
        tahunBerdiri:
          item.tahun_berdiri || "",
        jumlahProduk:
          item.jumlah_produk || "",
        hargaMulai:
          item.harga_mulai || "",
        foto: item.foto || "",
        status: item.status || "Aktif",
      }));

      setUmkm(mapped);
    } catch (error) {
      console.error(
        "Gagal ambil data UMKM:",
        error
      );

      setUmkm(fallbackUMKM);
    }
  };

  // ========================================
  // LOAD DATA SAAT HALAMAN DIBUKA
  // ========================================
  useEffect(() => {
    ambilDataUMKM();
  }, []);

  // ========================================
  // PENCARIAN
  // ========================================
  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();

    return umkm.filter(
      (item) =>
        String(item.namaUMKM || "")
          .toLowerCase()
          .includes(keyword) ||

        String(item.namaPemilik || "")
          .toLowerCase()
          .includes(keyword) ||

        String(item.id || "")
          .toLowerCase()
          .includes(keyword) ||

        String(item.kategori || "")
          .toLowerCase()
          .includes(keyword) ||

        String(item.produk || "")
          .toLowerCase()
          .includes(keyword)
    );
  }, [search, umkm]);

  // ========================================
  // TAMBAH UMKM
  // ========================================
  const handleTambah = () => {
    // Jangan membuat ID berdasarkan jumlah data.
    // ID akan dibuat oleh database.
    setFormData({
      ...emptyForm,
      id: "",
    });

    setIsEdit(false);
    setShowModal(true);
  };

  // ========================================
  // EDIT UMKM
  // ========================================
  const handleEdit = (item) => {
    setFormData({
      ...item,
    });

    setIsEdit(true);
    setShowModal(true);
  };

  // ========================================
  // SUBMIT TAMBAH / EDIT
  // ========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ========================================
    // VALIDASI
    // ========================================
    if (!formData.namaUMKM.trim()) {
      alert("Nama UMKM wajib diisi!");
      return;
    }

    if (!formData.namaPemilik.trim()) {
      alert("Nama pemilik wajib diisi!");
      return;
    }

    if (!formData.produk.trim()) {
      alert("Produk utama wajib diisi!");
      return;
    }

    if (!formData.alamat.trim()) {
      alert("Alamat wajib diisi!");
      return;
    }

    // ========================================
    // DATA KE BACKEND
    // ========================================
    const payload = {
      nama_usaha:
        formData.namaUMKM.trim(),

      pemilik:
        formData.namaPemilik.trim(),

      kategori:
        formData.kategori,

      produk:
        formData.produk.trim(),

      deskripsi:
        formData.deskripsi.trim(),

      alamat:
        formData.alamat.trim(),

      rt:
        formData.rt.trim(),

      rw:
        formData.rw.trim(),

      no_hp:
        formData.noHP.trim(),

      tahun_berdiri:
        formData.tahunBerdiri,

      jumlah_produk:
        formData.jumlahProduk,

      harga_mulai:
        formData.hargaMulai.trim(),

      foto:
        formData.foto,

      status:
        formData.status,
    };

    console.log(
      "DATA UMKM:",
      payload
    );

    try {
      let response;

      // ========================================
      // EDIT
      // ========================================
      if (isEdit) {
        response = await fetch(
          `http://localhost:5000/api/umkm/${formData.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(payload),
          }
        );
      }

      // ========================================
      // TAMBAH
      // ========================================
      else {
        response = await fetch(
          "http://localhost:5000/api/umkm",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(payload),
          }
        );
      }

      // ========================================
      // RESPONSE
      // ========================================
      const contentType =
        response.headers.get(
          "content-type"
        );

      let result;

      if (
        contentType &&
        contentType.includes(
          "application/json"
        )
      ) {
        result =
          await response.json();
      } else {
        result =
          await response.text();
      }

      console.log(
        "STATUS:",
        response.status
      );

      console.log(
        "RESPONSE:",
        result
      );

      // ========================================
      // BERHASIL
      // ========================================
      if (response.ok) {
        alert(
          isEdit
            ? "Data UMKM berhasil diperbarui!"
            : "UMKM baru berhasil ditambahkan!"
        );

        setShowModal(false);

        setFormData(emptyForm);

        await ambilDataUMKM();

        return;
      }

      // ========================================
      // ERROR
      // ========================================
      let pesanError =
        "Terjadi kesalahan pada server.";

      if (
        typeof result ===
          "object" &&
        result !== null
      ) {
        pesanError =
          result.message ||
          result.error ||
          pesanError;
      } else if (
        typeof result ===
          "string" &&
        result.trim() !== ""
      ) {
        pesanError = result;
      }

      alert(
        `Gagal menyimpan UMKM!\n\n` +
        `Status: ${response.status}\n` +
        `Pesan: ${pesanError}`
      );
    } catch (error) {
      console.error(
        "Error submit UMKM:",
        error
      );

      alert(
        "Tidak bisa terhubung ke backend.\n\n" +
        "Pastikan backend berjalan di:\n" +
        "http://localhost:5000"
      );
    }
  };

  // ========================================
  // HAPUS UMKM
  // ========================================
  const deleteUMKM = async (id) => {
    if (
      !window.confirm(
        `Hapus data UMKM dengan ID ${id}?`
      )
    ) {
      return;
    }

    try {
      const response =
        await fetch(
          `http://localhost:5000/api/umkm/${id}`,
          {
            method: "DELETE",
          }
        );

      if (response.ok) {
        alert(
          "Data UMKM berhasil dihapus!"
        );

        await ambilDataUMKM();
      } else {
        alert(
          "Gagal menghapus data UMKM."
        );
      }
    } catch (error) {
      console.error(
        "Error hapus UMKM:",
        error
      );

      alert(
        "Tidak bisa terhubung ke server."
      );
    }
  };

  // ========================================
  // HANDLE CHANGE
  // ========================================
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========================================
  // UPLOAD FOTO
  // ========================================
  const handleFileUpload = (e) => {
    const file =
      e.target.files[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "File harus berupa gambar!"
      );
      return;
    }

    if (
      file.size >
      2 * 1024 * 1024
    ) {
      alert(
        "Ukuran gambar maksimal 2MB!"
      );
      return;
    }

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setFormData(
        (prev) => ({
          ...prev,
          foto: reader.result,
        })
      );
    };

    reader.readAsDataURL(file);
  };

  // ========================================
  // HAPUS FOTO
  // ========================================
  const handleRemovePhoto = () => {
    setFormData(
      (prev) => ({
        ...prev,
        foto: "",
      })
    );
  };

  // ========================================
  // EXPORT EXCEL
  // ========================================
  const handleExportExcel = () => {
    const dataToExport =
      filtered.map(
        (item, index) => ({
          No: index + 1,

          "ID UMKM":
            item.id,

          "Nama UMKM":
            item.namaUMKM,

          "Nama Pemilik":
            item.namaPemilik,

          Kategori:
            item.kategori,

          "Produk Utama":
            item.produk,

          Deskripsi:
            item.deskripsi,

          Alamat:
            item.alamat,

          RT:
            item.rt,

          RW:
            item.rw,

          "No. HP":
            item.noHP,

          "Tahun Berdiri":
            item.tahunBerdiri,

          "Jumlah Produk":
            item.jumlahProduk,

          "Harga Mulai":
            item.hargaMulai,

          Status:
            item.status,
        })
      );

    const worksheet =
      XLSX.utils.json_to_sheet(
        dataToExport
      );

    worksheet["!cols"] = [
      { wch: 5 },
      { wch: 10 },
      { wch: 25 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 40 },
      { wch: 30 },
      { wch: 6 },
      { wch: 6 },
      { wch: 15 },
      { wch: 12 },
      { wch: 12 },
      { wch: 15 },
      { wch: 10 },
    ];

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Data UMKM"
    );

    const today =
      new Date()
        .toLocaleDateString(
          "id-ID"
        )
        .replace(
          /\//g,
          "-"
        );

    XLSX.writeFile(
      workbook,
      `Data_UMKM_Desa_Margalaksana_${today}.xlsx`
    );

    alert(
      `Berhasil mengexport ${dataToExport.length} data UMKM ke Excel!`
    );
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="page-container">

      {/* HEADER */}
      <div className="page-heading">

        <div>
          <h2>
            Kelola UMKM
          </h2>

          <p>
            Kelola data Usaha Mikro,
            Kecil, dan Menengah
            Desa Margalaksana.
          </p>
        </div>

        <div className="page-actions">

          <button
            className="btn-excel"
            onClick={
              handleExportExcel
            }
          >
            <FaFileExcel />
            Export Excel
          </button>

          <button
            className="primary-button"
            onClick={
              handleTambah
            }
          >
            <FaPlus />
            Tambah UMKM
          </button>

        </div>
      </div>

      {/* PANEL */}
      <div className="panel">

        {/* SEARCH */}
        <div className="toolbar">

          <div className="search-box">

            <FaSearch />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Cari ID, Nama UMKM, Pemilik, Kategori, atau Produk..."
            />

          </div>

          <span className="result-count">
            {filtered.length} UMKM
            ditemukan
          </span>

        </div>

        {/* TABLE */}
        <div
          className="table-wrapper"
          style={{
            overflowX:
              "auto",
            width: "100%",
          }}
        >

          <table
            className="data-table"
            style={{
              minWidth:
                "1600px",
              width: "100%",
            }}
          >

            <thead>

              <tr>

                <th>
                  Foto
                </th>

                {/* NOMOR URUT */}
                <th>
                  No
                </th>

                <th>
                  Nama UMKM
                </th>

                <th>
                  Pemilik
                </th>

                <th>
                  Kategori
                </th>

                <th>
                  Produk
                </th>

                <th>
                  Alamat
                </th>

                <th>
                  RT/RW
                </th>

                <th>
                  No. HP
                </th>

                <th>
                  Tahun
                </th>

                <th>
                  Jml Produk
                </th>

                <th>
                  Harga Mulai
                </th>

                <th>
                  Status
                </th>

                <th>
                  Aksi
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map(
                (item, index) => (

                  <tr
                    key={item.id}
                  >

                    {/* FOTO */}
                    <td>

                      <img
                        src={
                          item.foto ||
                          "https://via.placeholder.com/60x60/cccccc/666666?text=No+Img"
                        }
                        alt={
                          item.namaUMKM
                        }
                        className="table-thumbnail"
                        onError={(
                          e
                        ) => {
                          e.target.onerror =
                            null;

                          e.target.src =
                            "https://via.placeholder.com/60x60/cccccc/666666?text=No+Img";
                        }}
                      />

                    </td>

                    {/* =================================
                        NOMOR URUT OTOMATIS
                        ================================= */}
                    <td>
                      <strong>
                        {index + 1}
                      </strong>
                    </td>

                    <td>
                      {item.namaUMKM}
                    </td>

                    <td>
                      {item.namaPemilik}
                    </td>

                    <td>
                      {item.kategori}
                    </td>

                    <td>
                      {item.produk}
                    </td>

                    <td>
                      {item.alamat}
                    </td>

                    <td>
                      {item.rt}/
                      {item.rw}
                    </td>

                    <td>
                      {item.noHP}
                    </td>

                    <td>
                      {item.tahunBerdiri}
                    </td>

                    <td>
                      {item.jumlahProduk}
                    </td>

                    <td>
                      {item.hargaMulai}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          item.status ===
                          "Aktif"
                            ? "badge-success"
                            : "badge-danger"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    {/* AKSI */}
                    <td>

                      <div className="table-actions">

                        {/* LIHAT */}
                        <button
                          className="icon-button view"
                          title="Lihat Detail"
                          onClick={() =>
                            setSelectedUMKM(
                              item
                            )
                          }
                        >
                          <FaEye />
                        </button>

                        {/* EDIT */}
                        <button
                          className="icon-button edit"
                          title="Edit"
                          onClick={() =>
                            handleEdit(
                              item
                            )
                          }
                        >
                          <FaEdit />
                        </button>

                        {/* HAPUS */}
                        <button
                          className="icon-button delete"
                          title="Hapus"
                          onClick={() =>
                            deleteUMKM(
                              item.id
                            )
                          }
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* DATA KOSONG */}
        {filtered.length ===
          0 && (
          <div className="empty-state">
            Data UMKM tidak
            ditemukan.
          </div>
        )}

      </div>

      {/* ========================================
          MODAL DETAIL
      ======================================== */}
      {selectedUMKM && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedUMKM(
              null
            )
          }
        >

          <div
            className="modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h3>
                <FaStore />
                Detail UMKM:{" "}
                {
                  selectedUMKM.namaUMKM
                }
              </h3>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedUMKM(
                    null
                  )
                }
              >
                ×
              </button>

            </div>

            <div className="modal-body">

              <div className="detail-image-container">

                <img
                  src={
                    selectedUMKM.foto ||
                    "https://via.placeholder.com/600x300/cccccc/666666?text=Foto+Belum+Tersedia"
                  }
                  alt={
                    selectedUMKM.namaUMKM
                  }
                  className="detail-image"
                  onError={(e) => {
                    e.target.onerror =
                      null;

                    e.target.src =
                      "https://via.placeholder.com/600x300/cccccc/666666?text=Foto+Belum+Tersedia";
                  }}
                />

              </div>

              <div className="detail-grid">

                <div className="detail-item">
                  <span>
                    ID UMKM
                  </span>
                  <strong>
                    {
                      selectedUMKM.id
                    }
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    Nama UMKM
                  </span>
                  <strong>
                    {
                      selectedUMKM.namaUMKM
                    }
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    Nama Pemilik
                  </span>
                  <strong>
                    {
                      selectedUMKM.namaPemilik
                    }
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    Kategori
                  </span>
                  <strong>
                    {
                      selectedUMKM.kategori
                    }
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    Produk Utama
                  </span>
                  <strong>
                    {
                      selectedUMKM.produk
                    }
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    Tahun Berdiri
                  </span>
                  <strong>
                    {
                      selectedUMKM.tahunBerdiri
                    }
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    Jumlah Produk
                  </span>
                  <strong>
                    {
                      selectedUMKM.jumlahProduk
                    }{" "}
                    varian
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    Harga Mulai
                  </span>
                  <strong>
                    {
                      selectedUMKM.hargaMulai
                    }
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    No. HP
                  </span>
                  <strong>
                    {
                      selectedUMKM.noHP
                    }
                  </strong>
                </div>

                <div className="detail-item">

                  <span>
                    Status
                  </span>

                  <strong>

                    <span
                      className={`badge ${
                        selectedUMKM.status ===
                        "Aktif"
                          ? "badge-success"
                          : "badge-danger"
                      }`}
                    >
                      {
                        selectedUMKM.status
                      }
                    </span>

                  </strong>

                </div>

                <div className="detail-item full-width">
                  <span>
                    Alamat
                  </span>

                  <strong>
                    {
                      selectedUMKM.alamat
                    }
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    RT
                  </span>

                  <strong>
                    {
                      selectedUMKM.rt
                    }
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    RW
                  </span>

                  <strong>
                    {
                      selectedUMKM.rw
                    }
                  </strong>
                </div>

                <div className="detail-item full-width">
                  <span>
                    Deskripsi
                  </span>

                  <strong>
                    {
                      selectedUMKM.deskripsi
                    }
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ========================================
          MODAL TAMBAH / EDIT
      ======================================== */}
      {showModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowModal(
              false
            )
          }
        >

          <div
            className="modal-content modal-large"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h3>
                {isEdit
                  ? "Edit Data UMKM"
                  : "Tambah UMKM Baru"}
              </h3>

              <button
                className="modal-close"
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="modal-body"
            >

              {/* FOTO */}
              <div className="form-group full-width">

                <label>
                  Foto UMKM
                </label>

                <div className="foto-upload-area">

                  {formData.foto ? (

                    <div className="foto-preview">

                      <img
                        src={
                          formData.foto
                        }
                        alt="Preview"
                      />

                      <button
                        type="button"
                        className="foto-remove"
                        onClick={
                          handleRemovePhoto
                        }
                        title="Hapus Foto"
                      >
                        <FaTimes />
                      </button>

                    </div>

                  ) : (

                    <label
                      className="foto-upload-label"
                      htmlFor="foto-upload"
                    >

                      <FaImage />

                      <span>
                        Klik untuk upload
                        foto
                      </span>

                      <small>
                        Format: JPG,
                        PNG (Maks.
                        2MB)
                      </small>

                    </label>

                  )}

                  <input
                    id="foto-upload"
                    type="file"
                    accept="image/*"
                    onChange={
                      handleFileUpload
                    }
                    style={{
                      display:
                        "none",
                    }}
                  />

                </div>

              </div>

              {/* FORM GRID */}
              <div className="form-grid">

                {/* ID */}
                <div className="form-group">

                  <label>
                    ID UMKM
                  </label>

                  <input
                    name="id"
                    value={
                      formData.id
                    }
                    readOnly
                    className="input-readonly"
                    placeholder={
                      isEdit
                        ? "ID Database"
                        : "Otomatis dari database"
                    }
                  />

                </div>

                {/* NAMA */}
                <div className="form-group">

                  <label>
                    Nama UMKM
                  </label>

                  <input
                    name="namaUMKM"
                    value={
                      formData.namaUMKM
                    }
                    onChange={
                      handleChange
                    }
                    required
                    placeholder="Contoh: Keripik Singkong Makmur"
                  />

                </div>

                {/* PEMILIK */}
                <div className="form-group">

                  <label>
                    Nama Pemilik
                  </label>

                  <input
                    name="namaPemilik"
                    value={
                      formData.namaPemilik
                    }
                    onChange={
                      handleChange
                    }
                    required
                    placeholder="Nama lengkap pemilik"
                  />

                </div>

                {/* KATEGORI */}
                <div className="form-group">

                  <label>
                    Kategori
                  </label>

                  <select
                    name="kategori"
                    value={
                      formData.kategori
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="Makanan & Minuman">
                      Makanan & Minuman
                    </option>

                    <option value="Fashion & Kerajinan">
                      Fashion & Kerajinan
                    </option>

                    <option value="Kerajinan">
                      Kerajinan
                    </option>

                    <option value="Kesehatan">
                      Kesehatan
                    </option>

                    <option value="Pertanian">
                      Pertanian
                    </option>

                    <option value="Jasa">
                      Jasa
                    </option>

                    <option value="Lainnya">
                      Lainnya
                    </option>

                  </select>

                </div>

                {/* PRODUK */}
                <div className="form-group">

                  <label>
                    Produk Utama
                  </label>

                  <input
                    name="produk"
                    value={
                      formData.produk
                    }
                    onChange={
                      handleChange
                    }
                    required
                    placeholder="Contoh: Keripik Singkong"
                  />

                </div>

                {/* TAHUN */}
                <div className="form-group">

                  <label>
                    Tahun Berdiri
                  </label>

                  <input
                    name="tahunBerdiri"
                    value={
                      formData.tahunBerdiri
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Contoh: 2022"
                    maxLength={4}
                  />

                </div>

                {/* JUMLAH PRODUK */}
                <div className="form-group">

                  <label>
                    Jumlah Varian Produk
                  </label>

                  <input
                    type="number"
                    name="jumlahProduk"
                    value={
                      formData.jumlahProduk
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Contoh: 5"
                    min="0"
                  />

                </div>

                {/* HARGA */}
                <div className="form-group">

                  <label>
                    Harga Mulai
                  </label>

                  <input
                    name="hargaMulai"
                    value={
                      formData.hargaMulai
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Contoh: Rp10.000"
                  />

                </div>

                {/* NO HP */}
                <div className="form-group">

                  <label>
                    No. HP
                  </label>

                  <input
                    name="noHP"
                    value={
                      formData.noHP
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="08xxxxxxxxxx"
                  />

                </div>

                {/* STATUS */}
                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="Aktif">
                      Aktif
                    </option>

                    <option value="Nonaktif">
                      Nonaktif
                    </option>

                  </select>

                </div>

                {/* ALAMAT */}
                <div className="form-group full-width">

                  <label>
                    Alamat Lengkap
                  </label>

                  <input
                    name="alamat"
                    value={
                      formData.alamat
                    }
                    onChange={
                      handleChange
                    }
                    required
                    placeholder="Contoh: Kp. Margalaksana RT 02/RW 08"
                  />

                </div>

                {/* RT */}
                <div className="form-group">

                  <label>
                    RT
                  </label>

                  <input
                    name="rt"
                    value={
                      formData.rt
                    }
                    onChange={
                      handleChange
                    }
                    maxLength={3}
                    placeholder="02"
                  />

                </div>

                {/* RW */}
                <div className="form-group">

                  <label>
                    RW
                  </label>

                  <input
                    name="rw"
                    value={
                      formData.rw
                    }
                    onChange={
                      handleChange
                    }
                    maxLength={3}
                    placeholder="08"
                  />

                </div>

                {/* DESKRIPSI */}
                <div className="form-group full-width">

                  <label>
                    Deskripsi UMKM
                  </label>

                  <textarea
                    name="deskripsi"
                    value={
                      formData.deskripsi
                    }
                    onChange={
                      handleChange
                    }
                    rows="3"
                    placeholder="Jelaskan tentang UMKM ini..."
                  />

                </div>

              </div>

              {/* BUTTON */}
              <div className="form-actions">

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                >
                  {isEdit
                    ? "Simpan Perubahan"
                    : "Tambah UMKM"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default KelolaUMKM;  