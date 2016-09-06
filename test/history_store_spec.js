import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {make_store as makeStore} from '../src/history_store';

describe('store', () => {
    it('is configured', () => {
        const store = makeStore()

        expect(store.getState()).to.equal(Map())

        store.dispatch({ type: 'APP_SET_ENTRIES', entries: ['t2', 't4'] });

        expect(store.getState()).to.equal(fromJS({ entries: ['t2', 't4'] }));

    })
})