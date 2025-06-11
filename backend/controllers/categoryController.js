const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.userId });
    res.json(categories);
  } catch(err) {
    res.status(404).json({ error: "No categories found" })
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    const category = await Category.create({ name, color, userId: req.userId });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
