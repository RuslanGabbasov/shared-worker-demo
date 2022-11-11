import React from 'react';
import {Link} from "react-router-dom";
import styles from './common.module.css';

const Main = () => {
    return (
        <div className={styles.main}>
            <h1>Main</h1>
            <Link to="tasks" target="_blank">Tasks</Link>
            <Link to="graphs" target="_blank">Graphs</Link>
            <Link to="tables" target="_blank">Tables</Link>
        </div>
    );
};

export default Main;