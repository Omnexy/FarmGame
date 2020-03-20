class FieldCell {
    constructor({type, state, ticks}) {
        this.type = type; //Тип сущности в ячейке
        this.state = state; //Состояние сущности в ячейке
        this.ticks = ticks; //Количество циклов до готовности ресурса
    }
}

let money = 0;
let wheat = 0;
let cells = [];

//Типы: 0-пусто, 1-пшено, 2-кура, 3-корова
//Состояния: 0 - ждёт пшено, 1 - производит ресурс, 2 - готово, -1 - не участвует в цикле
const types = [{type: 0, state: -1, ticks: 0}, {type: 1, state: 1, ticks: 10}, {type: 2, state: 0, ticks: 30}, {type: 3, state: 0, ticks: 20}];

//Заполнение поля пустыми ячейками
function initCells() {
    for (let i = 0; i < 8; i++) {
        cells.push([]);
        for (let j = 0; j < 8; j++) {
            cells[i].push(new FieldCell(types[0]));
        }
    }
}

//Обход ячеек
function pollCells() {
    let needSend = false;
    for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
        for (let cellIndex = 0; cellIndex < 8; cellIndex++) {
            if(cells[rowIndex][cellIndex].state !== -1) {
                switch (cells[rowIndex][cellIndex].state) {
                    case 0:
                        if(wheat > 0) {
                            wheat = wheat - 1;
                            cells[rowIndex][cellIndex].state = 1;
                            needSend = true;
                        }
                        break;
                    case 1:
                        if(cells[rowIndex][cellIndex].ticks > 0) {
                            cells[rowIndex][cellIndex].ticks = cells[rowIndex][cellIndex].ticks - 1;
                        }
                        else {
                            cells[rowIndex][cellIndex].state = 2;
                            needSend = true;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    return needSend;
}

function placeEntity(type, rowIndex, cellIndex) {
    cells[rowIndex][cellIndex] = new FieldCell(types[type]);
}

function refreshCell(rowIndex, cellIndex) {
    if(cells[rowIndex][cellIndex].state === 2) {
        if(cells[rowIndex][cellIndex].type === 1)
            wheat = wheat + 1;
        else
            money = money + 1;
        cells[rowIndex][cellIndex] = new FieldCell(types[cells[rowIndex][cellIndex].type]);
    }
}

function getField() {
    return cells;
}

function getMoney() {
    return money;
}

function getWheat() {
    return wheat;
}

function getCellByIndices(rowIndex, cellIndex) {
    return cells[rowIndex][cellIndex];
}

module.exports.initCells = initCells;
module.exports.placeEntity = placeEntity;
module.exports.getCellByIndices = getCellByIndices;
module.exports.pollCells = pollCells;
module.exports.refreshCell = refreshCell;
module.exports.getField = getField;
module.exports.getMoney = getMoney;
module.exports.getWheat = getWheat;