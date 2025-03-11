
import React,{Fragment, useState, useEffect} from 'react';

function JoinButton({onClick, children, className}){
    return (
        <Fragment>
            <button onClick={onClick} className = {className}>
                join
            </button>
        </Fragment>
        
    );
}
export default JoinButton;