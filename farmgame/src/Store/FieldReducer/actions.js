import {SET_FIELD, SET_MONEY, SET_WHEAT} from "./constants";

export const setField = (field) => {
    return {
        type: SET_FIELD,
        payload: field
    }
};

export const setMoney = (money) => {
    return {
        type: SET_MONEY,
        payload: money
    }
};

export const setWheat = (wheat) => {
    return {
        type: SET_WHEAT,
        payload: wheat
    }
};