import React, { Component } from 'react';
import './../style/Logos.css';

class Logos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            homeName: '',
            awayName: ''
        }
    }

    render() {
        return (
            <div className="logos">
                <div>
                    <img src={require(`../images/${this.props.away}.png`)} alt="" />
                </div>
                <div>
                    <img src={require(`../images/${this.props.home}.png`)} alt="" />
                </div>
            </div>
        )
    }
}

export default Logos;