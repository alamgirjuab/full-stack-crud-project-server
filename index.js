const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();




// Middleware
app.use(cors());
app.use(express.json());

// Database Configuration

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gi8q3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run() {
    try {
        await client.connect();
        // console.log('database connected successfully');
        const database = client.db("crudApp");
        const dataFormToTable = database.collection("formToTable");

        // GET API
        app.get("/formtotable", async (req, res) => {
            const cursor = dataFormToTable.find({});
            const dataListToTable = await cursor.toArray();
            res.send(dataListToTable);
        });

        // POST API
        app.post('/formtotable', async (req, res) => {
            const data = req.body;
            console.log('hit the post api', data);

            const result = await dataFormToTable.insertOne(data);
            console.log(result);
            res.json(result);
        });
    } finally {
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});