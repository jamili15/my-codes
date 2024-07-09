var express = require('express');
var { MongoClient } = require('mongodb');
var cors = require("cors");
const multer = require('multer');

var app = express();
app.use(cors());
app.use(express.json());

var CONNECTION_MONGOATLAS = "mongodb+srv://jameskevinramesessystems:Qu3u3ingW3b@cluster0.edj5ys8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


var CONNECTION_MONGOCOMPASS = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.4"


var DATABASE_NAME = "test1";
var database;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_MONGOCOMPASS, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.error("Error connecting to MongoDB:", error);
            return;
        }
        database = client.db(DATABASE_NAME);
        console.log("Mongo DB Connection Successfuwl");
    });
});

app.get('/api/todoapp/GetNotes', (request, response) => {
    console.log('GET /api/todoapp/GetNotes');
    database.collection("examplecollection").find({}).toArray((error, result) => {
        if (error) {
            console.error("Error retrieving products:", error);
            response.status(500).send("Error retrieving products");
            return;
        }
        console.log("Products retrieved:", result);
        response.send(result);
    });
});



app.post('/api/todoapp/AddNotes', multer().none(), (request, response) => {
    console.log('POST /api/todoapp/AddNotes', request.body);
    database.collection("examplecollection").countDocuments({}, function (error, numOfDocs) {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Error counting documents");
            return;
        }
        database.collection("examplecollection").insertOne({
            id: (numOfDocs + 1).toString(),
            description: request.body.description,
        }, (error, result) => {
            if (error) {
                console.error("Error inserting document:", error);
                response.status(500).send("Error inserting document");
                return;
            }
            console.log("Document added:", result);
            response.json("Added Successfully");
        });
    });
});

app.delete('/api/todoapp/DeleteNotes', (request, response) => {
    console.log('DELETE deleteData', request.query);
    database.collection("examplecollection").deleteOne({
        id: request.query.id
    }, (error, result) => {
        if (error) {
            console.error("Error deleting document:", error);
            response.status(500).send("Error deleting document");
            return;
        }
        console.log("Document deleted:", result);
        response.json("Deleted Successfully");
    });
});