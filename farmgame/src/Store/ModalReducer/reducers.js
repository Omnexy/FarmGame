import {SET_COORDS, SET_MODAL} from "./constants";

const initialState = {
    isModalOpen: false,
    selectedCoords: {rowIndex: -1, cellIndex: -1}
};

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MODAL:
            return { ...state, isModalOpen: action.payload};
        case SET_COORDS:
            return { ...state, selectedCoords: action.payload};
        default:
            return state;
    }
}