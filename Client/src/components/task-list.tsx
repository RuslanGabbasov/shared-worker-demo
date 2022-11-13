import React from 'react';
import {Task} from "../state";
import moment from "moment/moment";
import styles from "./common.module.css";

export interface TaskListProps {
    width: number;
    height: number;
    tasks: Task[];
    isCompact?: boolean;
}

const TaskList = ({width, height, tasks, isCompact}: TaskListProps) => {
    return (
        <div style={{width, height}} className={styles.tasks}>
            {tasks.map(task => (
                <div key={task.id} className={isCompact ? styles.compactTask :styles.task}>
                    <div>🎫 {task.name}</div>
                    {!isCompact && <div>{task.description}</div>}
                    <div>👤 {task.performer}</div>
                    {!isCompact && <div>⏱️ {moment(task.deuDate).format("HH-MM")}</div>}
                </div>
            ))}
        </div>
    );
};

export default TaskList;