import {expect} from 'chai'
import {List, Map} from 'immutable'

describe('immnutability', () => {

    describe('a tree', () => {
        function add_movie(current_state, movie) {
            return current_state.set('movies',
                current_state.get('movies').push(movie))
        }

        it('is immutable', () => {
            let state = Map({
                movies: List.of('ham1', 'ham2')
            })

            let next_state = add_movie(state, 'ham3')

            expect(next_state).to.equal(Map({
                movies: List.of(
                    'ham1',
                    'ham2',
                    'ham3',
                )
            }))

            expect(state).to.equal(Map({
                movies: List.of('ham1', 'ham2')
            }))
        })
    })

    describe('a list', () => { 
        function add_movie(current_state, movie) {
            return current_state.push(movie)
        }

        it('is immutable', () => {
            let state = List.of('jamon1', 'jamon2', 'jamon3');
            let next_state = add_movie(state, 'jamon4');

            expect(next_state).to.equal(List.of(
                'jamon1',
                'jamon2',
                'jamon3',
                'jamon4',
            ))

            expect(state).to.equal(List.of(
                'jamon1',
                'jamon2',
                'jamon3'
            ))
        })
    })
})