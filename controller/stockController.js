import Stock from "../model/stockModel.js";
import Product from "../model/productModel.js";

export const createStock = async (req, res) => {
  try {
    const { productId, code, stock = 0, price, isActive, attributes } = req.body;

  
    const product = await Product.findById(productId);


    if (!product || !product.isActive) return res.status(400).json({ error: "Invalid or inactive product" });


   

    const newStock = await Stock.create({ code, product: productId, stock, price, isActive, attributes });


    res.status(201).json(newStock);

  } catch (err) {
    res.status(400).json({ error: err.code === 11000 ? "Stock code must be unique per product." : err.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;

    const stock = await Stock.findByIdAndUpdate(id, req.body, { new: true });


    if (!stock) return res.status(404).json({ error: "Stock not found" });
    res.json(stock);


  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const adjustStock = async (req, res) => {


  try {
    const { id } = req.params;


    const { delta } = req.body; 

    const stock = await Stock.findById(id);

    if (!stock) return res.status(404).json({ error: "Stock not found" });

    const newStock = stock.stock + delta;


    if (newStock < 0) return res.status(400).json({ error: "Stock cannot go below zero." });

    stock.stock = newStock;
    await stock.save();
    res.json(stock);



  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listStocks = async (req, res) => {
  try {


    const { productId, isActive, outOfStock, page = 1, limit = 10 } = req.query;

    const filter = {};


    if (productId) filter.product = productId;
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (outOfStock === "true") filter.stock = 0;

    const stocks = await Stock.find(filter)
      .populate("product", "name")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });



    const total = await Stock.countDocuments(filter);

    res.json({ total, page: Number(page), stocks });
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const analytics = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalStocks = await Stock.countDocuments();
    const outOfStockStocks = await Stock.countDocuments({ stock: 0 });
    res.json({ totalProducts, totalStocks, outOfStockStocks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
