import React from 'react'

const NoteItem = (props) => {
    const {note} = props
    return (
        <div className="col-md-2">
            <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description.slice(0,50)}</p>
                <p className="xard-text">{note._id}</p>
                <i className="fas fa-trash-alt mx-2"></i>
                <i className="far fa-edit mx-2"></i>
            </div>
            </div>
        </div>
    )
}

export default NoteItem
