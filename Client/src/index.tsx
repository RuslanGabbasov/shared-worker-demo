import * as React from 'react'
import * as ReactDOM from 'react-dom/client';

import "./service"
import {App} from "./router";

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(<App />);