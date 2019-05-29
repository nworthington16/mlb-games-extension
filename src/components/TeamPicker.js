import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import 'react-dropdown/style.css';
import '../style/TeamPicker.css';

class TeamPicker extends Component {
    handleChange(e) {
        console.log(e.target.value);
        localStorage.setItem('favorite-team', e.target.value);
    }

    render() {
        const teams = ['Baltimore Orioles', 'Atlanta Braves', 'NY Yankees'];
        return (
            <div className='team-picker'>
                <div>Favorite Team</div>
                <div>
                    <Form>
                        <Form.Group >
                            <Form.Control as="select" onChange={this.handleChange}>
                                <option selected>Pick a team!</option>
                                {teams.map(team => {
                                    let favTeam = localStorage.getItem('favorite-team');
                                    if (team === favTeam) {
                                        return (
                                            <option value={team} selected>{team}</option>
                                        );
                                    }
                                    return (
                                        <option value={team}>{team}</option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        );
    }
}

export default TeamPicker;