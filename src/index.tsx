import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "./Store";
import { Elevator } from "./Elevator";

ReactDOM.render(
  <Provider store={Store}>
    <Elevator />
  </Provider>,
  document.getElementById("root")
);
