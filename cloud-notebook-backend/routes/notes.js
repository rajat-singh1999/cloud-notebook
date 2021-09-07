const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Notes");
const {body, validationResult} = require('express-validator');



// GET all notes. Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id})
        res.json(notes)        
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")        
    }
})

//Add a new note using POST. Login required
router.post('/createnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 1}),
    body('description', 'Enter a valid description').isLength({min: 1})
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.satus(400).json({errors: errors.array()});
    }
    try {
        const {title, description, tag} = req.body

        let tempNote = await Note.findOne({title: title, user: req.user.id});
        // checking if a note with the same title is present for the current user or not.
        if(tempNote){
            return res.status(400).json({error: "Sorry, a note with this title already exists."})
        }

        const note = new Note({
            user: req.user.id, title, description, tag
        })
        const savedNote = await note.save()
        res.json(savedNote)       
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// uPDATE AN EXISTING NOTE. LOGIN REQUIRED

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        const passedId = req.params.id;
        // Create a newNote object
        const newNote  = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
    
        // Find the note to be updated and update it
        let note = await Note.findById(passedId);
        if(!note){return res.status(404).send("Not Found")}
    
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndUpdate(passedId, {$set: newNote}, {new:true})
        res.json({note});
    }
    catch (error) {
        res.status(500).send("Internal server Error.")    
    }
    
})

//DELETE AN EXISTING NOTE. lOGIN REQUIRED
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    // check if the note is present in the Notes collection
    try{
        const passedId = req.params.id;
        let note = await Note.findById(passedId);
        if(!note){return res.status(404).send("Not Found")}
    
        // check if the note to be deleted belongs to the current user or not
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        //Delete this particular note
        note = await Note.findByIdAndDelete(passedId);
        res.json({"Success": "Note has been deleted!", note: note});
    }

    catch (error) {
        res.status(500).send("Internal server Error.")    
    }

})

module.exports = router