// src/Data/beritaData.js

import budayaImg from '../assets/Images/Budaya.jpg';
import pertanianImg from '../assets/Images/Pertanian.jpg';
import infrastrukturImg from '../assets/Images/infrastruktur.jpg';
import pendidikanImg from '../assets/Images/pendidikan.jpg';
import lingkunganImg from '../assets/Images/lingkungan.jpg';

export const beritaData = [
  {
    kategori: 'Budaya',
    tanggal: '20 Juli 2026',
    judul: 'Festival Budaya Desa Margalaksana',
    deskripsi:
      'Masyarakat meriahkan festival tahunan dengan berbagai pertunjukan seni, pagelaran wayang, dan bazar kuliner lokal.',
    gambar: budayaImg,
    color: '#fce4ec',
    textColor: '#c62828',
  },

  {
    kategori: 'Pertanian',
    tanggal: '15 Juli 2026',
    judul: 'Panen Raya Padi Organik',
    deskripsi:
      'Kelompok tani desa mencatatkan rekor panen raya dengan hasil melimpah berkat penerapan irigasi energi terbarukan.',
    gambar: pertanianImg,
    color: '#e8f5e9',
    textColor: '#2e7d32',
  },

  {
    kategori: 'Infrastruktur',
    tanggal: '10 Juli 2026',
    judul: 'Pembangunan Jalan Poros Desa Tahap II',
    deskripsi:
      'Peningkatan konektivitas antar dusun melalui pengaspalan dan pemasangan 120 titik PJU bertenaga surya.',
    gambar: infrastrukturImg,
    color: '#e3f2fd',
    textColor: '#0d47a1',
  },

  {
    kategori: 'Pendidikan',
    tanggal: '5 Juli 2026',
    judul: 'Pelatihan Digital untuk Pemuda Desa',
    deskripsi:
      'Program pelatihan kewirausahaan digital dan pemasaran online bagi generasi muda desa.',
    gambar: pendidikanImg,
    color: '#fff3e0',
    textColor: '#e65100',
  },

  {
    kategori: 'Lingkungan',
    tanggal: '28 Juni 2026',
    judul: 'Penanaman 1.000 Pohon di Hutan Desa',
    deskripsi:
      'Kegiatan reboisasi melibatkan seluruh elemen masyarakat untuk menjaga kelestarian hutan desa.',
    gambar: lingkunganImg,
    color: '#e0f7fa',
    textColor: '#00695c',
  },
];