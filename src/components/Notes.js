import React, {useContext} from 'react'
import noteContext from "../Context/notes/NotesContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, addNote} = context;

    return (
        <>
        <div className="row">
        <h2>Your notes</h2>
        {notes.map((note)=>{
            return <NoteItem key = {note._id} note={note} />
        })}
        </div>
        </>
)
}

export default Notes
