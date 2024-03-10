const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 4321;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jrqljyn.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();

    const tourCollection = client.db("travel-beyond").collection("tour");

    // tour api
    app.get("/tour", async (req, res) => {
      const result = await tourCollection.find().toArray();
      res.send(result);
    });

    app.post("/tour", async (req, res) => {
      const tour = req.body;
      const result = await tourCollection.insertOne(tour);
      res.send(result);
    });
    
    app.delete("/tour/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await tourCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/tour/:id", async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          title: item.title,
          division: item.division,
          price: parseFloat(item.price),
          deadline: item.deadline,
          places: item.places,
          transportation: item.transportation,
          included_item: item.included_item,
          description: item.description,
          image: item.image,
        },
      };

      const result = await tourCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("travel beyond is traveling");
});

app.listen(port, () => {
  console.log(`travel beyond is traveling through port ${port}`);
});
