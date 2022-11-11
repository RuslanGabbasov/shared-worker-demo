import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Tasks from "./components/tasks";
import Graphs from "./components/graphs";
import Tables from "./components/tables";
import Main from "./components/main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "tasks",
        element: <Tasks />,
    },
    {
        path: "graphs",
        element: <Graphs />,
    },
    {
        path: "tables",
        element: <Tables />,
    },
]);

export const App = (): JSX.Element => <RouterProvider router={router} />