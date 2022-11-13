import React from 'react';
import WordCloud from "./word-cloud";
import styles from "./common.module.css";
import {useHookstate} from "@hookstate/core";
import {globalState} from "../state";

const Tables = () => {
    const tables = useHookstate(globalState).tables.get().map((city, i) => ({text: city.name, value: city.value}));
    const cities = [...new Map(tables.reverse().map(c => [c.text, c.value])).entries()].map(c => ({text: c[0], value: c[1]}));

    return (
        <div className={styles.page}>
            <h1>Tables</h1>
            <WordCloud width={700} height={500} words={cities} />
        </div>
    );
};

export default Tables;