import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  code: { type: String, required: true, trim: true },
  attributes: { type: Object, default: {} },
  stock: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

stockSchema.index({ product: 1, code: 1 }, { unique: true }); // Unique SKU code per product

export default mongoose.model('Stock', stockSchema);
