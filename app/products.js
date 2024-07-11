const { MongoClient, ObjectId } = require("mongodb");
const MONGO_URI = "mongodb://localhost:27017";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getProducts = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("project");
    const page = req.query.page;
    const pageLimit = parseInt(req.query.limit);
    const products = await db
      .collection("products")
      .find()
      .skip(pageLimit * (page - 1))
      .limit(pageLimit)
      .toArray();
    client.close();
    res.send(products);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("project");
    const productId = new ObjectId(req.params.id);
    const product = await db.collection("products").findOne({ _id: productId });
    client.close();
    res.send(product);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("project");
    const productBody = req.body;
    const newProduct = await db.collection("products").insertOne(productBody);
    // console.log(newProduct);
    client.close();
    res.status(200).send({ message: "product created" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("project");
    const updateProduct = req.body;
    const productId = new ObjectId(req.params.id);
    const updatedProduct = await db
      .collection("products")
      .updateOne({ _id: productId }, { $set: updateProduct });
    client.close();
    res.status(200).send("product updated");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("project");
    const deleteProduct = new ObjectId(req.params.id);
    const deletedProduct = await db
      .collection("products")
      .deleteOne({ _id: deleteProduct });
    client.close();
    res.status(200).send("product deleted");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
