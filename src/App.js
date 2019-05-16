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
	}

	handleDateChange(lr) {
		if (lr === 'left') {
			let newDate = this.state.date;
			newDate.setDate(this.state.date.getDate() - 1);
			this.setState({
				date: newDate
			});
		} else if (lr === 'right') {
			let newDate = this.state.date;
			newDate.setDate(this.state.date.getDate() + 1);
			this.setState({
				date: newDate
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
						<GamesContainer />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
