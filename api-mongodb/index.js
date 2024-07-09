var express = require('express');
var { MongoClient } = require('mongodb');
var cors = require("cors");
const multer = require('multer');

var app = express();
app.use(cors());
app.use(express.json());

var CONNECTION_MONGOATLAS = "mongodb+srv://jameskevinramesessystems:Qu3u3ingW3b@cluster0.edj5ys8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


var CONNECTION_MONGOCOMPASS = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.4"


var DATABASE_NAME = "test";
var database;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_MONGOCOMPASS, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.error("Error connecting to MongoDB:", error);
            return;
        }
        database = client.db(DATABASE_NAME);
        console.log("Mongo DB Connection Successful");
    });
});

app.get('/api/getData', (request, response) => {
    console.log('GET /api/getData');
    database.collection("products").find({}).toArray((error, result) => {
        if (error) {
            console.error("Error retrieving products:", error);
            response.status(500).send("Error retrieving products");
            return;
        }
        console.log("Products retrieved:", result);
        response.send(result);
    });
});



app.post('/api/addData', multer().none(), (request, response) => {
    console.log('POST /api/postData', request.body);
    database.collection("queueingwebcollection").countDocuments({}, function (error, numOfDocs) {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Error counting documents");
            return;
        }
        database.collection("queueingwebcollection").insertOne({
            id: (numOfDocs + 1).toString(),
            hfcolor: request.body.newHfColors,
            maincolor: request.body.newMainColors,
            wincolor: request.body.newWinColors
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

app.delete('/api/deleteData', (request, response) => {
    console.log('DELETE deleteData', request.query);
    database.collection("queueingwebcollection").deleteOne({
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