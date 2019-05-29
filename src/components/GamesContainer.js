import React, { Component } from 'react';
import './../style/GamesContainer.css';
import Game from './Game';

class GamesContainer extends Component {
    render() {
        let games = this.props.games.map(game => {
            return (
                <Game key={game.gamePk} details={game} />
            )
        })
        .sort((game1, game2) => {
            if (game1.props.details.status.detailedState === 'In Progress') {
                return -1;
            }
            if (game2.props.details.status.detailedState === 'In Progress') {
                return 1;
            }
            return 0;
        })
        .sort((game1, game2) => {
            const favTeam = localStorage.getItem('favorite-team');
            if (favTeam) {
                if (game1.props.details.teams.away.team.name === favTeam 
                    || game1.props.details.teams.home.team.name === favTeam) {
                    return -1;
                }
                if (game2.props.details.teams.away.team.name === favTeam 
                    || game2.props.details.teams.home.team.name === favTeam) {
                    return 1;
                }
                return 0;
            }
            
        });

        return (
            <div className="games-main">
                <div>
                    {games}
                </div>
            </div>
        )
    }
}

export default GamesContainer;