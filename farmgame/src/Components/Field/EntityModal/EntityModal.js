import React from "react";
import Modal from "react-modal";
import styles from "./styles.module.css";
import {sendEntity} from "../../../api";
import Entity from "../../../EntityPics";

export default function EntityModal(props) {
    Modal.setAppElement('#root');

    //Отправка запроса на сервер о размещении выбранной сущности
    const send = (type, rowIndex, cellIndex) => {
        sendEntity({type, rowIndex, cellIndex});
        props.wrapped.setModal(false);
    };

    return <Modal isOpen={props.wrapped.isModalOpen} className={styles.Modal} overlayClassName={styles.Overlay}>
        <div className={styles.Header}>
            <div className={styles.HeaderText}>Что размещаем?</div>
            <button onClick={()=>{props.wrapped.setModal(false)}} className={styles.CloseBtn}><img alt={"Close"} title={"Закрыть"} src={'https://s8.hostingkartinok.com/uploads/images/2020/02/ee00f829b662aa4d99dd883cf80f0a09.png'}/></button>
        </div>
        <table className={styles.EntityTable}>
            <tbody>
                <tr>
                    <td>
                        <img alt={"Wheat"} onClick={()=>{send(1, props.wrapped.selectedCoords.rowIndex, props.wrapped.selectedCoords.cellIndex)}} className={styles.Item} title={"Пшеница"} src={Entity.readyWheat}/>
                    </td>
                    <td>
                        <img alt={"Han"} onClick={()=>{send(2, props.wrapped.selectedCoords.rowIndex, props.wrapped.selectedCoords.cellIndex)}} className={styles.Item} title={"Курица"} src={Entity.han}/>
                    </td>
                    <td>
                        <img alt={"Cow"} onClick={()=>{send(3, props.wrapped.selectedCoords.rowIndex, props.wrapped.selectedCoords.cellIndex)}} className={styles.Item} title={"Корова"} src={Entity.cow}/>
                    </td>
                </tr>
            </tbody>
        </table>
    </Modal>
}