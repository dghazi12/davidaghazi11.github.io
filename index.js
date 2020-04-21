// Dependencies
const express = require("express");
const path = require("path");

// Sets up the Express App
const app = express();
const PORT = 3000;

//Linking to the form containing the notes
let allNotes = require('./db/db.json');

const publicDir = path.join(__dirname, "/public");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(publicDir, "index.html"));
});

//GET note form  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(publicDir, "notes.html"));

});

//GET note api form 
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(publicDir, "/db/db.json"));
});

// If no matching route is found default to index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(publicDir, "../public/index.html"));
});

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});