import React,{Component} from 'react';

class Box extends Component {
    constructor(props){
        super(props)
    }
    

    render(){
        return(
            <div className="box">
                <button onClick={props.filtertype(props.index)}>display type</button>
            </div>
        )
    }
}

export default Box;
