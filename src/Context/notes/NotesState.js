import noteContext from './NotesContext';
import { useState } from 'react';

const NoteState = (props)=>{
    const host = "http://localhost:5000";
    const notesInitial = []

      const [notes, setnotes] = useState(notesInitial)

      // add note
      const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNjE3YmZjYzliMDZlNzgzMmIzOWIzIn0sImlhdCI6MTYzMDkzNDk3NX0.feq0kNIpJG0q3dFIAG1bUiuxHv229zEsB_S_MzUixFs'
          },
        });
        const json = await response.json();
        setnotes(json)
      }
      const addNote = async (title, description, tag) => {
        // API Call 
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/createnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNjE3YmZjYzliMDZlNzgzMmIzOWIzIn0sImlhdCI6MTYzMDkzNDk3NX0.feq0kNIpJG0q3dFIAG1bUiuxHv229zEsB_S_MzUixFs'
          },
          body: JSON.stringify({title, description, tag})
        });
         
    
        console.log("Adding a new note")
        getNotes();
        // const note = {
        //   "_id": "61322f119553781a8ca8d0e08",
        //   "user": "6131dc5e3e4037cd4734a0664",
        //   "title": title,
        //   "description": description,
        //   "tag": tag,
        //   "date": "2021-09-03T14:20:09.668Z",
        //   "__v": 0
        // };
        // setnotes(notes.concat(note))
      }
    
      const deleteNote = async (noteID)=>{
        console.log(`Deleting note with id: ${noteID}`)
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${noteID}`, {
          method: 'DELETE',
          headers: {
            'Content-type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNjE3YmZjYzliMDZlNzgzMmIzOWIzIn0sImlhdCI6MTYzMDkzNDk3NX0.feq0kNIpJG0q3dFIAG1bUiuxHv229zEsB_S_MzUixFs'
          },
        })
        getNotes();
      }

      const editNote = async (noteID, title, description, tag)=>{
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updatenote/${noteID}`, {
          method: 'PUT',
          headers: {
            'Content-type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNjE3YmZjYzliMDZlNzgzMmIzOWIzIn0sImlhdCI6MTYzMDkzNDk3NX0.feq0kNIpJG0q3dFIAG1bUiuxHv229zEsB_S_MzUixFs'
          },
          body: JSON.stringify({title, description, tag})
        })
        getNotes();
        
        // for (let i = 0; i < notes.length; i++) {
        //   const element = notes[i];
        //   if(element._id === noteID){
        //     element.title = title;
        //     element.description = description;
        //     element.tag = tag;
        //   }
        // }
      }

    return(
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;

// value={{state, update}} is es6 equivalent of value={{state: state, update: update}}