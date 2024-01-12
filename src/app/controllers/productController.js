const Product = require("../models/productModel");

class ProductController {
  async readProduct(req, res) {
    try {
      const productList = await Product.find();
      res.status(200).json(productList);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async createProduct(req, res) {
    try {
      const { name, price, quantity, desc, size, color } = req.body;

      const thumbnail = {
        url: req.file ? req.file.path : "",
        public_id: req.file ? req.file.filename : "",
      };

      const product = new Product({
        name,
        price,
        quantity,
        desc,
        size: JSON.parse(size),
        color: JSON.parse(color),
        thumbnail,
      });

      const newProduct = await product.save();
      res.status(201).json({ product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateProduct(req, res) {
    try {
      const { name, price, quantity, desc, size, color } = req.body;

      const thumbnail = {
        url: req.file ? req.file.path : "",
        public_id: req.file ? req.file.filename : "",
      };

      const product = await Product.findById(req.params._id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.name = name;
      product.price = price;
      product.quantity = quantity;
      product.desc = desc;
      product.size = JSON.parse(size);
      product.color = JSON.parse(color);
      product.thumbnail = thumbnail;

      const updatedProduct = await product.save();
      res.json({ product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { _id } = req.params;

      const product = await Product.findOneAndDelete(_id);
      if (!product) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }
      res.json({ message: "Xoá sản phẩm thành công" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  async getProductById(req, res) {
    try {
      const productId = req.params._id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // async getRoomById(req, res) {
  //   try {
  //     const roomId = req.params._id;
  //     const room = await Room.findById(roomId).populate("amenitiesRoom");
  //     if (!room) {
  //       return res.status(404).json({ message: "Không tìm thấy phòng" });
  //     }
  //     res.status(200).json(room);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }
}

module.exports = new ProductController();
