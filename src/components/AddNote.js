import React, {useContext, useState} from 'react'
import noteContext from "../Context/notes/NotesContext"


const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title: "", description: "", tag: ""})
    
    const handleClick = (e)=>{
        e.preventDefault(); // so that the page does not reloads
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <div className="contaniner my-5">
            <h2>Add a note!</h2>
            <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Tile</label>
                <input type="text" name="title" className="form-control" id="title" aria-describedby="emailHelp" onChange={onChange} />
                <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
            </div>
        </div>
    )
}

export default AddNote
