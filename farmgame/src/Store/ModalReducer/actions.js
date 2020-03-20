import {SET_COORDS, SET_MODAL} from "./constants";

export const setModal = (state) => {
    return {
        type: SET_MODAL,
        payload: state
    }
};

export const setCoords = (rowIndex, cellIndex) => {
    return {
        type: SET_COORDS,
        payload: {rowIndex, cellIndex}
    }
};