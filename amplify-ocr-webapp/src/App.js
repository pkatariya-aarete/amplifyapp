import React from "react";
import "./App.css";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import Upload from "./Upload";

Amplify.configure(config);

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    if (this.props.authState === "signedIn") {
      return (
        <div>
          <Upload />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default App;
