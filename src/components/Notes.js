import React, {useContext, useEffect, useRef, useState} from 'react'
import noteContext from "../Context/notes/NotesContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote'


const Notes = () => {
    const editRef = useRef(null);
    const editRefclose = useRef(null);
    const viewRef = useRef(null);
    const viewRefclose = useRef(null);

    const context = useContext(noteContext);

    const {notes, getNotes, editNote} = context;
    const [note, setnote] = useState({id:"", etitle: "", edescription: "", etag: ""})

    useEffect(() => {
       getNotes();
       // eslint-disable-next-line
    }, [])

    const updateNote = (currentnote)=>{
        editRef.current.click();
        setnote({id:currentnote._id, etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag})
    }

    const handleClick = (e)=>{
        e.preventDefault(); // so that the page does not reloads
        editNote(note.id, note.etitle, note.edescription, note.etag)
        editRefclose.current.click();
    }

    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value});
    }

    const viewClick = (currentnote)=>{
        viewRef.current.click();
        setnote({id:currentnote._id, etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag})
    }


    return (
        <>
        <AddNote />

        <button type="button" ref={editRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">Launch demo modal</button>

        <button type="button" ref={viewRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#viewModal">Launch demo modal</button>

        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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
                <button ref={editRefclose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                <button disabled={note.etitle.length<1 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update this note</button>
            </div>
            </div>
        </div>
        </div>



        <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{`${note.etitle} -${note.etag}`}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {note.edescription}
            </div>
            <div className="modal-footer">
                <button type="button" ref={viewRefclose} className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>




        <h2>Your notes</h2>
        <div className="row container my-5">
        {notes.length===0 && "No notes to display..."}
        {notes.map((note)=>{
            return <NoteItem key = {note._id} updateNote={updateNote} viewClick={viewClick} note={note} />
        })}
        </div>
        </>
)
}

export default Notes
