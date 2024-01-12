const express = require("express");
const db = require("./src/config/connection");
const route = require("./src/routes");
const cors = require("cors");
const app = express();


db.connect();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!!!!");
});

// Routes init
route(app);

app.listen(process.env.PORT || 9000 ,()=>{
  console.log(`Connect to server is successfully with PORT:`);
})
