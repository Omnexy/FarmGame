const io = require('socket.io')();
const fiedHolder = require('./Field');

const PORT = 3001;

fiedHolder.initCells();

let users = [];

//Отправка состояния поля и ресурсов всем подключенным клиентам
const sendField = () => {
    const field = fiedHolder.getField();
    const money = fiedHolder.getMoney();
    const wheat = fiedHolder.getWheat();
    users.forEach(item => {
        item.emit('new_data', {field, money, wheat: wheat});
    });
};

//Отправка состояния одному клиенту
const refreshSocket = (socket) => {
    const field = fiedHolder.getField();
    const money = fiedHolder.getMoney();
    const wheat = fiedHolder.getWheat();
    socket.emit('new_data', {field, money, wheat: wheat});
};

//Инициализация обхода всех ячеек раз в секунду
setInterval(()=> {
    if(fiedHolder.pollCells()) {
        sendField();
    }
},1000);

io.listen(PORT);
console.log(`Listening port ${PORT}`);
io.on('connection', socket => {
    users.push(socket);

    console.log(`Got new user`);
    refreshSocket(socket);

    socket.on('got_refresh', ({rowIndex, cellIndex})=>{
        fiedHolder.refreshCell(rowIndex, cellIndex);
        sendField();
    });
    socket.on('got_entity', ({type, rowIndex, cellIndex})=>{
        const cell = fiedHolder.getCellByIndices(rowIndex, cellIndex);
        if(cell.type !== 0) {
            socket.emit('new_error', {code: 1});
            refreshSocket(socket);
        }
        else {
            fiedHolder.placeEntity(type,rowIndex,cellIndex);
        }
    });
    socket.on('clear_cell', ({rowIndex, cellIndex})=>{
        if(fiedHolder.getCellByIndices(rowIndex,cellIndex).type === 0) {
            socket.emit('new_error', {code: 2});
            refreshSocket(socket);
        }
        else {
            fiedHolder.placeEntity(0, rowIndex, cellIndex);
            sendField();
        }
    });
});

/*
    Коды ошибок:
    1 - попытка заполнить непустую клетку
    2 - попытка очистить пустую клетку
 */