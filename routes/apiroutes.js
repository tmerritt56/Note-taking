const router = require('express').Router();
const {v4: uuidv4}= require ('uuid');
const {createNewNote, updateDB} = require("../library/notes");
const {notes} = require("../db/db.json");

router.get("/notes", (req,res) => {
    let results = notes;
    res.json(results);
});
router.post('/notes', (req,res) => {
    req.body.id = uuidv4();
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

router.delete("/notes/:id", (req,res) => {
    const params = req.params.id
    updateDB(params,notes);
    res.redirect('');
    });

module.exports = router;