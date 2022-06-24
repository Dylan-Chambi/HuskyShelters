import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./pages/App";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
, rootElement);

