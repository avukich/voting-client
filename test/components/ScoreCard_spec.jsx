import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass,
	Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {expect} from 'chai';
import {ScoreCard} from '../../src/components/ScoreCard';

describe('ScoreCard', () => {

	it('renders entries with vote counts or zero', () => {
		const pair = List.of('Trainspotting', '28 Days Later');
		const tally = Map({'28 Days Later': 5});
		const component = renderIntoDocument(
			<ScoreCard pair={pair} tally={tally} />
		);
		const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
		const [train, days] = entries.map(e => e.textContent);

		expect(entries.length).to.equal(2);
		expect(train).to.contain('Trainspotting');
		expect(train).to.contain('0');
		expect(days).to.contain('28 Days Later');
		expect(days).to.contain('5');
	});

	it('invokes the next callback when next button is clicked', () => {
		let nextInvoked = false;
		const next = () => nextInvoked = true;
		const pair = List.of('Trainspotting', '28 Days Later');
		const component = renderIntoDocument(
			<ScoreCard pair={pair}
			           tally={Map()}
			           next={next}/>
		);
		Simulate.click(ReactDOM.findDOMNode(component.refs.next));
		expect(nextInvoked).to.equal(true);
	});

});