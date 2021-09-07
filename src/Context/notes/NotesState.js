import noteContext from './NotesContext';
import { useState } from 'react';

const NoteState = (props)=>{
    const tempstate = {
        "name": "Rajat",
        "class": "5B"
    }
    const [state, setstate] = useState(tempstate);

    const update = ()=>{
        setTimeout(()=>{
            setstate({"name": "Gajodhar", "class": "5A"});
        }, 1000);
    }

    return(
        <noteContext.Provider value={{state, update}}>
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;

// value={{state, update}} is es6 equivalent of value={{state: state, update: update}}