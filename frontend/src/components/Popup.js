import React from "react";
import './style/style.css'

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>Fechar</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup