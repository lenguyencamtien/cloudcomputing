const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const productController = require("../app/controllers/productController");

router.get("/", productController.readProduct);
router.get("/find/:_id", productController.getProductById);
router.post(
  "/create",
  upload.single("thumbnail"),
  productController.createProduct
);
router.put(
  "/update/:_id",
  upload.single("thumbnail"),
  productController.updateProduct
);
router.delete("/delete/:_id", productController.deleteProduct);

module.exports = router;
