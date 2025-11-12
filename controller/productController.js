import Product from "../model/productModel.js";
import Stock from "../model/stockModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, categories, price, isActive } = req.body;
    const product = await Product.create({ name, description, categories, price, isActive });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { isActive, ...rest } = req.body; 
    const updateData = { ...rest };
if (typeof isActive !== "undefined") updateData.isActive = isActive;

const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!product) return res.status(404).json({ error: "Product not found" });

  
    if (isActive === false) {
      await Stock.updateMany({ product: id, isActive: true }, { isActive: false });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive, search } = req.query;
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (search) filter.name = { $regex: search, $options: "i" };

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);
    res.json({ total, page: Number(page), products });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
