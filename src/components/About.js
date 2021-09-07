import React, {useContext, useEffect} from 'react';
import noteContext from '../Context/notes/NotesContext'

function About() {
    const a = useContext(noteContext);
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    },[])
    return (
        <div>
            This is about component {a.state.name}
        </div>
    )
}

export default About
