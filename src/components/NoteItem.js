import React, {useContext} from 'react'
import noteContext from "../Context/notes/NotesContext"


const NoteItem = (props) => {
    const {note, updateNote, viewClick} = props

    const context = useContext(noteContext);
    const {deleteNote} = context;

    return (
        <div className="col-md-2">
            <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description.slice(0,101)+"..."}</p>
                <p className="xard-text">Tag: {note.tag}</p>
                <p className="xard-text">Characters: {note.description.length}</p>
                <i className="fas fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                <i className="fas fa-eye mx-2" onClick={()=>{viewClick(note)}}></i>
            </div>
            </div>
        </div>
    )
}

export default NoteItem
