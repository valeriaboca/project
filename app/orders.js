const { MongoClient, ObjectId } = require("mongodb");
const MONGO_URI = "mongodb://localhost:27017";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("project");
  const orderId = new ObjectId(req.params.id);
  const order = await db.collection("orders").findOne({ _id: orderId });
  client.close();
  res.send(order);
};

const createOrder = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("project");
    const orderBody = req.body;
    const { name, lastName, productId, userId, address } = orderBody;
    const createOrder = await db.collection("orders").insertOne({
      name: name,
      lastName: lastName,
      productId: new ObjectId(productId),
      userId: new ObjectId(userId),
      address: address,
    });
    client.close();
    res.status(200).send({ message: "order created" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("project");
    const orderBody = req.body;
    const orderId = new ObjectId(req.params.id);
    const updatedOrder = await db
      .collection("orders")
      .updateOne({ _id: orderId }, { $set: orderBody });
    client.close();
    res.status(200).send({ message: "order updated" });
  } catch (error) {
    res.status(400).send({ message: "error to update order" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("project");
    const orderId = new ObjectId(req.params.id);
    const deleteOrderId = await db
      .collection("orders")
      .deleteOne({ _id: orderId });
    client.close();
    res.status(200).send({ message: "order deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { getOrder, createOrder, updateOrder, deleteOrder };
