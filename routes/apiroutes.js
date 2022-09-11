const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
const router = require("express").Router();
const path = require("path");

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null,2)
    )
    return note;
};
router.get("/api/notes", (req,res) => {
    res.json(data);
});
router.post('/api/notes', (req,res) => {
    req.body.id = data.length.toString();
    let note = createNewNote(req.body, data);
    res.json(note);
});

router.delete("/api/notes/:id", (req,res) => {
    let noteId = req.params.id;
    let newId = 0;
    console.log(`Deleting note with id ${noteId}`);
    data = data.filter(currentNote => {
        return currentNote.id != noteId;
    });
    for (currentNote of data) {
        currentNote.id = newId.toString();
        newId++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(data));
    res.json(data);
});

module.exports = router;