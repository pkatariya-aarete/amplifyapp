import React from "react";
import Amplify, { Storage } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';

import upload from "./assets/images/arrow-up.svg";
import dropbox from "./assets/images/Drag-Files.svg";
import signOut from "./assets/images/Signout-Icon.svg";
import "./assets/styles/upload.css";

Amplify.configure(awsconfig);

class Upload extends React.Component {
  constructor(props) {
    // highlight-range{3}

    //this.handleSubmit = this.handleSubmit.bind(this);
    super(props);
    this.fileInput = React.createRef();

    this.uploadFile = this.uploadFile.bind(this);
    this.state = {
      fileName: "Choose File",
      fileList: {}
      // dragging: false
    };
  }

  uploadFile(event) {
    let files = event.target.files;
    console.log(files);
    console.log(files.length);
    this.setState({
      fileList: files
    });

    if (files.length) {
      let data = new FormData();
      data.append("file", files);
      this.setState({
        fileName: files.length + "  File Selected"
      });
      // axios.post('/files', data)...
    } else {
      this.setState({
        fileName: "Choose File"
      });
    }
    console.log(this.state.fileList);
  }

  UploadFilesToS3(event) {
    console.log("Inside uploadFile() function");
    console.log(this.state.fileList);
    //event.preventDefault();
    var filesCount = this.fileInput.current.files.length;
    console.log(this.fileInput);

    for (var i = 0; i < filesCount; i++) {
      //file details
      var file = this.fileInput.current.files[i];
      var fileName = "dev/source-documents-docx/" + file.name;
      var fileType = file.type;

      console.log(file);

      //Upload to S3
      Storage.put(fileName, file, {
        level: "public",
        contentType: fileType
      })
        .then(result => {
          console.log(result);
        }) // {key: "test.txt"}
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div className="signin-container">
        <div className="projectName m-bottom">OCR</div>
        <div className="page-Title">Upload Document</div>
        <div className="field-container">
          <div className="filedDevide1">
            <label className="label-fields">Upload File</label>
            <input
              type="file"
              name="file"
              id="file"
              className="inputfile"
              onChange={this.uploadFile}
              multiple
              accept=".doc, .docx, .pdf"
              ref={this.fileInput}
            />
            <label htmlFor="file" className="chooseFile">
              {this.state.fileName}
            </label>
            <button className="uploadFile">
              <img src={upload} alt="upload" />
            </button>
          </div>
        </div>
        <div className="file-upload" droppable="true">
          {this.state.fileList.length ? (
            <div>
              {Object.entries(this.state.fileList).map(([key, value]) => {
                return (
                  <p className="fileNameList" key={key}>
                    {value.name}
                  </p>
                );
              })}
            </div>
          ) : (
            <div className="dropBox-component">
              <img src={dropbox} alt="dropfile" className="dropImg"></img>
              <p>Drop your files here</p>
            </div>
          )}
        </div>

        <div className="crt-account">
          <button
            className="createAccount"
            onClick={() => this.UploadFilesToS3()}
          >
            Submit
          </button>
        </div>
        <div className="signOutBlock">
          <span className="signoutIcon">
            <img src={signOut} alt="signout Button" />
          </span>
          <span className="signoutText">Signout</span>
        </div>
      </div>
    );
  }
}

export default Upload;
