const express = require('express');
const router = express.Router();
const wargaController = require('../controllers/wargaController');

router.get('/', wargaController.getAllWarga);
router.post('/', wargaController.tambahWarga);
router.put('/:id', wargaController.updateWarga);
router.delete('/:id', wargaController.deleteWarga);

module.exports = router;