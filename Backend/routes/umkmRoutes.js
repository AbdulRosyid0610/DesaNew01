const express = require('express');
const router = express.Router();
const umkmController = require('../controllers/umkmController');

router.get('/', umkmController.getAllUmkm);
router.post('/', umkmController.tambahUmkm);
router.put('/:id', umkmController.updateUmkm);
router.delete('/:id', umkmController.deleteUmkm);

module.exports = router;