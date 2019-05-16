import React, { Component } from 'react';
import './../style/Game.css';

class Game extends Component {
    render() {
        return (
            <div className="game-main">
                <div>
                    {this.props.game.teams.away.team.name}
                </div>
                <div>
                    {this.props.game.teams.home.team.name}
                </div>
            </div>
            
        )
    }
}

export default Game;