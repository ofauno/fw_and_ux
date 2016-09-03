import {app_set_entries, app_next_pair, app_vote, app_initial_state} from './core'

export function reducer(state = app_initial_state, action) {

    if (state === null) { state = app_initial_state }

    switch (action.type) {
        case 'APP_SET_ENTRIES':
            return app_set_entries(state, action.entries);
        case 'APP_NEXT_PAIR':
            return app_next_pair(state);
        case 'APP_VOTE':
            return state.update('vote',
                                vote_state => app_vote(vote_state, action.entry))
    }

    alert('action not found!');
    return state;
}