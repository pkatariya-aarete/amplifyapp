import React from "react";
import FileUploadComponent from './FileUploadComponent/FileUploadComponent'

class App extends React.Component {
  render(){
    if (this.props.authState === "signedIn") {
      return (
        <div>
          <FileUploadComponent />
        </div>
      )
    } else {
      return null;
    }
  }
}

export default App;