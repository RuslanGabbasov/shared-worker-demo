import React from 'react';
import TaskList from "./task-list";
import {useHookstate} from "@hookstate/core";
import {globalState} from "../state";
import styles from "./common.module.css";

const Tasks = () => {
    const tasks = useHookstate(globalState).tasks.get().slice(-16).reverse();

    return (
        <div className={styles.page}>
            <h1>Tasks</h1>
            <TaskList width={800} height={500} tasks={tasks} />
        </div>
    );
};

export default Tasks;