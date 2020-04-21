// Dependencies
const express = require("express");
const path = require("path");

const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

// Sets up the Express App
const app = express();
const PORT = 3000;

const publicDir = path.join(__dirname, "/public");

let allNotes = require('./db/db.json');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('./'));

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
    res.json(allNotes);
});

// If no matching route is found default to index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(publicDir, "index.html"));
});

//Create new posts
app.post("/api/notes", function(req, res) {

    //Add and push new notes
    let newNote = req.body;  
    allNotes.push(newNote);

    // write to the db.json file
    writeFileAsync("./db/db.json", JSON.stringify(allNotes))

    res.json(newNote);

});


// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});