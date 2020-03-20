import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setModal} from "../../../Store/ModalReducer/actions";
import EntityModal from "./EntityModal";

function EntityModalWrapper(props) {
    return <EntityModal wrapped={props}/>
}

const putStateToProps = (state) => {
    return {
        isModalOpen: state.modalReducer.isModalOpen,
        selectedCoords: state.modalReducer.selectedCoords
    }
};

const putActionsToProps = (dispatch) => {
    return {
        setModal: bindActionCreators(setModal, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(EntityModalWrapper);