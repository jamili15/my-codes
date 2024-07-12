const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require("cors");
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const CONNECTION_MONGOATLAS = "mongodb+srv://jameskevinramesessystems:Qu3u3ingW3b@cluster0.edj5ys8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const CONNECTION_MONGOCOMPASS = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.4";
const CONNECTION_SERVER = "mongodb://admin:12p%40ssw0rD%2334@192.168.2.9:27017/";

const DATABASE_NAME = "test1";
let database;

app.listen(5038, async () => {
    try {
        const client = await MongoClient.connect(CONNECTION_MONGOCOMPASS);
        database = client.db(DATABASE_NAME);
        console.log("MongoDB Connection Successful");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
});

app.get('/api/todoapp/GetNotes', async (req, res) => {
    console.log('GET /api/todoapp/GetNotes');
    try {
        const result = await database.collection("examplecollection").find({}).toArray();
        console.log("Notes retrieved:", result);
        res.send(result);
    } catch (error) {
        console.error("Error retrieving notes:", error);
        res.status(500).send("Error retrieving notes");
    }
});

app.post('/api/todoapp/AddNotes', multer().none(), async (req, res) => {
    console.log('POST /api/todoapp/AddNotes', req.body);
    try {
        const numOfDocs = await database.collection("examplecollection").countDocuments({});
        const result = await database.collection("examplecollection").insertOne({
            id: (numOfDocs + 1).toString(),
            description: req.body.description,
        });
        console.log("Document added:", result);
        res.json("Added Successfully");
    } catch (error) {
        console.error("Error adding document:", error);
        res.status(500).send("Error adding document");
    }
});

app.delete('/api/todoapp/DeleteNotes', async (req, res) => {
    console.log('DELETE deleteData', req.query);
    try {
        const result = await database.collection("examplecollection").deleteOne({ id: req.query.id });
        console.log("Document deleted:", result);
        res.json("Deleted Successfully");
    } catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).send("Error deleting document");
    }
});
