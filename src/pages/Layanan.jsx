import React from 'react'

const Layanan = () => {
  return (
    <>
      {/* =========================================
          STYLE KHUSUS AGAR HEADER NEMPEL KE ATAS
      ========================================= */}
      <style>{`
        .page-section:has(.layanan-page) {
          padding-top: 0 !important;
          margin-top: 0 !important;
        }
      `}</style>

      <section className="page-section layanan-page">

        {/* =========================================
            HEADER HIJAU ELEGAN
        ========================================= */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f3d24 0%, #155b37 55%, #17633d 100%)",
            borderLeft: "6px solid #d4af37",
            boxShadow: "0 8px 25px rgba(15, 61, 36, 0.18)",
            padding: "58px 48px 52px",
            marginTop: "0px",
            marginBottom: "44px",
            width: "100vw",
            maxWidth: "100vw",
            marginLeft: 0,
            boxSizing: "border-box",
            position: "relative",
            minHeight: "230px",
            textAlign: "left",
          }}
        >
          <h2
            style={{
              color: "#ffffff",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "34px",
              fontWeight: 700,
              margin: "0 0 16px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              lineHeight: 1.2,
              letterSpacing: "-0.3px",
            }}
          >
            <i
              className="fas fa-file-signature"
              style={{ color: "#d4af37", width: "32px", fontSize: "29px", textAlign: "center", flexShrink: 0 }}
            ></i>
            Pengajuan Layanan Warga
          </h2>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.93)",
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: "850px",
              margin: 0,
              fontWeight: 400,
            }}
          >
            Lengkapi formulir di bawah ini dengan informasi yang valid agar proses verifikasi dan penerbitan dokumen berjalan lancar.
          </p>
        </div>

        {/* =========================================
            FORMULIR LAYANAN
        ========================================= */}
        <div style={styles.layananWrapper}>
          <div style={styles.layananCard}>
            <div style={styles.formTitle}>Formulir Pengajuan Layanan</div>
            <div style={styles.formSub}>Isi data dengan benar untuk memproses permohonan layanan Anda</div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Nama Lengkap <span style={styles.required}>*</span></label>
              <input type="text" placeholder="Contoh: Ahmad Fauzan" style={styles.input} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Kampung / Dusun <span style={styles.required}>*</span></label>
              <select style={styles.input}>
                <option value="">Pilih Dusun...</option>
                <option>Dusun Cikawung</option>
                <option>Dusun Cipanas</option>
                <option>Dusun Cibitung</option>
                <option>Dusun Sukamulya</option>
                <option>Dusun Mandiri</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Nomor Induk Kependudukan (NIK)</label>
              <input type="text" placeholder="16 digit NIK sesuai KTP" style={styles.input} />
              <div style={styles.helperText}>Masukkan 16 digit NIK tanpa spasi</div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>RT</label>
                <input type="text" placeholder="001" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>RW</label>
                <input type="text" placeholder="002" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Nomor WhatsApp / HP Aktif <span style={styles.required}>*</span></label>
              <input type="text" placeholder="08xxxxxxxxxx" style={styles.input} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Jenis Layanan <span style={styles.required}>*</span></label>
              <select style={styles.input}>
                <option value="">Pilih Jenis Layanan...</option>
                <option>Surat Keterangan Domisili</option>
                <option>Surat Keterangan Usaha</option>
                <option>Surat Keterangan Tidak Mampu</option>
                <option>Kartu Keluarga (KK)</option>
                <option>KTP Elektronik</option>
                <option>Izin Mendirikan Bangunan</option>
                <option>Layanan Kesehatan</option>
                <option>Layanan Sosial</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Foto KTP (Opsional)</label>
              <div style={styles.fileWrapper}>
                <span style={styles.fileLabel}><i className="fas fa-upload"></i> Choose File</span>
                <span style={styles.fileName}>No file chosen</span>
              </div>
              <div style={styles.helperText}>Upload foto KTP dalam format JPG/PNG (maks. 2MB)</div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Foto KK (Opsional)</label>
              <div style={styles.fileWrapper}>
                <span style={styles.fileLabel}><i className="fas fa-upload"></i> Choose File</span>
                <span style={styles.fileName}>No file chosen</span>
              </div>
              <div style={styles.helperText}>Upload foto KK dalam format JPG/PNG (maks. 2MB)</div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Keterangan / Keperluan Tambahan</label>
              <textarea placeholder="Tuliskan keterangan detail keperluan Anda..." style={{ ...styles.input, minHeight: '90px', resize: 'vertical' }}></textarea>
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px 40px' }}>
              <i className="fas fa-paper-plane"></i> Kirim Permohonan Layanan →
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  layananWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    maxWidth: '820px',
    margin: '0 auto',
  },
  layananCard: {
    background: 'white',
    padding: '40px 44px',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    border: '1px solid rgba(110, 200, 230, 0.1)',
  },
  formTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '6px',
  },
  formSub: {
    color: '#78909c',
    fontSize: '0.95rem',
    marginBottom: '28px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '18px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontWeight: 600,
    display: 'block',
    marginBottom: '5px',
    fontSize: '0.9rem',
    color: '#37474f',
  },
  required: {
    color: '#ef5350',
    marginLeft: '2px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1.5px solid #e8edf2',
    borderRadius: '14px',
    fontFamily: 'inherit',
    background: '#fafcfe',
    transition: '0.25s ease',
    fontSize: '0.95rem',
  },
  helperText: {
    fontSize: '0.75rem',
    color: '#90a4ae',
    marginTop: '4px',
  },
  fileWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  fileLabel: {
    display: 'inline-block',
    padding: '10px 20px',
    background: '#f0f4f8',
    borderRadius: '40px',
    fontWeight: 500,
    fontSize: '0.85rem',
    color: '#455a64',
    border: '1px solid #e8edf2',
  },
  fileName: {
    color: '#90a4ae',
    fontSize: '0.85rem',
  },
}

export default Layanan