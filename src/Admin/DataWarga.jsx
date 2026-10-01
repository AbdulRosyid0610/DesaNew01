// src/Admin/DataWarga.jsx

import { useMemo, useState, useEffect } from "react";
import {
  FaEdit,
  FaPlus,
  FaSearch,
  FaTrash,
  FaFileExcel,
  FaUsers,
  FaMale,
  FaFemale,
  FaHome,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import "./AdminDashboard.css";

// ========================================
// DATA FALLBACK
// ========================================
// Data utama tetap diambil dari database.
// Jika backend mati, tabel akan kosong.
const fallbackWarga = [];

function DataWarga() {
  const [search, setSearch] = useState("");
  const [warga, setWarga] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // ========================================
  // FORM KOSONG
  // ========================================
  const emptyForm = {
    id: "",
    nik: "",
    noKK: "",
    nama: "",
    tempatLahir: "",
    tanggalLahir: "",
    gender: "Laki-laki",
    alamat: "",
    rt: "",
    rw: "",
    dusun: "",
    agama: "Islam",
    statusPerkawinan: "Belum Kawin",
    pendidikan: "",
    pekerjaan: "",
    statusWarga: "Tetap",
    noHP: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  // ========================================
  // AMBIL DATA DARI BACKEND
  // ========================================
  const ambilDataWarga = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/warga");

      if (!response.ok) {
        throw new Error("Gagal mengambil data warga");
      }

      const result = await response.json();

      // Pastikan hasil berupa array
      if (!Array.isArray(result)) {
        throw new Error("Data dari server bukan array");
      }

      // ========================================
      // MAPPING DATABASE -> FRONTEND
      // ========================================
      const mapped = result.map((item) => ({
        // ID database TETAP dipertahankan
        id: item.id,

        nik: item.nik || "",
        noKK: item.no_kk || "",
        nama: item.nama_lengkap || "",
        tempatLahir: item.tempat_lahir || "",
        tanggalLahir: item.tgl_lahir || "",

        gender: item.jk === "L" ? "Laki-laki" : "Perempuan",

        alamat: item.alamat || "",
        rt: item.rt || "",
        rw: item.rw || "",
        dusun: item.dusun || "",

        agama: item.agama || "Islam",

        statusPerkawinan:
          item.status_perkawinan || "Belum Kawin",

        pendidikan: item.pendidikan || "",
        pekerjaan: item.pekerjaan || "",

        statusWarga: item.status_warga || "Tetap",

        noHP: item.no_hp || "",
      }));

      setWarga(mapped);
    } catch (error) {
      console.error("Gagal ambil data warga:", error);
      setWarga(fallbackWarga);
    }
  };

  // ========================================
  // AMBIL DATA SAAT HALAMAN DIBUKA
  // ========================================
  useEffect(() => {
    ambilDataWarga();
  }, []);

  // ========================================
  // PENCARIAN
  // ========================================
  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();

    return warga.filter(
      (item) =>
        String(item.nama || "")
          .toLowerCase()
          .includes(keyword) ||

        String(item.nik || "")
          .toLowerCase()
          .includes(keyword) ||

        String(item.id || "")
          .toLowerCase()
          .includes(keyword) ||

        String(item.alamat || "")
          .toLowerCase()
          .includes(keyword) ||

        String(item.dusun || "")
          .toLowerCase()
          .includes(keyword)
    );
  }, [search, warga]);

  // ========================================
  // STATISTIK WARGA
  // ========================================
  const stats = {
    total: warga.length,

    lakiLaki: warga.filter(
      (w) => w.gender === "Laki-laki"
    ).length,

    perempuan: warga.filter(
      (w) => w.gender === "Perempuan"
    ).length,

    tetap: warga.filter(
      (w) => w.statusWarga === "Tetap"
    ).length,

    pendatang: warga.filter(
      (w) => w.statusWarga === "Pendatang"
    ).length,
  };

  // ========================================
  // BUKA FORM TAMBAH
  // ========================================
  const handleTambah = () => {
    // ID TIDAK dibuat manual.
    // ID akan dibuat oleh database.
    setFormData({
      ...emptyForm,
      id: "",
    });

    setIsEdit(false);
    setShowModal(true);
  };

  // ========================================
  // BUKA FORM EDIT
  // ========================================
  const handleEdit = (item) => {
    setFormData({
      ...item,
    });

    setIsEdit(true);
    setShowModal(true);
  };

  // ========================================
  // SIMPAN DATA
  // TAMBAH / EDIT
  // ========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ========================================
    // VALIDASI
    // ========================================
    if (!formData.nik.trim()) {
      alert("NIK wajib diisi!");
      return;
    }

    if (!formData.noKK.trim()) {
      alert("No. KK wajib diisi!");
      return;
    }

    if (!formData.nama.trim()) {
      alert("Nama lengkap wajib diisi!");
      return;
    }

    if (!formData.tempatLahir.trim()) {
      alert("Tempat lahir wajib diisi!");
      return;
    }

    if (!formData.tanggalLahir.trim()) {
      alert("Tanggal lahir wajib diisi!");
      return;
    }

    if (!formData.alamat.trim()) {
      alert("Alamat wajib diisi!");
      return;
    }

    // ========================================
    // DATA YANG DIKIRIM KE BACKEND
    // ========================================
    const payload = {
      nik: formData.nik.trim(),
      no_kk: formData.noKK.trim(),
      nama_lengkap: formData.nama.trim(),
      tempat_lahir: formData.tempatLahir.trim(),
      tgl_lahir: formData.tanggalLahir.trim(),

      jk:
        formData.gender === "Laki-laki"
          ? "L"
          : "P",

      alamat: formData.alamat.trim(),
      rt: formData.rt.trim(),
      rw: formData.rw.trim(),
      dusun: formData.dusun.trim(),

      agama: formData.agama,

      status_perkawinan:
        formData.statusPerkawinan,

      pendidikan: formData.pendidikan.trim(),
      pekerjaan: formData.pekerjaan.trim(),

      status_warga: formData.statusWarga,

      no_hp: formData.noHP.trim(),
    };

    console.log("DATA WARGA:", payload);

    try {
      let response;

      // ========================================
      // EDIT
      // ========================================
      if (isEdit) {
        response = await fetch(
          `http://localhost:5000/api/warga/${formData.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
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
          "http://localhost:5000/api/warga",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(payload),
          }
        );
      }

      // ========================================
      // BACA RESPONSE
      // ========================================
      const contentType =
        response.headers.get("content-type");

      let result;

      if (
        contentType &&
        contentType.includes("application/json")
      ) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      console.log(
        "STATUS SERVER:",
        response.status
      );

      console.log(
        "RESPONSE SERVER:",
        result
      );

      // ========================================
      // BERHASIL
      // ========================================
      if (response.ok) {
        alert(
          isEdit
            ? "Data warga berhasil diperbarui!"
            : "Data warga berhasil ditambahkan!"
        );

        setShowModal(false);

        setFormData(emptyForm);

        // Ambil data terbaru
        await ambilDataWarga();

        return;
      }

      // ========================================
      // GAGAL
      // ========================================
      let pesanError =
        "Terjadi kesalahan pada server.";

      if (
        typeof result === "object" &&
        result !== null
      ) {
        pesanError =
          result.message ||
          result.error ||
          result.msg ||
          pesanError;
      } else if (
        typeof result === "string" &&
        result.trim() !== ""
      ) {
        pesanError = result;
      }

      console.error(
        "ERROR BACKEND:",
        pesanError
      );

      alert(
        `Gagal menyimpan data warga!\n\n` +
        `Status: ${response.status}\n` +
        `Pesan: ${pesanError}`
      );
    } catch (error) {
      console.error(
        "ERROR KONEKSI BACKEND:",
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
  // HAPUS DATA
  // ========================================
  const deleteWarga = async (id) => {
    if (
      !window.confirm(
        `Hapus data warga dengan ID ${id}?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/warga/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Data warga berhasil dihapus!");

        // Ambil data terbaru
        await ambilDataWarga();
      } else {
        const contentType =
          response.headers.get("content-type");

        let result;

        if (
          contentType &&
          contentType.includes("application/json")
        ) {
          result = await response.json();
        } else {
          result = await response.text();
        }

        console.error(
          "Gagal menghapus:",
          result
        );

        alert("Gagal menghapus data warga.");
      }
    } catch (error) {
      console.error(
        "Error hapus warga:",
        error
      );

      alert(
        "Tidak bisa terhubung ke server."
      );
    }
  };

  // ========================================
  // HANDLE FORM CHANGE
  // ========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========================================
  // EXPORT EXCEL
  // ========================================
  const handleExportExcel = () => {
    const dataToExport = filtered.map(
      (item, index) => ({
        No: index + 1,

        "ID Database": item.id,

        NIK: item.nik,

        "No. KK": item.noKK,

        "Nama Lengkap": item.nama,

        "Tempat Lahir": item.tempatLahir,

        "Tanggal Lahir": item.tanggalLahir,

        "Jenis Kelamin": item.gender,

        Alamat: item.alamat,

        RT: item.rt,

        RW: item.rw,

        Dusun: item.dusun,

        Agama: item.agama,

        "Status Perkawinan":
          item.statusPerkawinan,

        Pendidikan: item.pendidikan,

        Pekerjaan: item.pekerjaan,

        "Status Warga":
          item.statusWarga,

        "No. HP": item.noHP,
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(
        dataToExport
      );

    worksheet["!cols"] = [
      { wch: 5 },
      { wch: 15 },
      { wch: 18 },
      { wch: 18 },
      { wch: 25 },
      { wch: 18 },
      { wch: 20 },
      { wch: 15 },
      { wch: 35 },
      { wch: 8 },
      { wch: 8 },
      { wch: 18 },
      { wch: 15 },
      { wch: 20 },
      { wch: 18 },
      { wch: 20 },
      { wch: 18 },
      { wch: 18 },
    ];

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Data Warga"
    );

    const today =
      new Date()
        .toLocaleDateString("id-ID")
        .replace(/\//g, "-");

    const fileName =
      `Data_Warga_Desa_Margalaksana_${today}.xlsx`;

    XLSX.writeFile(
      workbook,
      fileName
    );

    alert(
      `Berhasil mengexport ${dataToExport.length} data warga ke Excel!`
    );
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="page-container">

      {/* ========================================
          HEADER
      ======================================== */}
      <div className="page-heading">
        <div>
          <h2>Data Warga</h2>

          <p>
            Kelola data penduduk Desa
            Margalaksana secara lengkap.
          </p>
        </div>

        <div className="page-actions">

          <button
            className="btn-excel"
            onClick={handleExportExcel}
          >
            <FaFileExcel />
            Export Excel
          </button>

          <button
            className="primary-button"
            onClick={handleTambah}
          >
            <FaPlus />
            Tambah Warga
          </button>

        </div>
      </div>

      {/* ========================================
          STATISTIK
      ======================================== */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon total">
            <FaUsers />
          </div>

          <div>
            <p>Total Warga</p>
            <h3>{stats.total}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">
            <FaMale />
          </div>

          <div>
            <p>Laki-laki</p>
            <h3>{stats.lakiLaki}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <FaFemale />
          </div>

          <div>
            <p>Perempuan</p>
            <h3>{stats.perempuan}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <FaHome />
          </div>

          <div>
            <p>Warga Tetap</p>
            <h3>{stats.tetap}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon danger">
            <FaHome />
          </div>

          <div>
            <p>Warga Pendatang</p>
            <h3>{stats.pendatang}</h3>
          </div>
        </div>

      </div>

      {/* ========================================
          PANEL DATA
      ======================================== */}
      <div className="panel">

        {/* SEARCH */}
        <div className="toolbar">

          <div className="search-box">

            <FaSearch />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Cari ID, NIK, Nama, Alamat, atau Dusun..."
            />

          </div>

          <span className="result-count">
            {filtered.length} data ditemukan
          </span>

        </div>

        {/* ========================================
            TABLE
        ======================================== */}
        <div
          className="table-wrapper"
          style={{
            overflowX: "auto",
            width: "100%",
          }}
        >

          <table
            className="data-table"
            style={{
              minWidth: "1800px",
              width: "100%",
            }}
          >

            <thead>
              <tr>

                {/* NOMOR URUT */}
                <th>No</th>

                <th>NIK</th>

                <th>No. KK</th>

                <th>Nama Lengkap</th>

                <th>Tempat Lahir</th>

                <th>Tgl Lahir</th>

                <th>JK</th>

                <th>Alamat</th>

                <th>RT</th>

                <th>RW</th>

                <th>Dusun</th>

                <th>Agama</th>

                <th>Status Kawin</th>

                <th>Pendidikan</th>

                <th>Pekerjaan</th>

                <th>Status Warga</th>

                <th>No. HP</th>

                <th>Aksi</th>

              </tr>
            </thead>

            <tbody>

              {filtered.map(
                (item, index) => (
                  <tr key={item.id}>

                    {/* ========================================
                        NOMOR OTOMATIS
                        ======================================== */}
                    <td>
                      <strong>
                        {index + 1}
                      </strong>
                    </td>

                    <td>
                      {item.nik}
                    </td>

                    <td>
                      {item.noKK}
                    </td>

                    <td>
                      {item.nama}
                    </td>

                    <td>
                      {item.tempatLahir}
                    </td>

                    <td>
                      {item.tanggalLahir}
                    </td>

                    <td>
                      {item.gender ===
                      "Laki-laki"
                        ? "L"
                        : "P"}
                    </td>

                    <td>
                      {item.alamat}
                    </td>

                    <td>
                      {item.rt}
                    </td>

                    <td>
                      {item.rw}
                    </td>

                    <td>
                      {item.dusun}
                    </td>

                    <td>
                      {item.agama}
                    </td>

                    <td>
                      {item.statusPerkawinan}
                    </td>

                    <td>
                      {item.pendidikan}
                    </td>

                    <td>
                      {item.pekerjaan}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          item.statusWarga ===
                          "Tetap"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {item.statusWarga}
                      </span>

                    </td>

                    <td>
                      {item.noHP}
                    </td>

                    {/* AKSI */}
                    <td>

                      <div className="table-actions">

                        {/* EDIT */}
                        <button
                          className="icon-button edit"
                          title="Edit"
                          onClick={() =>
                            handleEdit(item)
                          }
                        >
                          <FaEdit />
                        </button>

                        {/* HAPUS */}
                        <button
                          className="icon-button delete"
                          title="Hapus"
                          onClick={() =>
                            deleteWarga(
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
        {filtered.length === 0 && (
          <div className="empty-state">
            Data warga tidak ditemukan.
          </div>
        )}

      </div>

      {/* ========================================
          MODAL TAMBAH / EDIT
      ======================================== */}
      {showModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="modal-content modal-large"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER MODAL */}
            <div className="modal-header">

              <h3>
                {isEdit
                  ? "Edit Data Warga"
                  : "Tambah Data Warga"}
              </h3>

              <button
                className="modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="modal-body"
            >

              <div className="form-grid">

                {/* ID DATABASE */}
                <div className="form-group">

                  <label>
                    ID Database
                  </label>

                  <input
                    name="id"
                    value={formData.id}
                    readOnly
                    className="input-readonly"
                    placeholder={
                      isEdit
                        ? "ID Database"
                        : "Otomatis dari database"
                    }
                  />

                </div>

                {/* NIK */}
                <div className="form-group">

                  <label>NIK</label>

                  <input
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    required
                    maxLength={16}
                    placeholder="16 digit NIK"
                  />

                </div>

                {/* NO KK */}
                <div className="form-group">

                  <label>No. KK</label>

                  <input
                    name="noKK"
                    value={formData.noKK}
                    onChange={handleChange}
                    required
                    maxLength={16}
                    placeholder="16 digit No. KK"
                  />

                </div>

                {/* NAMA */}
                <div className="form-group">

                  <label>
                    Nama Lengkap
                  </label>

                  <input
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* TEMPAT LAHIR */}
                <div className="form-group">

                  <label>
                    Tempat Lahir
                  </label>

                  <input
                    name="tempatLahir"
                    value={
                      formData.tempatLahir
                    }
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* TANGGAL LAHIR */}
                <div className="form-group">

                  <label>
                    Tanggal Lahir
                  </label>

                  <input
                    name="tanggalLahir"
                    value={
                      formData.tanggalLahir
                    }
                    onChange={handleChange}
                    required
                    placeholder="Contoh: 10 Januari 2009"
                  />

                </div>

                {/* JENIS KELAMIN */}
                <div className="form-group">

                  <label>
                    Jenis Kelamin
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >

                    <option value="Laki-laki">
                      Laki-laki
                    </option>

                    <option value="Perempuan">
                      Perempuan
                    </option>

                  </select>

                </div>

                {/* AGAMA */}
                <div className="form-group">

                  <label>Agama</label>

                  <select
                    name="agama"
                    value={formData.agama}
                    onChange={handleChange}
                  >

                    <option value="Islam">
                      Islam
                    </option>

                    <option value="Kristen">
                      Kristen
                    </option>

                    <option value="Katolik">
                      Katolik
                    </option>

                    <option value="Hindu">
                      Hindu
                    </option>

                    <option value="Buddha">
                      Buddha
                    </option>

                    <option value="Konghucu">
                      Konghucu
                    </option>

                  </select>

                </div>

                {/* STATUS PERKAWINAN */}
                <div className="form-group">

                  <label>
                    Status Perkawinan
                  </label>

                  <select
                    name="statusPerkawinan"
                    value={
                      formData.statusPerkawinan
                    }
                    onChange={handleChange}
                  >

                    <option value="Belum Kawin">
                      Belum Kawin
                    </option>

                    <option value="Kawin">
                      Kawin
                    </option>

                    <option value="Cerai Hidup">
                      Cerai Hidup
                    </option>

                    <option value="Cerai Mati">
                      Cerai Mati
                    </option>

                  </select>

                </div>

                {/* PENDIDIKAN */}
                <div className="form-group">

                  <label>
                    Pendidikan
                  </label>

                  <input
                    name="pendidikan"
                    value={
                      formData.pendidikan
                    }
                    onChange={handleChange}
                    placeholder="Contoh: SMA"
                  />

                </div>

                {/* PEKERJAAN */}
                <div className="form-group">

                  <label>
                    Pekerjaan
                  </label>

                  <input
                    name="pekerjaan"
                    value={
                      formData.pekerjaan
                    }
                    onChange={handleChange}
                    placeholder="Contoh: Petani"
                  />

                </div>

                {/* STATUS WARGA */}
                <div className="form-group">

                  <label>
                    Status Warga
                  </label>

                  <select
                    name="statusWarga"
                    value={
                      formData.statusWarga
                    }
                    onChange={handleChange}
                  >

                    <option value="Tetap">
                      Tetap
                    </option>

                    <option value="Pendatang">
                      Pendatang
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
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* RT */}
                <div className="form-group">

                  <label>RT</label>

                  <input
                    name="rt"
                    value={formData.rt}
                    onChange={handleChange}
                    maxLength={3}
                    placeholder="001"
                  />

                </div>

                {/* RW */}
                <div className="form-group">

                  <label>RW</label>

                  <input
                    name="rw"
                    value={formData.rw}
                    onChange={handleChange}
                    maxLength={3}
                    placeholder="001"
                  />

                </div>

                {/* DUSUN */}
                <div className="form-group">

                  <label>Dusun</label>

                  <input
                    name="dusun"
                    value={formData.dusun}
                    onChange={handleChange}
                    placeholder="Nama dusun"
                  />

                </div>

                {/* NO HP */}
                <div className="form-group">

                  <label>
                    No. HP
                  </label>

                  <input
                    name="noHP"
                    value={formData.noHP}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                  />

                </div>

              </div>

              {/* BUTTON FORM */}
              <div className="form-actions">

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() =>
                    setShowModal(false)
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
                    : "Tambah Warga"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default DataWarga;