import React, {useContext, useState} from 'react'
import noteContext from "../Context/notes/NotesContext"


const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title: "", description: "", tag: "General"})
    
    const handleClick = (e)=>{
        e.preventDefault(); // so that the page does not reloads
        addNote(note.title, note.description, note.tag);
        setnote({title: "", description: "", tag: ""});
    }

    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value});
    }

    return (
        <div className="contaniner my-3" style={{width:"50%"}}>
            <h2>Add a note!</h2>
            <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title (atleast 1 characters)(2 notes can't have same title)</label>
                <input type="text" name="title" className="form-control" id="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description (atleast 5 characters)</label>
                <textarea type="text" className="form-control" id="description my-box" name="description" rows="10" onChange={onChange} value={note.description}></textarea>
            </div>
            <div className="mb-3">
                <label className="form-check-label" htmlFor="tag">Tag (default:General)</label>
                <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}/>
            </div>
            <button disabled={note.title.length<1 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
