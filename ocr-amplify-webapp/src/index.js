import React from "react";
import ReactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css';
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";

import App from "./Components/App";
import "./index.css";

Amplify.configure(aws_exports);

ReactDOM.render(<App />, document.getElementById("root"));