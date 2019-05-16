import React, { Component } from 'react';
import './../style/GamesContainer.css';
import Game from './Game';

class GamesContainer extends Component {
    render() {
        let games = this.props.games.map(game => {
            return (
                <Game
                    game={game} />
            )
        });

        return (
            <div className="games-main">
                Games ({this.props.games.length})
                <div>
                    {games}
                </div>
            </div>
        )
    }
}

export default GamesContainer;