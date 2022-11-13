import React from 'react';
import {Link} from "react-router-dom";
import styles from './common.module.css';
import {useHookstate} from "@hookstate/core";
import {globalState} from "../state";
import Badge from "./badge";
import WordCloud from "./word-cloud";
import {PointsRange} from "@visx/mock-data/lib/generators/genRandomNormalPoints";
import Dots from "./dots";
import TaskList from "./task-list";

const Main = () => {
    const state = useHookstate(globalState)
    const cities = state.tables.get().map((city, i) => ({text: city.name, value: city.value * 10E-19}));
    const points = state.graphs.get().map(dot => [dot.x * 10E-19, dot.y * 10E-19, dot.value * 10E-19] as PointsRange);
    const tasks = state.tasks.get().slice(-4).reverse();

    const openAllTabs = () => {
        window.open('/tasks');
        window.open('/graphs');
        window.open('/tables')
    }

    return (
        <div>
            <div className={styles.main}>
                <h1>Main</h1>
                <Link to="tasks" target="_blank">Tasks<Badge count={state.tasks.length}/></Link>
                <Link to="graphs" target="_blank">Graphs<Badge count={state.graphs.length}/></Link>
                <Link to="tables" target="_blank">Tables<Badge count={state.tables.length}/></Link>
                <Link to="/" onClick={openAllTabs} className={styles.allTabs} title="Open all tabs">🖇</Link>
            </div>
            <div className={styles.layout}>
                <div>
                    <h2>Tasks</h2>
                    <TaskList width={250} height={200} tasks={tasks} isCompact={true}/>
                </div>
                <div>
                    <h2>Graphs</h2>
                    <Dots width={250} height={200} points={points}/>
                </div>
                <div>
                    <h2>Tables</h2>
                    <WordCloud width={250} height={200} words={cities}/>
                </div>
            </div>
        </div>
    );
};

export default Main;