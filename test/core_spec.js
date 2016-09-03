import {List, Map} from 'immutable'
import {expect} from 'chai'
import {app_set_entries, app_next_pair, app_vote} from '../src/core'

describe('app', () => {

    describe('next pair', () => {
        test_next_pair();
    })

    describe('voting', () => {
        test_voting();
    })

    describe('app_set_entries', () => {
        test_set_entries();
    })
})

function test_next_pair() {
    it('set winner when just one entry left', () => { 
        const state = Map({
            vote: Map({ pair: List.of('w1', 'w2'), tally: Map({ 'w1': 123, 'w2': 13 }) })
            , entries: List()
        })
        const next_state = app_next_pair(state)
        const new_state = Map({
            winner: 'w1'
        })

        expect(next_state).to.equal(new_state)
    })

    it('winner goes back to entries', () => {
        const state = Map({
            vote: Map({ pair: List.of('a1', 'a2'), tally: Map({ 'a1': 43, 'a2': 74 }) }),
            entries: List.of('q1', 'q2', 'q3')
        })
        const next_state = app_next_pair(state)
        const new_state = Map({
            vote: Map({ pair: List.of('q1', 'q2') }),
            entries: List.of('q3', 'a2')
        })

        expect(next_state).to.equal(new_state)
    })

    it('tie send back pair to entries', () => {
        const state = Map({
            vote: Map({ pair: List.of('a1', 'a2'), tally: Map({ 'a1': 43, 'a2': 43 }) }),
            entries: List.of('q1', 'q2', 'q3')
        })
        const next_state = app_next_pair(state)
        const new_state = Map({
            vote: Map({ pair: List.of('q1', 'q2') }),
            entries: List.of('q3', 'a1', 'a2')
        })

        expect(next_state).to.equal(new_state)
    })
}

function test_voting() {
    it('creates a tally for the entry if it does not exist', () => {
        const state = Map({
           pair: List.of('m1', 'm2')
        })
        const next_state = app_vote(state, 'm1')
        const new_state = Map({
            pair: List.of('m1', 'm2'), tally: Map({ 'm1': 1 })
        })

        expect(next_state).to.equal(new_state)
    })

    it('adds to the current tally', () => {
        const state = Map({
            pair: List.of('m1', 'm2'), tally: Map({ 'm1': 1, 'm2': 2 }) 
        })
        const next_state = app_vote(state, 'm2')
        const new_state = Map({
            pair: List.of('m1', 'm2'), tally: Map({ 'm1': 1, 'm2': 3 })
        })

        expect(next_state).to.equal(new_state)
    })
}

function test_set_entries() {
    it('adds the entries to the state', () => {
        const state = Map();
        const entries = ['e1', 'e2']
        const next_state = app_set_entries(state, entries);

        expect(next_state).to.equal(Map({
            entries: List.of('e1', 'e2')
        }))
    })
}