const express = require('express')
const app = express()
const port = 5000;
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.avssyq6.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


    const infoCollections = client.db("task-2").collection('informations');
    
    app.get('/categories' , async(req ,res) => {
        const query = {};
        const result = await infoCollections.find(query).toArray();
        res.send(result)
    })


    app.get('/categories/:id' , async(req , res) => {
      const id = req.params.id;
      const  query = {_id : new ObjectId(id)};
      const result = await infoCollections.findOne(query);
      
      console.log("resultt : " , result)

      
      
      const data = result?.subcategories?.map(category => category.duas);
      res.send(data)
    })
















    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})