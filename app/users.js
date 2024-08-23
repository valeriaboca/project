const { MongoClient, ObjectId } = require("mongodb");
const MONGO_URI = "mongodb://localhost:27017";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("project");
  const userId = new ObjectId(req.params.id);
  const user = await db.collection("users").findOne({ _id: userId });
  client.close();
  res.send(user);
};

const createUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("project");
    const userBody = req.body;
    const createUser = await db.collection("users").insertOne(userBody);
    client.close();
    res.status(200).send({ message: "user created" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("project");
    const userBody = req.body;
    const userId = new ObjectId(req.params.id);
    const updateUser = await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: userBody });
    res.status(200).send({ message: "user updated" });
  } catch (error) {
    res.status(400).send({ message: "error updating user" });
  }
};

module.exports = { getUser, createUser, updateUser };
