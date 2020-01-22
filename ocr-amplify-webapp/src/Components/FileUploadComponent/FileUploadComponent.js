import React from "react";
import "../App.css";
import Upload from "./Upload";

class FileUploadComponent extends React.Component {
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

export default FileUploadComponent;
