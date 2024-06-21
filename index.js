const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:5173', 'https://pet-adoption-server-side-two.vercel.app', 'https://portfoliotushin.netlify.app', 'https://portfolio-tushin.web.app', 'https://portfolio-tushin.firebaseapp.com'],
}));
app.use(bodyParser.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.mj6vep2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

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
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// POST route to handle form submission
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        
        const database = client.db('portfolio'); 
        const collection = database.collection('contact'); 

        // Insert the data into MongoDB
        const result = await collection.insertOne({
            name: name,
            email: email,
            message: message
        });

        console.log(`Message from ${name} <${email}> added to MongoDB`);

        // Respond with a success message
        res.status(200).json({ message: 'Message received successfully!' });
    } catch (error) {
        console.error('Error inserting message into MongoDB:', error);
        res.status(500).json({ error: 'Failed to insert message into database' });
    } finally {
        // Close the connection
        // await client.close();
    }
});

app.get('/', (req,res)=>{
    res.send('Portfolio')
})
// Start server
app.listen(port, () => {
    console.log(`Portfolio is running on port ${port}`);
});
