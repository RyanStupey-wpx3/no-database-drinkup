import React, {Component} from 'react';
import '../styles/button.css'

export const Button = (props) => {
    return (<button className="addToFavsButton" onClick={() => props.saveForLater(props.index)}>save for later</button>)

}