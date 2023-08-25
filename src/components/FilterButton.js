import React from "react";

function FilerButton(props){
    return(
        <button
            type="button"
            className="btn toggle-btn"
            aria-pressed={props.isPressed}
            onClick={()=>props.setFilter(props.name)}>{/*knopka nazata po ymolchaniy aria-pressed */}
            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    )
}

export default FilerButton;