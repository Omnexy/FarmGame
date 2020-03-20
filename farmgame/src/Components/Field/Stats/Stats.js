import React from "react";
import styles from "./styles.module.css";

export default function Stats(props) {
    return <div className={styles.Root}>
        <div className={styles.AppName}>
            MyPrettyFarm
        </div>
        <div className={styles.StatsContainer}>
            <div className={styles.Item} title={"Пшено"}>
                <img alt={"Psheno"} src={'https://s8.hostingkartinok.com/uploads/images/2020/03/ff929efc2e19e254ea44e61847fe3950.png'}/>
                {props.wrapped.wheat}
            </div>
            <div className={styles.Item} title={"Деньги"}>
                <img alt={"Money"} src={'https://s8.hostingkartinok.com/uploads/images/2020/03/e9b745412aa12492e4ac503792577110.png'}/>
                {props.wrapped.money}
            </div>
        </div>
    </div>
}