import {createHookstate, useHookstate} from '@hookstate/core';

export interface Task {
    id: number;
    name: string;
    description: string;
    deuDate: string;
    performer: string;
}

export interface Graph {
    id: number;
    x: number;
    y: number;
    value: number;
}

export interface Table {
    id: number;
    name: string;
    value: number;
}

export interface State {
    tasks: Task[];
    graphs: Graph[];
    tables: Table[];
}

export const globalState = createHookstate<State, {}>({tasks: [], tables: [], graphs: []});