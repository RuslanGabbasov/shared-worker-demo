import React from 'react';
import {useHookstate} from "@hookstate/core";
import {globalState} from "../state";
import Dots from "./dots";
import {PointsRange} from "@visx/mock-data/lib/generators/genRandomNormalPoints";
import styles from './common.module.css';

const Graphs = () => {
    const points = useHookstate(globalState).graphs.get().map(dot => [dot.x * 10E-19, dot.y * 10E-19, dot.value * 10E-19] as PointsRange);

    return (
        <div className={styles.page} key={`graph${points.length}`}>
            <h1>Graphs</h1>
            <Dots width={700} height={500} points={points} />
        </div>
    );
};

export default Graphs;