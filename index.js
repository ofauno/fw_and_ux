import {make_store as makeStore} from './src/history_store'
import {start_server as startServerAndSubscribeTo} from './src/server'

export const store = makeStore();
startServerAndSubscribeTo(store);

store.dispatch({
    type: 'APP_SET_ENTRIES'
    , entries: require('./entries.json')
})

store.dispatch({ type: 'APP_NEXT_PAIR' })