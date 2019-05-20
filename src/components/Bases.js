import React, { Component } from 'react';
import './../style/Bases.css';

class Bases extends Component {
    render() {
        return (
            <div className="bases">
                <div className="row">
                    <div className="base active"></div>
                </div>
                <div className="row">
                    <div className="base"></div>
                    <div className="base"></div>
                </div>
            </div>
        );
    }
}

export default Bases;