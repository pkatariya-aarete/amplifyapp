import React from "react";
import { Storage } from "aws-amplify";
import { Auth } from "aws-amplify";
import upload from "./assets/images/arrow-up.svg";
import dropbox from "./assets/images/Drag-Files.svg";
import signOut from "./assets/images/Signout-Icon.svg";
import loading from "./assets/images/loading-new.gif";
import uploaded from "./assets/images/Path.svg";
import "./assets/styles/upload.css";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      fileName: "Choose files to upload",
      fileList: [],
      uniqueList: [],
      fileDetails: [],
      revisedFiles: []
    };
  }

  uploadFile(event) {
    let files = event.target.files;

    //Logic to push uploaded files into global files array (fileDetails)
    let filesTempArray = [];
    for (let i = 0; i < files.length; i++) {
      filesTempArray.push(files[i]);
    }
    this.setState({
      fileDetails: this.state.fileDetails.concat(filesTempArray)
    });

    //Logic to show file list
    let list = [];
    for (let i = 0; i < files.length; i++) {
      list = list.concat(files[i].name);
    }

    if (this.state.fileList.length) {
      this.setState({
        fileList: this.state.fileList.concat(list)
      });
    } else {
      this.setState({
        fileList: list
      });
    }

    if (files.length) {
      document.getElementById("submit-file-msg-id").style.display = "block";
      let data = new FormData();

      data.append("file", files);
      if (this.state.fileList.length) {
        this.setState({
          fileName:
            files.length + this.state.fileList.length + "  Files Selected"
        });
      } else {
        if (files.length > 1) {
          this.setState({
            fileName: files.length + "  Files Selected"
          });
        } else {
          this.setState({
            fileName: files.length + "  File Selected"
          });
        }
      }
    } else {
      if (this.state.fileList.length) {
        this.setState({
          fileName: this.state.fileList.length + "  File Selected"
        });
      } else {
        this.setState({
          fileName: "Choose files to upload"
        });
        document.getElementById("submit-file-msg-id").style.display = "none";
      }
    }
  }

  clearAllFiles() {
    this.setState({
      fileDetails: []
    });

    this.setState({
      fileList: []
    });

    this.setState({
      fileName: "Choose files to upload"
    });

    document.getElementById("submit-file-msg-id").style.display = "none";
    document.getElementById("upload_file_status").innerHTML =
      "Press <span>Submit</span> to Upload or <span>Clear All</span> to delete all files.";
  }

  UploadFilesToS3(event) {
    var files = this.state.fileDetails;
    var filesCount = files.length;

    var docx = {
      fileFormat:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      folderPath: "dev/source-documents-docx/"
    };

    var pdf = {
      fileFormat: "application/pdf",
      folderPath: "dev/source-documents-pdf/"
    };
    var uploadFileCount = 0;
    for (var i = 0; i < filesCount; i++) {
      //file details
      var file = files[i];
      var fileName = "";
      var fileType = file.type;

      if (fileType == docx.fileFormat) {
        fileName = docx.folderPath + file.name;
      } else if (fileType == pdf.fileFormat) {
        fileName = pdf.folderPath + file.name;
      }
      document.getElementById(file.name + "_img").style.backgroundImage =
        "url(" + loading + ")";
      //Upload to S3
      Storage.put(fileName, file, {
        level: "public",
        contentType: fileType
      })
        .then(result => {
          console.log("File upload result= ", result);
          uploadFileCount++;
          var msg = uploadFileCount + " of " + filesCount + " Uploaded";
          document.getElementById("upload_file_status").innerHTML = msg;
          var tempFileName = result.key + "";
          var tempArray = tempFileName.split("/");

          if (tempArray) {
            tempFileName = tempArray[tempArray.length - 1];
            document.getElementById(
              tempFileName + "_img"
            ).style.backgroundImage = "url(" + uploaded + ")";
          }
          if (uploadFileCount == filesCount) {
            //Clear Global File Array on all files are uploaded successfully
            this.setState({
              fileDetails: []
            });

            var msg =
              "<p class='submitNote'> <span>All files are <span>uploaded successfully</span>. </p>";
            document.getElementById("upload_file_status").innerHTML = msg;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    uploadFileCount = 0;
  }

  onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  onDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  ondragleave = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  onFileDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    let droppedFilesList = [];

    let allowedFileType = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf"
    ];
    let allowedFileExtension = ["pdf", "docx"];
    let invalidFilesCount = 0;
    let validFilesCount = 0;

    if (e.dataTransfer.items.length) {
      var files = e.dataTransfer.files;

      //Update global file array
      let filesTempArray = [];
      for (let i = 0; i < files.length; i++) {
        let fileExtension = files[i].name.replace(/^.*\./, "");
        let fileType = files[i].type;

        //validation of file type
        if (
          allowedFileExtension.indexOf(fileExtension) !== -1 &&
          allowedFileType.indexOf(fileType) !== -1
        ) {
          /*Block for valid files*/

          filesTempArray.push(files[i]);
          droppedFilesList = droppedFilesList.concat(files[i].name);

          validFilesCount++;
        } else {
          /*Block for invalid files*/

          invalidFilesCount++;
        }
      }
      this.setState({
        fileDetails: this.state.fileDetails.concat(filesTempArray)
      });

      //Update file names in file list
      /* for (var i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === "file") {
          var file = e.dataTransfer.items[i].getAsFile();
          droppedFilesList = droppedFilesList.concat(file.name);
        }
      } */
      if (this.state.fileList.length) {
        this.setState({
          fileList: this.state.fileList.concat(droppedFilesList)
        });
      } else {
        this.setState({
          fileList: droppedFilesList
        });
      }

      //set selected file text
      if (this.state.fileList.length) {
        this.setState({
          fileName:
            validFilesCount + this.state.fileList.length + "  Files Selected"
        });
      } else {
        if (validFilesCount > 1) {
          this.setState({
            fileName: validFilesCount + "  Files Selected"
          });
        } else {
          this.setState({
            fileName: validFilesCount + "  File Selected"
          });
        }
      }

      //show file submit message
      document.getElementById("submit-file-msg-id").style.display = "block";
    } else {
      //Set selected file text
      this.setState({
        fileName: "Choose files to upload"
      });

      //hide file submit message
      document.getElementById("submit-file-msg-id").style.display = "none";
    }

    //Show message for invalid files
    if (invalidFilesCount) {
      let msg =
        "Found " +
        invalidFilesCount +
        " invalid files. Please upload docx or pdf files only.";
      alert(msg);
    }
  };

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  //delete File code Block
  triggerDelete(index) {
    if (window.confirm("Are you sure you want to delete this file?")) {
      let taskList = [...this.state.fileList];
      let fileName = taskList[index];
      let fileDetails = [...this.state.fileDetails];

      /*Logic to remove from fileDetails*/
      for (let i = 0; i < fileDetails.length; i++) {
        if (fileDetails[i].name == fileName) {
          fileDetails.splice(i, 1);
          break;
        }
      }

      this.setState({
        fileDetails: fileDetails
      });

      /*Logic to remove from fileList*/
      taskList.splice(index, 1);
      this.setState({
        fileList: taskList
      });

      if (taskList.length) {
        this.setState({
          fileName: taskList.length + "  File Selected"
        });
        document.getElementById("submit-file-msg-id").style.display = "block";
      } else {
        this.setState({
          fileName: "Choose files to upload"
        });

        document.getElementById("submit-file-msg-id").style.display = "none";
      }
    }
  }

  signOut() {
    Auth.signOut()
      .then(data => {
        console.log(data);
        this._validAuthStates = ["signIn"];
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div>
          <span className="helloUser">
            Hello! {window.localStorage.getItem("firstName")}
          </span>
          <div className="signOutBlock" onClick={() => this.signOut()}>
            <span className="signoutIcon">
              <img src={signOut} alt="signout Button" />
            </span>
            <span className="signoutText">Signout</span>
          </div>
        </div>
        <div className="upload-container">
          <div className="projectName m-bottom">
            OCR <span className="subHead">Automation App</span>
          </div>
          <div className="page-Title">Upload Document</div>
          <div className="field-container">
            <div className="filedDevide1">
              {/*<label className="label-fields">Upload File</label>*/}
              <input
                type="file"
                name="file"
                id="filesToS3"
                className="inputfile"
                onChange={this.uploadFile}
                multiple
                accept=".docx, .pdf"
                ref="fileUploader"
              />
              <label htmlFor="file" className="chooseFile">
                {this.state.fileName}
              </label>
              <button
                className="uploadFile"
                onClick={this.handleClick.bind(this)}
              >
                <img src={upload} alt="upload" />
              </button>
            </div>
          </div>

          <div className="file-upload" droppable="true">
            <div
              className="dropBox-component H200"
              onDragEnter={this.onDragEnter}
              onDragOver={this.onDragOver}
              onDrop={this.onFileDrop}
              onDragLeave={this.dragleave}
              droppable="true"
            >
              {this.state.fileList.length ? (
                <div>
                  {this.state.fileList.map((file, index) => {
                    return (
                      <div key={index} className="fileWrapper">
                        <p className="fileNameList" key={index}>
                          {file}
                        </p>

                        <p
                          className="deleteFile"
                          id={file + "_img"}
                          onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            this.triggerDelete(index);
                          }}
                        >
                          <span className="crossButton">
                            <img src="" />
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="dropBox-component align-center">
                  <img src={dropbox} alt="dropfile" className="dropImg"></img>
                  <p>Drop your files here</p>
                </div>
              )}
            </div>
          </div>
          <div className="submit-file-msg" id="submit-file-msg-id">
            <p className="submitNote" id="upload_file_status">
              Press <span>Submit</span> to Upload or <span>Clear All</span> to
              delete all files.
            </p>
          </div>
          <div className="crt-account">
            <button
              id="submitBtn"
              className={`createAccountUpload ${
                this.state.fileDetails.length ? "activeBtn" : "disabled"
              }`}
              onClick={() => this.UploadFilesToS3()}
            >
              Submit
            </button>

            <button className="clearAll" onClick={() => this.clearAllFiles()}>
              CLEAR ALL
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
