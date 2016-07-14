import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ScoreCardContainer} from './components/ScoreCard';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => 
	store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

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