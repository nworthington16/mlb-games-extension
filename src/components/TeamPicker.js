import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import 'react-dropdown/style.css';
import '../style/TeamPicker.css';

const teams = [
    'Arizona Diamondbacks',
    'Atlanta Braves',
    'Baltimore Orioles',
    'Boston Red Sox',
    'Chicago White Sox',
    'Chicago Cubs',
    'Cincinnati Reds',
    'Cleveland Indians',
    'Colorado Rockies',
    'Detroit Tigers',
    'Houston Astros',
    'Kansas City Royals',
    'Los Angeles Angels',
    'Los Angeles Dodgers',
    'Miami Marlins',
    'Milwaukee Brewers',
    'Minnesota Twins',
    'New York Yankees',
    'New York Mets',
    'Oakland Athletics',
    'Philadelphia Phillies',
    'Pittsburgh Pirates',
    'San Diego Padres',
    'San Francisco Giants',
    'Seattle Mariners',
    'St. Louis Cardinals',
    'Tampa Bay Rays',
    'Texas Rangers',
    'Toronto Blue Jays',
    'Washington Nationals'
];

class TeamPicker extends Component {
    handleChange(e) {
        localStorage.setItem('favorite-team', e.target.value);
    }

    render() {
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