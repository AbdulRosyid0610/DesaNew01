import React from 'react';
import { statistikData } from "../Data/statistikData";

const Statistik = () => {
  // Hitung nilai maksimum untuk skala tinggi bar
  const maxKelahiranKematian = Math.max(
    ...statistikData.kelahiranKematian.flatMap(item => [item.kelahiran, item.kematian])
  );

  const maxPertumbuhan = Math.max(
    ...statistikData.pertumbuhanPenduduk.flatMap(item => [item.kelahiran, item.kematian])
  );

  return (
    <section className="page-section">
      {/* ===== HEADER HIJAU ELEGAN ===== */}
      <div style={styles.statHeader}>
        <h2 style={styles.statHeaderTitle}>
          <i className="fas fa-chart-bar" style={{ marginRight: '12px', color: '#d4af37' }}></i>
          Statistik &amp; Demografi Wilayah
        </h2>
        <p style={styles.statHeaderDesc}>
          Ringkasan data agregat kependudukan, tingkat pendidikan, ketenagakerjaan, dan administrasi warga Desa Margalaksana secara transparan.
        </p>
      </div>

      {/* ===== STAT CARDS ===== */}
      <div style={styles.statCards}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{statistikData.totalPenduduk}</div>
          <div style={styles.statLabel}>Total Penduduk</div>
          <span style={styles.statChange}>↑ +3.2% tahun ini</span>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{statistikData.rasioGender}</div>
          <div style={styles.statLabel}>Rasio Gender</div>
          <div style={styles.statSub}>51% L / 49% P</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{statistikData.kepadatan}</div>
          <div style={styles.statLabel}>Kepadatan</div>
          <div style={styles.statSub}>Jiwa / km²</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{statistikData.kepalaKeluarga}</div>
          <div style={styles.statLabel}>Kepala Keluarga</div>
          <div style={styles.statSub}>Kartu Keluarga Aktif</div>
        </div>
      </div>

      {/* ===== LAJU KELAHIRAN & KEMATIAN (BAR CHART) ===== */}
      <div style={styles.statSection}>
        <h3 style={styles.statSectionTitle}>
          <i className="fas fa-baby" style={{ color: '#1a5e3a' }}></i>
          Laju Kelahiran &amp; Kematian
        </h3>
        <p style={styles.sectionDesc}>
          Tren dinamika kependudukan alami 5 tahun terakhir (2022–2026)
        </p>

        {/* Legend */}
        <div style={styles.legend}>
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: '#1a5e3a' }}></span> Kelahiran
          </span>
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: '#d4af37' }}></span> Kematian
          </span>
        </div>

        <div style={styles.chartWrapper}>
          {statistikData.kelahiranKematian.map((item, index) => (
            <div key={index} style={styles.chartGroup}>
              <div style={styles.barsContainer}>
                {/* Bar Kelahiran */}
                <div style={styles.barWrapper}>
                  <span style={styles.barValue}>{item.kelahiran}</span>
                  <div
                    style={{
                      ...styles.bar,
                      height: `${(item.kelahiran / maxKelahiranKematian) * 180}px`,
                      background: 'linear-gradient(180deg, #1a5e3a, #0f3d24)',
                    }}
                  ></div>
                </div>
                {/* Bar Kematian */}
                <div style={styles.barWrapper}>
                  <span style={styles.barValue}>{item.kematian}</span>
                  <div
                    style={{
                      ...styles.bar,
                      height: `${(item.kematian / maxKelahiranKematian) * 180}px`,
                      background: 'linear-gradient(180deg, #f4d77c, #d4af37)',
                    }}
                  ></div>
                </div>
              </div>
              <div style={styles.barLabel}>{item.tahun}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PERTUMBUHAN PENDUDUK (BAR CHART + TABEL ANGKA) ===== */}
      <div style={styles.statSection}>
        <h3 style={styles.statSectionTitle}>
          <i className="fas fa-chart-line" style={{ color: '#1a5e3a' }}></i>
          Rincian Pertumbuhan Penduduk Tahunan
        </h3>

        {/* Legend */}
        <div style={styles.legend}>
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: '#1a5e3a' }}></span> Kelahiran
          </span>
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: '#d4af37' }}></span> Kematian
          </span>
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: '#546e7a' }}></span> Total Penduduk
          </span>
        </div>

        <div style={styles.chartWrapper}>
          {statistikData.pertumbuhanPenduduk.map((item, index) => (
            <div key={index} style={styles.chartGroup}>
              <div style={styles.barsContainer}>
                {/* Bar Kelahiran */}
                <div style={styles.barWrapper}>
                  <span style={styles.barValue}>{item.kelahiran}</span>
                  <div
                    style={{
                      ...styles.bar,
                      height: `${(item.kelahiran / maxPertumbuhan) * 160}px`,
                      background: 'linear-gradient(180deg, #1a5e3a, #0f3d24)',
                    }}
                  ></div>
                </div>
                {/* Bar Kematian */}
                <div style={styles.barWrapper}>
                  <span style={styles.barValue}>{item.kematian}</span>
                  <div
                    style={{
                      ...styles.bar,
                      height: `${(item.kematian / maxPertumbuhan) * 160}px`,
                      background: 'linear-gradient(180deg, #f4d77c, #d4af37)',
                    }}
                  ></div>
                </div>
                {/* Bar Total Penduduk (dibagi skala agar proporsional) */}
                <div style={styles.barWrapper}>
                  <span style={styles.barValue}>{item.total}</span>
                  <div
                    style={{
                      ...styles.bar,
                      height: `${(item.total / (maxPertumbuhan * 12)) * 160}px`,
                      background: 'linear-gradient(180deg, #78909c, #546e7a)',
                    }}
                  ></div>
                </div>
              </div>
              <div style={styles.barLabel}>{item.tahun}</div>
              <div style={styles.barSubLabel}>{item.laju}</div>
            </div>
          ))}
        </div>

        {/* Tabel angka tetap ditampilkan di bawah chart */}
        <div style={{ ...styles.tableWrapper, marginTop: '24px' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Tahun</th>
                <th style={styles.th}>Kelahiran</th>
                <th style={styles.th}>Kematian</th>
                <th style={styles.th}>Total Penduduk</th>
                <th style={styles.th}>Laju Pertumbuhan</th>
              </tr>
            </thead>
            <tbody>
              {statistikData.pertumbuhanPenduduk.map((item, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{item.tahun}</td>
                  <td style={styles.td}>{item.kelahiran}</td>
                  <td style={styles.td}>{item.kematian}</td>
                  <td style={styles.td}>{item.total}</td>
                  <td style={{ ...styles.td, color: '#1a5e3a', fontWeight: 600 }}>{item.laju}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== PENDIDIKAN & PEKERJAAN ===== */}
      <div style={styles.statGrid2Col}>
        <div style={styles.statSection}>
          <h3 style={styles.statSectionTitle}>
            <i className="fas fa-graduation-cap" style={{ color: '#1a5e3a' }}></i>
            Tingkat Pendidikan
          </h3>
          <div style={styles.listStat}>
            {statistikData.pendidikan.map((item, index) => (
              <div key={index} style={styles.listItem}>
                <span style={styles.listLabel}>{item.label}</span>
                <span style={styles.listValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.statSection}>
          <h3 style={styles.statSectionTitle}>
            <i className="fas fa-briefcase" style={{ color: '#1a5e3a' }}></i>
            Mata Pencaharian Utama
          </h3>
          <div style={styles.listStat}>
            {statistikData.pekerjaan.map((item, index) => (
              <div key={index} style={styles.listItem}>
                <span style={styles.listLabel}>{item.label}</span>
                <span style={styles.listValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== BPJS ===== */}
      <div style={styles.statSection}>
        <h3 style={styles.statSectionTitle}>
          <i className="fas fa-heartbeat" style={{ color: '#1a5e3a' }}></i>
          Jaminan Kesehatan (BPJS)
        </h3>
        <div style={styles.bpjsGrid}>
          {statistikData.bpjs.map((item, index) => (
            <div key={index} style={styles.bpjsItem}>
              <div style={styles.bpjsValue}>{item.value}</div>
              <div style={styles.bpjsLabel}>{item.label}</div>
              <div style={styles.bpjsPersen}>{item.persen}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== DOKUMEN KEPENDUDUKAN ===== */}
      <div style={styles.statSection}>
        <h3 style={styles.statSectionTitle}>
          <i className="fas fa-id-card" style={{ color: '#1a5e3a' }}></i>
          Cakupan Dokumen Kependudukan
        </h3>
        <div style={styles.bpjsGrid}>
          {statistikData.dokumen.map((item, index) => (
            <div key={index} style={styles.bpjsItem}>
              <div style={styles.bpjsValue}>{item.value}</div>
              <div style={styles.bpjsLabel}>{item.label}</div>
              <div style={styles.bpjsPersen}>{item.persen}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  /* ===== HEADER HIJAU ===== */
  statHeader: {
    background: 'linear-gradient(135deg, #0f3d24 0%, #1a5e3a 100%)',
    borderRadius: 'var(--radius)',
    padding: '50px 40px',
    marginBottom: '40px',
    borderLeft: '6px solid #d4af37',
    boxShadow: '0 8px 30px rgba(15, 61, 36, 0.25)',
    position: 'relative',
    overflow: 'hidden',
  },
  statHeaderTitle: {
    fontSize: '2rem',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '10px',
    letterSpacing: '-0.5px',
  },
  statHeaderDesc: {
    fontSize: '1.05rem',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.6,
    maxWidth: '800px',
  },

  /* ===== STAT CARDS ===== */
  statCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    background: 'white',
    padding: '24px 20px',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    border: '1px solid rgba(26, 94, 58, 0.1)',
    textAlign: 'center',
    transition: '0.25s ease',
    borderTop: '3px solid #d4af37',
  },
  statValue: {
    fontSize: '2.4rem',
    fontWeight: 700,
    fontFamily: "'Playfair Display', serif",
    color: '#0f3d24',
    lineHeight: 1.2,
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#546e7a',
    fontWeight: 500,
    marginTop: '4px',
  },
  statChange: {
    fontSize: '0.75rem',
    color: '#0f3d24',
    fontWeight: 600,
    marginTop: '8px',
    display: 'inline-block',
    background: 'linear-gradient(135deg, #f4d77c, #d4af37)',
    padding: '3px 12px',
    borderRadius: '40px',
  },
  statSub: {
    fontSize: '0.7rem',
    color: '#90a4ae',
    marginTop: '2px',
  },

  /* ===== SECTION ===== */
  statSection: { marginBottom: '40px' },
  statSectionTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#0f3d24',
    fontFamily: "'Playfair Display', serif",
  },
  sectionDesc: {
    color: '#546e7a',
    marginBottom: '16px',
    fontSize: '0.95rem',
  },

  /* ===== LEGEND ===== */
  legend: {
    display: 'flex',
    gap: '24px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    color: '#546e7a',
    fontWeight: 500,
  },
  legendDot: {
    width: '14px',
    height: '14px',
    borderRadius: '4px',
    display: 'inline-block',
  },

  /* ===== CHART ===== */
  chartWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    gap: '16px',
    background: 'white',
    borderRadius: 'var(--radius)',
    padding: '30px 20px 20px',
    boxShadow: 'var(--shadow)',
    border: '1px solid rgba(26, 94, 58, 0.1)',
    overflowX: 'auto',
    minHeight: '260px',
  },
  chartGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '70px',
    flex: '1 1 0',
  },
  barsContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '6px',
    height: '190px',
  },
  barWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  barValue: {
    fontSize: '0.72rem',
    fontWeight: 700,
    color: '#0f3d24',
    marginBottom: '4px',
    whiteSpace: 'nowrap',
  },
  bar: {
    width: '28px',
    borderRadius: '6px 6px 0 0',
    transition: 'height 0.6s ease',
    minHeight: '4px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
  },
  barLabel: {
    marginTop: '10px',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#37474f',
  },
  barSubLabel: {
    fontSize: '0.72rem',
    color: '#1a5e3a',
    fontWeight: 700,
    marginTop: '2px',
  },

  /* ===== TABLE ===== */
  tableWrapper: {
    background: 'white',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
    border: '1px solid rgba(26, 94, 58, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
  },
  th: {
    background: 'linear-gradient(135deg, #0f3d24, #1a5e3a)',
    color: '#ffffff',
    padding: '14px 18px',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '0.88rem',
    letterSpacing: '0.5px',
  },
  tr: {
    borderBottom: '1px solid #f0f4f8',
  },
  td: {
    padding: '12px 18px',
    color: '#37474f',
  },

  /* ===== GRID 2 COL ===== */
  statGrid2Col: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '28px',
    marginBottom: '40px',
  },

  /* ===== LIST STAT ===== */
  listStat: {
    background: 'white',
    borderRadius: 'var(--radius)',
    padding: '20px 24px',
    boxShadow: 'var(--shadow)',
    border: '1px solid rgba(26, 94, 58, 0.1)',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #f0f4f8',
    alignItems: 'center',
  },
  listLabel: { fontWeight: 500, color: '#37474f' },
  listValue: { fontWeight: 700, color: '#1a5e3a' },

  /* ===== BPJS / DOKUMEN ===== */
  bpjsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
  },
  bpjsItem: {
    background: 'white',
    borderRadius: 'var(--radius)',
    padding: '18px 20px',
    boxShadow: 'var(--shadow)',
    border: '1px solid rgba(26, 94, 58, 0.1)',
    borderTop: '3px solid #1a5e3a',
    textAlign: 'center',
  },
  bpjsValue: {
    fontSize: '1.6rem',
    fontWeight: 700,
    fontFamily: "'Playfair Display', serif",
    color: '#0f3d24',
  },
  bpjsLabel: { fontSize: '0.8rem', color: '#546e7a', marginTop: '2px' },
  bpjsPersen: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#0f3d24',
    marginTop: '6px',
    display: 'inline-block',
    background: 'linear-gradient(135deg, #f4d77c, #d4af37)',
    padding: '2px 12px',
    borderRadius: '40px', 
  },
}

export default Statistik