import React, { Component } from 'react';
import './../style/Game.css';
import Logos from './Logos';

const gameStates = {
    PRE: "pre",
    IP: "ip",
    FNL: "final",
    DLY: "delayed",
    PPD: "postponed"
}

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: gameStates.PRE,
            awayScore: '-',
            homeScore: '-'
        }

        this.formatTime = this.formatTime.bind(this);
        this.getTeamName = this.getTeamName.bind(this);
    }

    componentDidMount() {
        let status = this.props.details.status.detailedState;
        let gameState;
        if (status === 'Scheduled' || status === 'Pre-Game' || status === 'Warmup') {
            gameState = gameStates.PRE;
        } else if (status === 'Final' || status === 'Game Over') {
            gameState = gameStates.FNL;
        } else if (status === 'In Progress') {
            gameState = gameStates.IP;
        } else if (status === 'Delayed') {
            gameState = gameStates.DLY;
        } else if (status === 'Postponed') {
            gameState = gameStates.PPD;
        }
        this.setState({
            status: gameState
        });
    }

    getTeamName(teamInfo) {
        let team = teamInfo.team.name.split(' ');
        let teamName;
        if (team[team.length - 1].toLowerCase() === 'sox') {
            teamName = team[team.length - 2].toLowerCase() + team[team.length - 1].toLowerCase();
        } else {
            teamName = team[team.length - 1].toLowerCase();
        }
        return teamName;
    }

    formatTime(gameDate) {
        let gameTime = gameDate.substring(11, 19);
        let hour = parseInt(gameTime.substring(0, 2));
        hour = (hour + 8) % 12;
        return hour + gameTime.substring(2, 5) + ' ET';
    }

    // TODO: Split this up at some point
    render() {
        return (
            <div className="game-main">
                <Logos 
                    home={this.getTeamName(this.props.details.teams.home)}
                    away={this.getTeamName(this.props.details.teams.away)} />
                <div className="teams">
                    <div>
                        {this.props.details.teams.away.team.name}
                    </div>
                    <div>
                        {this.props.details.teams.home.team.name}
                    </div>
                </div>
                <div className="score">
                    {
                        this.state.status === gameStates.PRE &&
                        <div>
                            <div>-</div>
                            <div>-</div>
                        </div>
                    }
                    {
                        (this.state.status === gameStates.IP || this.state.status === gameStates.FNL) &&
                        <div>
                            <div>{this.props.details.teams.away.score}</div>
                            <div>{this.props.details.teams.home.score}</div>
                        </div>
                    }
                </div>
                <div className="status">
                    {
                        this.state.status === gameStates.PRE &&
                        <div>{this.formatTime(this.props.details.gameDate)}</div>
                    }
                    {
                        this.state.status === gameStates.IP &&
                        <div>
                            In progress
                        </div>
                    }
                    {
                        this.state.status === gameStates.DLY &&
                        <div>Delayed</div>
                    }
                    {
                        this.state.status === gameStates.FNL &&
                        <div className="final">Final</div>
                    }
                </div>
            </div>
        )
    }
}

export default Game;