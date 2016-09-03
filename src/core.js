import {List, Map} from 'immutable'

export const app_initial_state = Map();

function GET_WINNER(vote) {
    if (!vote) return [];
    const [a, b] = vote.get('pair')
    const aVotes = vote.getIn(['tally', a], 0)
    const bVotes = vote.getIn(['tally', b], 0)

    if (aVotes > bVotes) return [a]
    else if (aVotes < bVotes) return [b]
    else return [a, b]
}

export function app_next_pair(state) {
    const entries = state.get('entries').concat(GET_WINNER(state.get('vote')))

    // return winner
    if (entries.size === 1) {
        return state.remove('vote').remove('entries').set('winner', entries.first())
    }

    return state.merge({
        entries: entries.skip(2),
        vote: Map({ pair: entries.take(2) })
    });
}
export function app_vote(vote_state, entry) {
    return vote_state.updateIn(
        ['tally', entry]    // traverse data structure
        , 0                         // default value at the end
        , tally => tally + 1)       // apply logic
}
export function app_set_entries(state, entries) {
    return state.set('entries', List(entries))
}