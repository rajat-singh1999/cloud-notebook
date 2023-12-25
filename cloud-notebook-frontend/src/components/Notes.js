import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../Context/notes/NotesContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const navigate = useNavigate();
  const editRef = useRef(null);
  const editRefclose = useRef(null);
  const viewRef = useRef(null);
  const viewRefclose = useRef(null);

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' });

  useEffect(() => {
    const checkTokenAndFetchNotes = async () => {
      if (!localStorage.getItem('token')) {
        navigate('/login');
      } else {
        await getNotes();
      }
    };

    checkTokenAndFetchNotes();
  }, [navigate, getNotes]);

  const updateNote = (currentNote) => {
    editRef.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    editRefclose.current.click();
    props.showAlert('Note updated!', 'success');
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const viewClick = (currentNote) => {
    viewRef.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        ref={editRef}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      >
        Launch demo modal
      </button>

      <button
        type="button"
        ref={viewRef}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#viewModal"
      >
        Launch demo modal
      </button>

      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {/* ... (unchanged code) ... */}
      </div>

      <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {/* ... (unchanged code) ... */}
      </div>

      <h2>Your notes</h2>
      <div className="row container my-5">
        {Array.isArray(notes) && notes.length === 0 && 'No notes to display...'}
        {Array.isArray(notes) &&
          notes.map((note) => (
            <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} viewClick={viewClick} note={note} />
          ))}
      </div>
    </>
  );
};

export default Notes;
