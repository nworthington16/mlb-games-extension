import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../style/Inning.css'


class Inning extends Component {

    render() {
        let topClass = this.props.half === 'top' ? 'inning-active' : '';
        let bottomClass = this.props.half === 'bottom' ? 'inning-active' : '';
        return (
            <div className="inning">
                <FontAwesomeIcon
                    icon="chevron-up"
                    size="xs"
                    className={`inning-icon ${topClass}`} />
                <div>
                    {this.props.inning}
                </div>
                <FontAwesomeIcon
                    icon="chevron-down"
                    size="xs"
                    className={`inning-icon ${bottomClass}`} />
            </div>
        );
    }
}

export default Inning;