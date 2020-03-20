import {SET_FIELD, SET_MONEY, SET_WHEAT} from "./constants";

const initialState = {
    wheat: "???",
    money: "???",
    field: []
};

export default function fieldReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FIELD:
            return { ...state, field: action.payload};
        case SET_MONEY:
            return { ...state, money: action.payload};
        case SET_WHEAT:
            return { ...state, wheat: action.payload};
        default:
            return state;
    }
}