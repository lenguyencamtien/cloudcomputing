const productRouter = require("./product");

function route(app) {
  app.use("/api/product", productRouter);

  app.all("*", (req, res) => res.send("That route doesn't exist"));
}

module.exports = route;