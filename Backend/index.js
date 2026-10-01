const express = require('express');
const cors = require('cors');
require('dotenv').config();

const wargaRoutes = require('./routes/wargaRoutes');
const umkmRoutes = require('./routes/umkmRoutes');
const pengaduanRoutes = require('./routes/pengaduanRoutes');
const beritaRoutes = require('./routes/beritaRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/warga', wargaRoutes);
app.use('/api/umkm', umkmRoutes);
app.use('/api/pengaduan', pengaduanRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend Desa Energi Mandiri berjalan'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server Backend berjalan di port ${PORT}`);
});