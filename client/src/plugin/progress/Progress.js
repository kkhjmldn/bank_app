import React, {Component} from 'react'
import './Progress.css'

class Progress extends Component {
    constructor(props) {
        super(props)
        this.state ={

        }
    }
    render(){
        return(
            <div className="Progressbar">
                <div className="Progress"
                    style={{width:this.props.progress+ '%'}} />
            </div>
        );
    }
}

export default Progress