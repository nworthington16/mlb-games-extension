import React, { Component } from 'react';
import './../style/Bases.css';

class Bases extends Component {
    render() {
        // console.log(this.props.basesState);
        let firstClass = this.props.basesState['1B'] ? 'base-active' : '';
        let secondClass = this.props.basesState['2B'] ? 'base-active' : '';
        let thirdClass = this.props.basesState['3B'] ? 'base-active' : '';
        return (
            <div className="bases">
                <div className="row">
                    <div className={`base ${secondClass}`}></div>
                </div>
                <div className="row">
                    <div className={`base ${thirdClass}`}></div>
                    <div className={`base ${firstClass}`}></div>
                </div>
            </div>
        );
    }
}

export default Bases;