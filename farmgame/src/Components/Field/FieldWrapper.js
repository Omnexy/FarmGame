import React from "react";
import {connect} from "react-redux";
import Field from "./Field";
import {bindActionCreators} from "redux";
import {setCoords, setModal} from "../../Store/ModalReducer/actions";

function FieldWrapper(props) {
    return <Field wrapped={props}/>
}

const putStateToProps = (state) => {
    return {
        field: state.fieldReducer.field
    }
};

const putActionsToProps = (dispatch) => {
    return {
        setModal: bindActionCreators(setModal, dispatch),
        setCoords: bindActionCreators(setCoords, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(FieldWrapper);