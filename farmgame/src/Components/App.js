import React, {useEffect} from 'react';
import {newData, newError} from "../api";
import {setField, setWheat, setMoney} from "../Store/FieldReducer/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import FieldWrapper from "./Field/FieldWrapper";
import styles from "./App.module.css";

function App(props) {


    const subscribeOnData = () => {
        newData((data) => {
            props.setField(data.field);
            props.setMoney(data.money);
            props.setWheat(data.wheat);
        });
    };

    const subscribeOnErrors = () => {
        newError((data) => {
            switch (data.code) {
                case 1:
                    alert('В клетке уже что-то есть!');
                    break;
                case 2:
                    alert('Клетка уже пустая!');
                    break;
                default:
                    alert('Ошибка сервера!');
            }
        })
    };

    //Подписка на события, приходящие с сервера
    useEffect(()=>{
        subscribeOnData();
        subscribeOnErrors();
    }, []);

    return (
        <div className={styles.App}>
            <FieldWrapper/>
        </div>
    );
}

function putStateToProps(state) {
    return {
        field: state.fieldReducer.field
    }
}

function putActionsToProps(dispatch) {
    return {
        setField: bindActionCreators(setField, dispatch),
        setMoney: bindActionCreators(setMoney, dispatch),
        setWheat: bindActionCreators(setWheat, dispatch)
    }
}

export default connect(putStateToProps, putActionsToProps)(App);
