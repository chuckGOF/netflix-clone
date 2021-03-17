import React, { Component } from 'react'
import Row from './components/Row/Row'
import Banner from './components/Banner/Banner'
import Navigation from './components/Navigation/Navigation'
import requests from './components/requests'

import './App.css';

// const baseURL = 'https://api.themoviedb.org/3'

class App extends Component {
	constructor() {
		super()
		this.state = {
			movies: {
				title: []
			}
		}
	}

	render() {
		// const { movies } = this.state
		return (
			<div className="App">
				<Navigation />
				<Banner />
				<Row title='Netflix Original' fetchUrl={requests.fetchNetflixOriginal} isLargeRow={true} />
				<Row title='Trending Now' fetchUrl={requests.fetchTrending} />
				<Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
				<Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
				<Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
				<Row title='Horrow Movies' fetchUrl={requests.fetchHorrorMovies} />
				<Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
				<Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
			</div>
		);
	}
}

export default App;
