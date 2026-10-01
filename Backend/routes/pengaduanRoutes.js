const express = require('express');
const router = express.Router();
const pengaduanController = require('../controllers/pengaduanController');

router.get('/', pengaduanController.getAllPengaduan);
router.post('/', pengaduanController.tambahPengaduan);
router.put('/:id', pengaduanController.updatePengaduan);
router.delete('/:id', pengaduanController.deletePengaduan);

module.exports = router;