import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {clearCell, sendRefresh} from "../../api";
import StatsWrapper from "./Stats/StatsWrapper";
import Entity from "../../EntityPics";
import EntityModalWrapper from "./EntityModal/EntityModalWrapper";

export default function Field(props) {
    //Состояние элементов поля
    const [field, setField] = useState([]);

    //Списки для отображения сущностей
    const waitingEntity = [Entity.empty, {}, Entity.han, Entity.cow];
    const processEntity = [{}, Entity.processWheat, Entity.processHan, Entity.processCow];
    const readyEntity = [{}, Entity.readyWheat, Entity.readyHan, Entity.readyCow];

    const emptyClickHandle = (rowIndex, cellIndex) => {
        openModal(rowIndex, cellIndex);
    };

    const entityClickHandle = (rowIndex, cellIndex) => {
        sendRefresh({rowIndex, cellIndex});
    };

    //Выбор изображения для сущности
    const makePic = (item) => {
        switch (item.state) {
            case 0:
                return waitingEntity[item.type];
            case 1:
                return processEntity[item.type];
            case 2:
                return readyEntity[item.type];
            default:
                return waitingEntity[0];
        }
    };

    const openModal = (rowIndex, cellIndex) => {
        props.wrapped.setCoords(rowIndex, cellIndex);
        props.wrapped.setModal(true);
    };

    const clearCellHandler = (rowIndex, cellIndex) => {
        clearCell({rowIndex, cellIndex});
    };

    const ClearCellBtn = (rowIndex, cellIndex) => {
        return <button onClick={()=>{clearCellHandler(rowIndex, cellIndex)}} className={styles.DelBtn}>
            <img alt={"Delete"} title={"Удалить"} src={'https://s8.hostingkartinok.com/uploads/images/2020/02/ee00f829b662aa4d99dd883cf80f0a09.png'}/>
        </button>
    };

    //Заполнение поля
    const makeField = () => {
        setField(props.wrapped.field.map((element, rowIndex) => {
            return <tr key={rowIndex}>
                {element.map((el, cellIndex) => {
                    const pic = makePic(el);
                    return <td key={cellIndex} className={styles.Cell}>
                        <img alt={"Unit"} src={pic} onClick={el.type === 0 ? () => {emptyClickHandle(rowIndex, cellIndex)} : () => {entityClickHandle(rowIndex, cellIndex)}} className={styles.Item}/>
                        {el.type > 0 ? ClearCellBtn(rowIndex,cellIndex) : null}
                    </td>
                })}
            </tr>
        }))
    };

    useEffect(()=>{makeField()}, [props]);

    return <div className={styles.Root}>
        <StatsWrapper/>
        <table className={styles.Field}>
            <tbody>
                {field}
            </tbody>
        </table>
        <EntityModalWrapper/>
    </div>
}