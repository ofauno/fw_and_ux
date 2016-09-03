import {Map, fromJS} from 'immutable'
import {expect} from 'chai'
import {reducer} from '../src/reducer'

describe('reducer', () =>{
    it('initial state', () => {
        const action = {type: 'APP_SET_ENTRIES', entries: ['d2']}

        const empty_states  = [undefined, null, void 0]

        empty_states.forEach(state => {
            const next_state = reducer(state, action)
            expect(next_state).to.equal(fromJS({
                entries: ['d2']
            }))
        })
    })

    it('set entries', () => {
        const state = Map()
        const action = { type: 'APP_SET_ENTRIES', entries: ['z1']}
        const next_state = reducer(state, action)

        expect(next_state).to.equal(fromJS({ entries: ['z1']}))
    })
    
    it('next pair', () => {
        const state = fromJS({ entries: ['x1', 'x2']})
        const action = { type: 'APP_NEXT_PAIR' }
        const next_state = reducer(state, action)

        expect(next_state).to.equal(fromJS({ 
            vote: {pair: ['x1', 'x2']}
            , entries: []
        }))
    })

    it('voting', () => {
        const state = fromJS({
            vote: {pair:['c1', 'c3']}
            , entries: []
        })
        const action = { type: 'APP_VOTE', entry: 'c1' }
        const next_state = reducer(state, action)

        expect(next_state).to.equal(fromJS({ 
            vote: {pair: ['c1', 'c3'], tally: {c1: 1}}
            , entries: []
        }))
    })
})