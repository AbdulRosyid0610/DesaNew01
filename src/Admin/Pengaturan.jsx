import { useState } from "react";
import { FaSave, FaUser, FaGlobe, FaBell } from "react-icons/fa";
import "./AdminDashboard.css";

function Pengaturan() {
  const [form, setForm] = useState({
    namaDesa: "Desa Margalaksana",
    email: "admin@desamargalaksana.id",
    telepon: "08xxxxxxxxxx",
    notifikasi: true,
  });

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const save = (e) => {
    e.preventDefault();
    alert("Pengaturan berhasil disimpan.");
  };

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <h2>Pengaturan</h2>
          <p>Atur informasi dan preferensi dashboard admin.</p>
        </div>
      </div>

      <form onSubmit={save} className="settings-grid">
        <section className="panel settings-card">
          <div className="settings-title">
            <FaGlobe />
            <div>
              <h3>Informasi Desa</h3>
              <p>Informasi dasar desa yang ditampilkan pada sistem.</p>
            </div>
          </div>

          <label>
            Nama Desa
            <input value={form.namaDesa} onChange={(e) => update("namaDesa", e.target.value)} />
          </label>

          <label>
            Email Desa
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </label>

          <label>
            Nomor Telepon
            <input value={form.telepon} onChange={(e) => update("telepon", e.target.value)} />
          </label>
        </section>

        <section className="panel settings-card">
          <div className="settings-title">
            <FaUser />
            <div>
              <h3>Akun Admin</h3>
              <p>Informasi akun yang sedang digunakan.</p>
            </div>
          </div>

          <label>
            Nama Admin
            <input value="Administrator" readOnly />
          </label>

          <label>
            Peran
            <input value="Admin Desa" readOnly />
          </label>

          <div className="notification-setting">
            <div className="settings-title small">
              <FaBell />
              <div>
                <strong>Notifikasi</strong>
                <span>Terima notifikasi pengaduan baru.</span>
              </div>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={form.notifikasi}
                onChange={(e) => update("notifikasi", e.target.checked)}
              />
              <span />
            </label>
          </div>
        </section>

        <div className="settings-save">
          <button className="primary-button" type="submit">
            <FaSave /> Simpan Pengaturan
          </button>
        </div>
      </form>
    </div>
  );
}

export default Pengaturan;
