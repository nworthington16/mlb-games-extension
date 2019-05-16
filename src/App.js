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
			date: "",
			games: []
		}
	}

	render() {
		let cName = `wrapper-${this.state.mode}`;
		return (
			this.state.view === "games" &&
			<div className={cName}>
				<div className="flexWrapper">
					<div className="dateWrapper">
						<DatePicker />
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
