import React, { Component } from 'react';
import './App.css';
import DatePicker from './components/DatePicker';
import GamesContainer from './components/GamesContainer'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronRight);
library.add(faChevronLeft);

const modes = {
	DARK: "dark",
	LIGHT: "light"
};

const views = {
	GAMES: "games",
	SETTINGS: "settings"
};

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			view: views.GAMES,
			mode: modes.DARK,
			date: new Date(),
			games: []
		}

		this.handleDateChange = this.handleDateChange.bind(this);
		this.formatDate = this.formatDate.bind(this);
	}

	componentDidMount() {
		this.fetchGames();
		setInterval(() => {
			this.fetchGames();
			console.log('updating');
		}, 1000 * 15);
	}

	fetchGames() {
		let currDate = `${this.formatDate(this.state.date)}`;
		fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1,51&date=${currDate}`)
			.then(res => res.json())
			.then(json => {
				this.setState({
					games: json.dates[0].games
				});
			});
	}

	formatDate(date) {
		return (
			date.getFullYear() + '-'
			+ (date.getMonth() + 1) + '-'
			+ date.getDate()
		);
	}

	handleDateChange(lr) {
		if (lr === 'left') {
			let newDate = this.state.date;
			newDate.setDate(this.state.date.getDate() - 1);
			this.setState({
				date: newDate
			}, () => {
				this.fetchGames();
			});
		} else if (lr === 'right') {
			let newDate = this.state.date;
			newDate.setDate(this.state.date.getDate() + 1);
			this.setState({
				date: newDate
			}, () => {
				this.fetchGames();
			});
		}
	}

	render() {
		let cName = `wrapper-${this.state.mode}`;
		return (
			this.state.view === "games" &&
			<div className={cName}>
				<div className="flexWrapper">
					<div className="dateWrapper">
						<DatePicker
							date={this.state.date}
							handleDateChange={this.handleDateChange} />
					</div>
					<div className="gamesWrapper">
						<GamesContainer
							date={this.state.date}
							games={this.state.games} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
