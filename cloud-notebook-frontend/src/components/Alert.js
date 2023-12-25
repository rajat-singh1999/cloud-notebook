import React from 'react'

function Alert(props) {
    let word = props.type;

    if(word === "danger"){
        word = "error";
    }
    return (
        <div style={{height: "60px"}}> 
        
        <div className="container">
            <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
                <strong>{word.toUpperCase()}</strong>    {props.msg}
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>
        </div>
        </div>
    )
}

export default Alert
