import React, { Component } from 'react';
import './../style/DatePicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



class DatePicker extends Component {

    constructor(props) {
        super(props);

        this.handleLeft = this.handleLeft.bind(this);
        this.handleRight = this.handleRight.bind(this);
    }

    handleLeft() {
        this.props.handleDateChange('left');
    }

    handleRight() {
        this.props.handleDateChange('right');
    }

    render() {
        let currDate = ((this.props.date.getMonth() + 1)
            + '-' + this.props.date.getDate()
            + '-' + this.props.date.getFullYear());
        return (
            <div className="date-main">
                <div className="left" onClick={this.handleLeft}>
                    <FontAwesomeIcon
                        icon="chevron-left"
                        size="sm" />
                </div>
                <div className="date">
                    {currDate}
                </div>
                <div className="right" onClick={this.handleRight}>
                    <FontAwesomeIcon
                        icon="chevron-right"
                        size="sm" />
                </div>
            </div>
        )
    }
}

export default DatePicker;