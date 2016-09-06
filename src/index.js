import {make_store as makeStore} from './src/history_store'
import {startServer as start_server} from './src/server'

export const store = makeStore();
startServer();