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
    PPD: "postponed",
    SPD: "suspended"
};

// interval in seconds for fetching api data about the game
const INTERVAL = 15;

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
        this.getBaseRunners = this.getBaseRunners.bind(this);
        this.getGameStatus = this.getGameStatus.bind(this);
    }

    componentDidMount() {
        this.fetchGameInfo();
        this.apiInterval = setInterval(() => {
            console.log('updating game info');
            this.fetchGameInfo();
        }, 1000 * INTERVAL)

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
        } else if (status === 'Suspended') {
            gameState = gameStates.SPD;
        }
        this.setState({
            status: gameState
        });
    }

    componentWillUnmount() {
        clearInterval(this.apiInterval);
    }

    fetchGameInfo() {
        let gameUrl = `https://statsapi.mlb.com/api/v1.1/game/${this.props.details.gamePk}/feed/live`;
        fetch(gameUrl)
            .then(res => res.json())
            .then(json => {
                if (this.state.status === gameStates.IP) {
                    // console.log(this.props.details.teams.home.team.name);
                    let baseRunners = this.getBaseRunners(json.liveData.plays.allPlays, 
                        json.liveData.plays.currentPlay.about.inning,
                        json.liveData.plays.currentPlay.about.halfInning);
                    this.setState({
                        inning: json.liveData.plays.currentPlay.about.inning,
                        halfInning: json.liveData.plays.currentPlay.about.halfInning,
                        bases: baseRunners
                    });
                }
                
            })
            .catch(err => console.error(err))
    }

    // really with there was a better way to do this
    // there probably is tbh
    // BUG: runner reaches 1st, then advances to second on error. 2 separate 'runners'
    getBaseRunners(plays, currInning, currHalfInning) {
        let bases = {'1B': false, '2B': false, '3B': false};
        for (let play of plays) {
            if (play.about.inning === currInning && play.about.halfInning === currHalfInning) {
                if (play.runners.length > 0) {
                    // iterating backwards fixes case of force out at second
                    // null -> 1B, 1B -> null. Ends up not recording man at first
                    // but then that messes up other stuff
                    // for (let i = play.runners.length - 1; i >= 0; i--) {
                        // let runner = play.runners[i];
                    for (let runner of play.runners) {
                        if (runner.movement.start) {
                            bases[runner.movement.start] = false;
                        }
                        if (runner.movement.end && runner.movement.end !== 'score') {
                            bases[runner.movement.end] = true;
                        }
                    }
                }
            }
        }
        return bases;
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
        if (hour === 0) hour = 12;
        return hour + gameTime.substring(2, 5) + ' ET';
    }

    getGameStatus() {
        switch (this.state.status) {
            case gameStates.PRE:
                return (
                    <div>{this.formatTime(this.props.details.gameDate)}</div>
                );
            case gameStates.PPD:
                return (
                    <div>Postponed</div>
                );
            case gameStates.SPD:
                return (
                    <div>Suspended</div>
                );
            case gameStates.DLY:
                return (
                    <div>Delayed</div>
                );
            case gameStates.FNL:
                return (
                    <div className="final">Final</div>
                );
            case gameStates.IP:
                return (
                    <div className="ip-flex">
                        <Bases basesState={this.state.bases} />
                        <Inning 
                            inning={this.state.inning}
                            half={this.state.halfInning} />
                    </div>
                );
        }
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
                        (this.state.status === gameStates.IP 
                            || this.state.status === gameStates.FNL 
                            || this.state.status === gameStates.SPD
                            || this.state.status === gameStates.DLY) &&
                        <div>
                            <div>{this.props.details.teams.away.score}</div>
                            <div>{this.props.details.teams.home.score}</div>
                        </div>
                    }
                </div>
                <div className="status">
                    {this.getGameStatus()}
                </div>
            </div>
        )
    }
}

export default Game;