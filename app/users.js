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

module.exports = { getUser };
