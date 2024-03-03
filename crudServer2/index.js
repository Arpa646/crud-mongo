const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
// d6Pv2IFql87TFgpn
//crud2

app.use(express.json());
app.use(cors());
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://crud2:d6Pv2IFql87TFgpn@my-server.9ukzdqb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const postdataCollection = client.db("crud").collection("postdata");

    //await client.connect();
    // Send a ping to confirm a successful connection

    await client.db("admin").command({ ping: 1 });

    app.get("/user", async (req, res) => {
      const data = await postdataCollection.find({}).toArray();
      res.send(data);
    });

    app.post("/user", async (req, res) => {
      const data = req.body;
      result = await postdataCollection.insertOne(data);
      console.log(data);
    });

    const { ObjectId } = require("mongodb");

    // ... (your other imports and code)

    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);

      try {
        const result = await postdataCollection.deleteOne({
          _id: new ObjectId(id),
        });

        // Check if a document was deleted
        if (result.deletedCount === 1) {
          res.send({ success: true, message: "User deleted successfully" });
        } else {
          res.status(404).send({ success: false, message: "User not found" });
        }
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ success: false, message: "Internal Server Error" });
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello from node mongo crud server");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
