import React, { Component } from 'react';
import './../style/Game.css';
import Logos from './Logos';
import Bases from './Bases';
import Inning from './Inning';

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
            inning: 0,
            halfInning: '',
            bases: {}
        }

        this.formatTime = this.formatTime.bind(this);
        this.getTeamName = this.getTeamName.bind(this);
        this.fetchGameInfo = this.fetchGameInfo.bind(this);
    }

    componentDidMount() {
        this.fetchGameInfo();

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

    fetchGameInfo() {
        let gameUrl = `https://statsapi.mlb.com/api/v1.1/game/${this.props.details.gamePk}/feed/live`;
        fetch(gameUrl)
            .then(res => res.json())
            .then(json => {
                if (this.state.status === gameStates.IP) {
                    console.log(json.liveData.plays.currentPlay.about.inning);
                    this.setState({
                        inning: json.liveData.plays.currentPlay.about.inning,
                        halfInning: json.liveData.plays.currentPlay.about.halfInning
                    });
                }
                
            })
            .catch(err => console.error(err))
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
                        <div className="ip-flex">
                            <Bases basesState={this.state.basesState} />
                            <Inning 
                                inning={this.state.inning}
                                half={this.state.halfInning} />
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