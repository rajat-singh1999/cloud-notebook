import noteContext from './NotesContext';
import { useState } from 'react';

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "6136292e03192b532acfea58",
          "user": "613617bfcc9b06e7832b39b3",
          "title": "abcd update",
          "description": "agbh idbf vciuds bgvui oysbdi uovbs diu vbuisdybvu ioyhsd buivyb sdiu yvbs duoiyb vousy id. updated",
          "tag": "random-text-update",
          "date": "2021-09-06T14:43:58.805Z",
          "__v": 0
        },
        {
          "_id": "61362f2919b60d9ee543e2d6",
          "user": "613617bfcc9b06e7832b39b3",
          "title": "abd",
          "description": "agbh idbf vciuds bgvui oysbdi uodsfbvuisdvoinu dsihbvuinds oinvoiu sdhp nvoidsijofhb vuhsd buhivbs duy 7bvuo  i sdhyuiu yvbs duoiyb vousy id.",
          "tag": "General",
          "date": "2021-09-06T15:09:29.244Z",
          "__v": 0
        },
        {
            "_id": "6136292e03192sb532acfea58",
            "user": "613617bfcc9b06e7832b39b3",
            "title": "abcd update",
            "description": "agbh idbf vciuds bgvui oysbdi uovbs diu vbuisdybvu ioyhsd buivyb sdiu yvbs duoiyb vousy id. updated",
            "tag": "random-text-update",
            "date": "2021-09-06T14:43:58.805Z",
            "__v": 0
          },
          {
            "_id": "61362fa2919b60d9ee543e2d6",
            "user": "613617bfcc9b06e7832b39b3",
            "title": "abd",
            "description": "agbh idbf vciuds bgvui oysbdi uodsfbvuisdvoinu dsihbvuinds oinvoiu sdhp nvoidsijofhb vuhsd buhivbs duy 7bvuo  i sdhyuiu yvbs duoiyb vousy id.",
            "tag": "General",
            "date": "2021-09-06T15:09:29.244Z",
            "__v": 0
          },
          {
            "_id": "6136292e03192b532afgcfea58",
            "user": "613617bfcc9b06e7832b39b3",
            "title": "abcd update",
            "description": "agbh idbf vciuds bgvui oysbdi uovbs diu vbuisdybvu ioyhsd buivyb sdiu yvbs duoiyb vousy id. updated",
            "tag": "random-text-update",
            "date": "2021-09-06T14:43:58.805Z",
            "__v": 0
          },
          {
            "_id": "61362fg2919b60d9ee543e2d6",
            "user": "613617bfcc9b06e7832b39b3",
            "title": "abd",
            "description": "agbh idbf vciuds bgvui oysbdi uodsfbvuisdvoinu dsihbvuinds oinvoiu sdhp nvoidsijofhb vuhsd buhivbs duy 7bvuo  i sdhyuiu yvbs duoiyb vousy id.",
            "tag": "General",
            "date": "2021-09-06T15:09:29.244Z",
            "__v": 0
          },
          {
            "_id": "6136292e03192b5332acfea58",
            "user": "613617bfcc9b06e7832b39b3",
            "title": "abcd update",
            "description": "agbh idbf vciuds bgvui oysbdi uovbs diu vbuisdybvu ioyhsd buivyb sdiu yvbs duoiyb vousy id. updated",
            "tag": "random-text-update",
            "date": "2021-09-06T14:43:58.805Z",
            "__v": 0
          },
          {
            "_id": "61362f2919b60dq9ee543e2d6",
            "user": "613617bfcc9b06e7832b39b3",
            "title": "abd",
            "description": "agbh idbf vciuds bgvui oysbdi uodsfbvuisdvoinu dsihbvuinds oinvoiu sdhp nvoidsijofhb vuhsd buhivbs duy 7bvuo  i sdhyuiu yvbs duoiyb vousy id.",
            "tag": "General",
            "date": "2021-09-06T15:09:29.244Z",
            "__v": 0
          }
    
      ];

      const [notes, setnotes] = useState(notesInitial)

      // add note
      const addNote = (title, description, tag)=>{
          let note = {
            "_id": "61362f2919b60dq9eae543e2d6",
            "user": "613617bfcc9b06e7832b39b3",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-06T15:09:29.244Z",
            "__v": 0
          };
          setnotes(notes.concat(note))
      }

      const deleteNote = ()=>{

      }

      const editNote = ()=>{

      }

    return(
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;

// value={{state, update}} is es6 equivalent of value={{state: state, update: update}}