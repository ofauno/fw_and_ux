import Server from 'socket.io';

export function start_server(store) {
    const io = new Server().attach(2444);

    store.subscribe(
        () => io.emit('new-state', store.getState().toJS())
    )

    io.on('jamon-connected', socket => {
        socket.emit('new-state', store.getState().toJS())
        socket.on('action', store.dispatch.bind(store)) // todo: security
    })
}