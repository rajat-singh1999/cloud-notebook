import React, {useContext, useEffect, useRef, useState} from 'react'
import noteContext from "../Context/notes/NotesContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote'


const Notes = () => {
    const ref = useRef(null);
    const refclose = useRef(null);

    const context = useContext(noteContext);

    const {notes, getNotes, editNote} = context;
    const [note, setnote] = useState({id:"", etitle: "", edescription: "", etag: ""})

    useEffect(() => {
       getNotes();
       // eslint-disable-next-line
    }, [])

    const updateNote = (currentnote)=>{
        ref.current.click();
        setnote({id:currentnote._id, etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag})
    }

    const handleClick = (e)=>{
        e.preventDefault(); // so that the page does not reloads
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click();
    }

    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value});
    }


    return (
        <>
        <AddNote />

        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">





            <h2>Add a note!</h2>
            <form>
            <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" name="etitle" className="form-control" id="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <textarea type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} rows="10" onChange={onChange}/>

            </div>
            <div className="mb-3">
                <label className="form-check-label" htmlFor="etag">Tag (default:General)</label>
                <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange}/>
            </div>
            </form>






            </div>
            <div className="modal-footer">
                <button ref={refclose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Update this note</button>
            </div>
            </div>
        </div>
        </div>

        <div className="row">
        <h2>Your notes</h2>
        {notes.map((note)=>{
            return <NoteItem key = {note._id} updateNote={updateNote} note={note} />
        })}
        </div>
        </>
)
}

export default Notes
