import openSocket from 'socket.io-client';

const socket = openSocket(window.location.hostname+':3001');

export const sendRefresh = ({rowIndex, cellIndex}) => {
    socket.emit('got_refresh', {rowIndex, cellIndex});
};

export const sendEntity = ({type, rowIndex, cellIndex}) => {
    socket.emit('got_entity', {type, rowIndex, cellIndex});
};

export const clearCell = ({rowIndex, cellIndex}) => {
    socket.emit('clear_cell', {rowIndex, cellIndex});
};

export const newData = (cb) => {
    socket.on('new_data', data => cb(data));
};

export const newError = (cb) => {
    socket.on('new_error', data => cb(data));
};