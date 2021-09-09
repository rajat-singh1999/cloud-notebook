import React, {useContext} from 'react'
import noteContext from "../Context/notes/NotesContext"


const NoteItem = (props) => {
    const {note, updateNote} = props

    const context = useContext(noteContext);
    const {deleteNote} = context;

    return (
        <div className="col-md-2">
            <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <p className="xard-text">Tag: {note.tag}</p>
                <i className="fas fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
            </div>
        </div>
    )
}

export default NoteItem
