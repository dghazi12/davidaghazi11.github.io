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

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(publicDir, "index.html"));
});

// GET note form  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(publicDir, "notes.html"));
});

// GET note api form 
app.get("/api/notes", function(req, res) {
    res.json(allNotes);
});

// If no matching route is found default to index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(publicDir, "index.html"));
});

//Create new notes
app.post("/api/notes", function(req, res) {

    // Assigning each note a unique id
    req.body.id = allNotes.length

    // Add and push new notes
    let newNote = req.body;  
    allNotes.push(newNote);
   
    // Write to the db.json file
    writeFileAsync("./db/db.json", JSON.stringify(allNotes))
   
    res.json(newNote);

});

// Delete the note based off of the ID 
app.delete('/api/notes/:id', (req, res) => {

    let note = allNotes.find( ({ id }) => id === JSON.parse(req.params.id));

    allNotes.splice(allNotes.indexOf(note), 1);
    res.end("Note deleted");

    writeFileAsync("./db/db.json", JSON.stringify(allNotes))

});

// Starts the server
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});