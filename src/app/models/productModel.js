const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    quantity: { type: Number, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    size: { type: [String], required: true, trim: true },
    color: { type: [String], required: true, trim: true },
    thumbnail: {
      type: Object,
      url: { type: URL },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
