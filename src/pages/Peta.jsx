import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaShieldAlt,
  FaLandmark,
  FaGraduationCap,
  FaHospital,
  FaMosque,
  FaStore,
  FaVideo,
  FaLightbulb,
  FaExclamationCircle,
  FaChevronRight,
  FaDownload,
  FaExpand,
  FaPrint,
  FaMapMarkerAlt,
  FaLayerGroup,
  FaCompass,
  FaSearchPlus,
  FaSearchMinus,
} from "react-icons/fa";

import "./Peta.css";

const PetaMargalaksana = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showLegend, setShowLegend] = useState(true);

  // ================== DATA FILTER ==================
  const filters = [
    { id: "batas", label: "Batas Wilayah", icon: <FaShieldAlt />, color: "blue", count: 1 },
    { id: "umum", label: "Fasilitas Umum", icon: <FaLandmark />, color: "cyan", count: 8 },
    { id: "pendidikan", label: "Pendidikan", icon: <FaGraduationCap />, color: "violet", count: 5 },
    { id: "kesehatan", label: "Kesehatan", icon: <FaHospital />, color: "rose", count: 3 },
    { id: "ibadah", label: "Tempat Ibadah", icon: <FaMosque />, color: "emerald", count: 6 },
    { id: "umkm", label: "UMKM / Ekonomi", icon: <FaStore />, color: "amber", count: 4 },
    { id: "cctv", label: "CCTV Pengawas", icon: <FaVideo />, color: "red", count: 8 },
    { id: "pju", label: "PJU / Rawan", icon: <FaLightbulb />, color: "slate", count: 4 },
  ];

  // ================== DATA MARKER ==================
  const markers = [
    // ==== Dusun Sukamanah ====
    { id: 1, type: "pendidikan", icon: <FaGraduationCap />, x: 24, y: 22, label: "SDN Sukamanah 1" },
    { id: 2, type: "umum", icon: <FaLandmark />, x: 31, y: 26, label: "Balai Desa Margalaksana" },
    { id: 3, type: "ibadah", icon: <FaMosque />, x: 38, y: 21, label: "Masjid Al-Hikmah" },
    { id: 4, type: "cctv", icon: <FaVideo />, x: 27, y: 29, label: "CCTV Simpang Sukamanah" },

    // ==== Dusun Cikadu ====
    { id: 5, type: "kesehatan", icon: <FaHospital />, x: 15, y: 44, label: "Puskesmas Cikadu" },
    { id: 6, type: "umum", icon: <FaLandmark />, x: 20, y: 50, label: "Kantor Dusun Cikadu" },
    { id: 7, type: "cctv", icon: <FaVideo />, x: 24, y: 47, label: "CCTV Jl. Raya Cikadu" },
    { id: 8, type: "pju", icon: <FaLightbulb />, x: 17, y: 57, label: "PJU Simpang Cikadu" },
    { id: 9, type: "ibadah", icon: <FaMosque />, x: 22, y: 58, label: "Musholla Al-Ikhlas" },

    // ==== Dusun Padamenak ====
    { id: 10, type: "umum", icon: <FaLandmark />, x: 40, y: 33, label: "GOR Padamenak" },
    { id: 11, type: "umum", icon: <FaLandmark />, x: 42, y: 52, label: "Pasar Desa Margalaksana" },
    { id: 12, type: "pendidikan", icon: <FaGraduationCap />, x: 47, y: 46, label: "SMPN 1 Margalaksana" },
    { id: 13, type: "cctv", icon: <FaVideo />, x: 45, y: 57, label: "CCTV Pasar" },
    { id: 14, type: "ibadah", icon: <FaMosque />, x: 49, y: 63, label: "Masjid Jami Padamenak" },
    { id: 15, type: "umkm", icon: <FaStore />, x: 38, y: 58, label: "Sentra Kuliner" },

    // ==== Dusun Margaluyu ====
    { id: 16, type: "umum", icon: <FaLandmark />, x: 60, y: 30, label: "Balai Pertemuan Margaluyu" },
    { id: 17, type: "kesehatan", icon: <FaHospital />, x: 66, y: 29, label: "Klinik Pratama Sehat" },
    { id: 18, type: "cctv", icon: <FaVideo />, x: 63, y: 36, label: "CCTV Perempatan Margaluyu" },
    { id: 19, type: "umkm", icon: <FaStore />, x: 73, y: 30, label: "Sentra Kerajinan Bambu" },
    { id: 20, type: "pendidikan", icon: <FaGraduationCap />, x: 70, y: 37, label: "PAUD Tunas Harapan" },

    // ==== Dusun Sukaraja ====
    { id: 21, type: "ibadah", icon: <FaMosque />, x: 72, y: 44, label: "Musholla Nurul Iman" },
    { id: 22, type: "pendidikan", icon: <FaGraduationCap />, x: 75, y: 47, label: "MI Sukaraja" },
    { id: 23, type: "umum", icon: <FaLandmark />, x: 66, y: 52, label: "Lapangan Sukaraja" },
    { id: 24, type: "cctv", icon: <FaVideo />, x: 73, y: 53, label: "CCTV Lapangan" },
    { id: 25, type: "kesehatan", icon: <FaHospital />, x: 68, y: 45, label: "Posyandu Sukaraja" },

    // ==== Dusun Babakan ====
    { id: 26, type: "umum", icon: <FaLandmark />, x: 27, y: 73, label: "Kantor Dusun Babakan" },
    { id: 27, type: "ibadah", icon: <FaMosque />, x: 32, y: 71, label: "Masjid Baiturrahman" },
    { id: 28, type: "pendidikan", icon: <FaGraduationCap />, x: 39, y: 69, label: "SDN Babakan 2" },
    { id: 29, type: "pju", icon: <FaLightbulb />, x: 45, y: 77, label: "PJU Jl. Babakan" },
    { id: 30, type: "cctv", icon: <FaVideo />, x: 34, y: 78, label: "CCTV Babakan" },

    // ==== Dusun Pangkalan ====
    { id: 31, type: "umkm", icon: <FaStore />, x: 55, y: 66, label: "Koperasi Desa" },
    { id: 32, type: "umum", icon: <FaLandmark />, x: 62, y: 67, label: "Posyandu Pangkalan" },
    { id: 33, type: "pju", icon: <FaLightbulb />, x: 71, y: 64, label: "PJU Jl. Pangkalan" },
    { id: 34, type: "umkm", icon: <FaStore />, x: 59, y: 73, label: "Warung Tani" },
  ];

  const visibleMarkers = useMemo(
    () => (activeFilter === "all" ? markers : markers.filter((m) => m.type === activeFilter)),
    [activeFilter, markers]
  );

  const stats = [
    { value: "6", label: "Dusun" },
    { value: "08", label: "RW" },
    { value: "34", label: "Fasilitas" },
    { value: "08", label: "CCTV" },
  ];

  return (
    <section className="mrg-section" id="peta-wilayah">
      <Helmet>
        <title>Peta Digital Desa Margalaksana | Kab. Garut</title>
        <meta
          name="description"
          content="Peta digital interaktif Desa Margalaksana, Kecamatan Cilawu, Kabupaten Garut. Menampilkan batas wilayah, fasilitas umum, pendidikan, kesehatan, tempat ibadah, UMKM, dan CCTV."
        />
        <meta
          name="keywords"
          content="Peta Desa Margalaksana, Peta Garut, Peta Cilawu, Peta Digital Desa, WebGIS Garut"
        />
      </Helmet>

      {/* ============ SIDEBAR ============ */}
      <aside className="mrg-sidebar">
        <div className="mrg-sidebar-head">
          <div className="mrg-emblem">
            <span className="mrg-emblem-top">PEMDES</span>
            <span className="mrg-emblem-icon">🏛️</span>
            <span className="mrg-emblem-bottom">GARUT</span>
          </div>
          <div className="mrg-brand-text">
            <span className="mrg-kicker">PEMETAAN DIGITAL</span>
            <h2>
              Desa Margalaksana
              <br />
              <em>Kecamatan Cilawu</em>
            </h2>
            <p>
              Kabupaten Garut · Jawa Barat
              <br />
              Kode Pos 44181
            </p>
          </div>
        </div>

        {/* STATUS CARD */}
        <div className="mrg-status-card">
          <div className="mrg-status-head">
            <span className="mrg-status-dot"></span>
            <span>Status Wilayah Aman &amp; Kondusif</span>
          </div>
          <p>
            Wilayah Desa Margalaksana dalam kondisi aman dan kondusif. Mari
            bersama menjaga keamanan lingkungan.
          </p>
          <button className="mrg-btn-lapor">
            <FaExclamationCircle /> Laporkan Kejadian
          </button>
        </div>

        {/* FILTER */}
        <div className="mrg-filter-head">
          <FaLayerGroup />
          <span>Filter Layer Peta</span>
        </div>
        <div className="mrg-filter-list">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`mrg-filter ${f.color} ${activeFilter === f.id ? "active" : ""}`}
              onClick={() => setActiveFilter(activeFilter === f.id ? "all" : f.id)}
            >
              <span className="mrg-filter-icon">{f.icon}</span>
              <span className="mrg-filter-label">{f.label}</span>
              <span className="mrg-filter-count">{f.count}</span>
              <FaChevronRight className="mrg-filter-arrow" />
            </button>
          ))}
        </div>

        {/* MINI STATS */}
        <div className="mrg-mini-stats">
          {stats.slice(0, 3).map((s, i) => (
            <div key={i}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* ============ MAP ============ */}
      <div className="mrg-map">
        {/* GRID BACKGROUND */}
        <div className="mrg-map-grid" aria-hidden="true"></div>

        {/* HEADER */}
        <div className="mrg-map-header">
          <div className="mrg-header-left">
            <span className="mrg-coord">7°12'14.8" S · 107°51'32.4" E</span>
            <span className="mrg-badge">WebGIS · Desa Margalaksana</span>
          </div>
          <div className="mrg-header-right">
            <button className="mrg-action-btn" title="Zoom In">
              <FaSearchPlus />
            </button>
            <button className="mrg-action-btn" title="Zoom Out">
              <FaSearchMinus />
            </button>
            <button className="mrg-action-btn" title="Unduh Peta">
              <FaDownload />
            </button>
            <button className="mrg-action-btn" title="Cetak">
              <FaPrint />
            </button>
            <button
              className="mrg-action-btn"
              title="Toggle Legenda"
              onClick={() => setShowLegend((v) => !v)}
            >
              <FaExpand />
            </button>
          </div>
        </div>

        {/* COMPASS */}
        <div className="mrg-compass">
          <FaCompass className="mrg-compass-icon" />
          <span className="mrg-compass-n">U</span>
          <span className="mrg-compass-e">T</span>
          <span className="mrg-compass-s">S</span>
          <span className="mrg-compass-w">B</span>
        </div>

        {/* RIVERS */}
        <div className="mrg-river mrg-river-1"></div>
        <div className="mrg-river mrg-river-2"></div>

        {/* BOUNDARY */}
        <div className="mrg-boundary"></div>

        {/* NEIGHBORS */}
        <span className="mrg-neighbor mrg-nb-top">Desa Sukamulya</span>
        <span className="mrg-neighbor mrg-nb-left">Desa Padawaras</span>
        <span className="mrg-neighbor mrg-nb-right">Desa Tanjungjaya</span>
        <span className="mrg-neighbor mrg-nb-bl">Desa Cintaraja</span>
        <span className="mrg-neighbor mrg-nb-bottom">Desa Sukahurip</span>
        <span className="mrg-neighbor mrg-nb-br">Desa Cilawu</span>

        {/* AREAS */}
        <div className="mrg-area area-sukamanah">
          <span>Dusun Sukamanah</span>
        </div>
        <div className="mrg-area area-margaluyu">
          <span>Dusun Margaluyu</span>
        </div>
        <div className="mrg-area area-cikadu">
          <span>Dusun Cikadu</span>
        </div>
        <div className="mrg-area area-padamenak">
          <span>Dusun Padamenak</span>
        </div>
        <div className="mrg-area area-sukaraja">
          <span>Dusun Sukaraja</span>
        </div>
        <div className="mrg-area area-babakan">
          <span>Dusun Babakan</span>
        </div>
        <div className="mrg-area area-pangkalan">
          <span>Dusun Pangkalan</span>
        </div>

        {/* ROADS */}
        <div className="mrg-road road-1"></div>
        <div className="mrg-road road-2"></div>
        <div className="mrg-road road-3"></div>
        <div className="mrg-road road-4"></div>
        <div className="mrg-road road-5"></div>
        <div className="mrg-road road-6"></div>

        {/* ROAD LABELS */}
        <div className="mrg-road-label mrg-rl-1">Jl. Raya Margalaksana</div>
        <div className="mrg-road-label mrg-rl-2">Jl. Pasar Lama</div>
        <div className="mrg-road-label mrg-rl-3">Jl. Kesehatan</div>
        <div className="mrg-road-label mrg-rl-4">Jl. Sukamanah</div>

        {/* MARKERS */}
        {visibleMarkers.map((m) => (
          <div
            key={m.id}
            className={`mrg-marker marker-${m.type}`}
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            <span className="mrg-marker-icon">{m.icon}</span>
            <span className="mrg-marker-tooltip">
              <FaMapMarkerAlt /> {m.label}
            </span>
          </div>
        ))}

        {/* LEGEND */}
        {showLegend && (
          <div className="mrg-legend">
            <h3>
              <span className="mrg-legend-dot"></span> Legenda
            </h3>
            <div className="mrg-legend-row">
              <span className="mrg-line mrg-line-boundary"></span>
              <span>Batas Wilayah Desa</span>
            </div>
            <div className="mrg-legend-row">
              <span className="mrg-line mrg-line-main"></span>
              <span>Jalan Utama</span>
            </div>
            <div className="mrg-legend-row">
              <span className="mrg-line mrg-line-small"></span>
              <span>Jalan Lingkungan</span>
            </div>
            <div className="mrg-legend-row">
              <span className="mrg-line mrg-line-river"></span>
              <span>Sungai</span>
            </div>
            <div className="mrg-legend-divider"></div>
            <div className="mrg-legend-active">
              <span className="mrg-dot-blue"></span>
              <span>
                Filter aktif:{" "}
                <strong>
                  {activeFilter === "all"
                    ? "Semua"
                    : filters.find((f) => f.id === activeFilter)?.label}
                </strong>
              </span>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="mrg-footer">
          <div className="mrg-footer-stats">
            {stats.map((s, i) => (
              <div key={i} className="mrg-footer-item">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mrg-footer-brand">
            <span className="mrg-brand-name">MARGALAKSANA</span>
            <small>GARUT · JAWA BARAT</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetaMargalaksana;