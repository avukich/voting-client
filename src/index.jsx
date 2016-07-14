import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ScoreCardContainer} from './components/ScoreCard';

const store = createStore(reducer);
store.dispatch({
	type: 'SET_STATE',
	state: {
		vote: {
			pair: ['Sunshine', '28 Days Later'],
			tally: {'28 Days Later': 2}
		}
	}
});

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route component={App}>
				<Route path="/" component={VotingContainer} />
				<Route path="/scoreCard" component={ScoreCardContainer} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);