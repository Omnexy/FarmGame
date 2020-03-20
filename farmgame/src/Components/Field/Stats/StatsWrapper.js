import React from "react";
import Stats from "./Stats";
import {bindActionCreators} from "redux";
import {setWheat, setMoney} from "../../../Store/FieldReducer/actions";
import {connect} from "react-redux";

function StatsWrapper(props) {
    return <Stats wrapped={props}/>
}

function putStateToProps(state) {
    return {
        wheat: state.fieldReducer.wheat,
        money: state.fieldReducer.money
    }
}

function putActionsToProps(dispatch) {
    return {
        setWheat: bindActionCreators(setWheat, dispatch),
        setMoney: bindActionCreators(setMoney, dispatch)
    }
}

export default connect(putStateToProps, putActionsToProps)(StatsWrapper);