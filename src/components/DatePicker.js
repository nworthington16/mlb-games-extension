import React, { Component } from 'react';
import './../style/DatePicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const left = '<';
const right = '>';

class DatePicker extends Component {
    render() {
        return (
            <div className="date-main">
                <div className="left">
                    <FontAwesomeIcon icon="chevron-left" />
                </div>
                <div className="date">
                    05-15-2019
                </div>
                <div className="right">
                    <FontAwesomeIcon icon="chevron-right" />
                </div>
            </div>
        )
    }
}

export default DatePicker;