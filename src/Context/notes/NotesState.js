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
            'auth-token':localStorage.getItem('token')
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
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
         
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
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${noteID}`, {
          method: 'DELETE',
          headers: {
            'Content-type':'application/json',
            'auth-token':localStorage.getItem('token')
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
            'auth-token':localStorage.getItem('token')
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