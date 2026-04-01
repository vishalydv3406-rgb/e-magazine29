const express = require('express');
const router = express.Router();
const { getMagazines, getMagazineById, createMagazine } = require('../controllers/magazineController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getMagazines)
  .post(protect, authorize('admin', 'author'), createMagazine);

router.route('/:id').get(getMagazineById);

module.exports = router;
