import {combineReducers} from "redux";
import fieldReducer from "./FieldReducer/reducers";
import modalReducer from "./ModalReducer/reducers";

export default combineReducers({
    fieldReducer: fieldReducer,
    modalReducer: modalReducer
})