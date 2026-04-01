const Magazine = require('../models/Magazine');

const getMagazines = async (req, res) => {
  try {
    const category = req.query.category;
    const filter = category ? { category } : {};
    const magazines = await Magazine.find(filter).sort({ title: 1 });
    res.json(magazines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMagazineById = async (req, res) => {
  try {
    const magazine = await Magazine.findById(req.params.id);
    if (magazine) {
      res.json(magazine);
    } else {
      res.status(404).json({ message: 'Magazine not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMagazine = async (req, res) => {
  try {
    const magazine = await Magazine.create(req.body);
    res.status(201).json(magazine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMagazines, getMagazineById, createMagazine };
