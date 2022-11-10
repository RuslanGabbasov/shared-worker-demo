import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <h1>Main</h1>
                <Link to="tasks" target="_blank">Tasks</Link>
                <Link to="graphs" target="_blank">Graphs</Link>
                <Link to="tables" target="_blank">Tables</Link>
            </div>
        ),
    },
    {
        path: "tasks",
        element: <h1>Tasks</h1>,
    },
    {
        path: "graphs",
        element: <h1>Graphs</h1>,
    },
    {
        path: "tables",
        element: <h1>Tables</h1>,
    },
]);

export const App = (): JSX.Element => <RouterProvider router={router} />