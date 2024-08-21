var express = require("express");
var morgan = require("morgan");
var app = express();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./app/products");

const {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("./app/orders");

const { getUser } = require("./app/users");

app.get("/", function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send("Hello GET");
});

app
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"));

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

app.get("/products", getProducts);

app.get("/products/:id", getProduct);

app.post("/products", createProduct); // body - create

app.put("/products/:id", updateProduct); // body - update

app.delete("/products/:id", deleteProduct);

app.get("/orders/:id", getOrder);

app.post("/orders", createOrder);

app.put("/orders/:id", updateOrder);

app.delete("/orders/:id", deleteOrder);

app.get("/users/:id", getUser);

// .get('/users')

// app.get("/categories");

// .get('/cart')
