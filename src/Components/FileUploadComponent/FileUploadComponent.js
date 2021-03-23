import React from "react";
import { Storage } from "aws-amplify";
import upload from "./assets/arrow-up.svg";
import dropbox from "./assets/Drag-Files.svg";
import "./assets/upload.css";
import {Link} from 'react-router-dom';

class FileUploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteFileIndex = 0;
    this.state = {
      fileName: "Choose files",
      fileList: [],
      uniqueList: [],
      fileDetails: [],
      revisedFiles: [],
      url:'',
      successMsg:false,
    };
  }

  getUrl(event){
    if(event.target.value !== ''){
      this.setState({url: event.target.value})
    }
  }
 

           

  ShowMessage(){
    setTimeout(() => {
      this.setState({successMsg: true});
    }, 2000)
    // setTimeout(function(){ 
    //   let msg =
    //             "<p className='submitNoteNew'> <span>File <span>uploaded successfully</span> <span class='uploadFilesBlock'><Link class='viewResultsHyperlink' to='/results'>view results</Link></span> </p>";
    //           document.getElementById("showMessage").innerHTML = msg;
    //  }, 3000);
  }
  uploadFile(event) {
    let files = event.target.files;
    let filesTempArray = [];
    let list = [];
    let validFileCount = 0;
    let duplicateFileCount = 0;

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        //duplicate file check
        let file = files[i];
        if (!this.state.fileList.includes(file.name)) {
          list = list.concat(files[i].name);

          filesTempArray.push(files[i]);

          validFileCount++;
        } else {
          duplicateFileCount++;
          console.log("Duplicate file : " + file.name);
        }
      }

      //Logic to push uploaded files into global files array (fileDetails)
      this.setState({
        fileDetails: this.state.fileDetails.concat(filesTempArray)
      });

      //Logic to show file list
      if (this.state.fileList.length) {
        this.setState({
          fileList: this.state.fileList.concat(list)
        });
      } else {
        this.setState({
          fileList: list
        });
      }

      document.getElementById("upload_file_status").innerHTML =
        "Press <span>Submit</span> to Upload or <span>Clear All</span> to delete all files.";
      document.getElementById("submit-file-msg-id").style.display = "block";

      if (this.state.fileList.length) {
        this.setState({
          fileName:
            validFileCount + this.state.fileList.length + "  Files Selected"
        });
      } else {
        if (files.length > 1) {
          this.setState({
            fileName: validFileCount + "  Files Selected"
          });
        } else {
          this.setState({
            fileName: validFileCount + "  File Selected"
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
          fileName: "Choose files"
        });
        document.getElementById("submit-file-msg-id").style.display = "none";
      }
    }

    if (duplicateFileCount) {
      this.showAlert(
        duplicateFileCount +
          " file(s) is duplicate. Please try uploading new files."
      );
    }

    //clear files from input type file
    event.target.value = "";
  }

  clearAllFiles() {
    this.setState({
      fileDetails: []
    });

    this.setState({
      fileList: []
    });

    this.setState({
      fileName: "Choose files"
    });

    document.getElementById("submit-file-msg-id").style.display = "none";
  }

  UploadFilesToS3(event) {
   
    var files = this.state.fileDetails;
    var filesCount = files.length;

    var docx = {
      fileFormat:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      folderPath: "dev/result-excel/client-groups/cg1/"
    };

    var pdf = {
      fileFormat: "application/pdf",
      folderPath: "dev/result-excel/client-groups/cg1/"
    };
    var uploadFileCount = 0;
    for (var i = 0; i < filesCount; i++) {
      //file details
      var file = files[i];
      var fileName = "";
      var fileType = file.type;

      if (fileType === docx.fileFormat) {
        fileName = docx.folderPath + file.name;
      } else if (fileType === pdf.fileFormat) {
        fileName = pdf.folderPath + file.name;
      }

      //Show Loading Image
      document
        .getElementById(file.name + "_img")
        .classList.remove("deleteFile");
      document.getElementById(file.name + "_img").classList.add("loadingFile");

      //Upload to S3
      Storage.put(fileName, file, {
        customPrefix: { public: '' },
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

            //Show uploaded img

            document
              .getElementById(tempFileName + "_img")
              .classList.remove("loadingFile");
            document
              .getElementById(tempFileName + "_img")
              .classList.add("uploadedFile");
          }
          if (uploadFileCount === filesCount) {
            //Clear Global File Array on all files are uploaded successfully
            this.setState({
              fileDetails: []
            });

            let msg =
              "<p className='submitNote'> <span>All files are <span>uploaded successfully</span>. </p>";
            document.getElementById("upload_file_status").innerHTML = msg;
          }
        })
        .catch(err => {
          console.log(err);
          this.showAlert("There was error in uploading files to server.");
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
    let duplicateFilesCount = 0;

    if (e.dataTransfer.items.length) {
      var files = e.dataTransfer.files;

      //Update global file array
      let filesTempArray = [];
      for (let i = 0; i < files.length; i++) {
        let fileExtension = files[i].name.replace(/^.*\./, "");
        let fileType = files[i].type;
        let fileName = files[i].name;

        //validation of file type
        if (
          allowedFileExtension.indexOf(fileExtension) !== -1 &&
          allowedFileType.indexOf(fileType) !== -1
        ) {
          if (!this.state.fileList.includes(fileName)) {
            //valid files
            filesTempArray.push(files[i]);
            droppedFilesList = droppedFilesList.concat(files[i].name);
            validFilesCount++;
          } else {
            //duplicate files
            duplicateFilesCount++;
          }
        } else {
          //Invalid format files
          invalidFilesCount++;
        }
      }
      this.setState({
        fileDetails: this.state.fileDetails.concat(filesTempArray)
      });

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
      //if (this.state.fileDetails.length === 0) {
      document.getElementById("upload_file_status").innerHTML =
        "Press <span>Submit</span> to Upload or <span>Clear All</span> to delete all files.";
      //}
    } else {
      //Set selected file text
      this.setState({
        fileName: "Choose files"
      });

      //hide file submit message
      document.getElementById("submit-file-msg-id").style.display = "none";
    }

    //Show message for invalid files
    if (invalidFilesCount || duplicateFilesCount) {
      let msg = "";
      if (invalidFilesCount > 0 && duplicateFilesCount === 0) {
        msg =
          invalidFilesCount +
          " file(s) have an invalid format. Please ensure all files are either in DOCX or PDF format.";
      } else if (invalidFilesCount === 0 && duplicateFilesCount > 0) {
        msg =
          duplicateFilesCount +
          " file(s) already exist. Please ensure you upload new files.";
      } else {
        msg =
          invalidFilesCount +
          duplicateFilesCount +
          " file(s) have an invalid format or they are duplicate. Please ensure all files are new and are either in DOCX or PDF format.";
      }
      this.showAlert(msg);
    }
  };

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  //delete File code Block
  triggerDelete(index) {
    let taskList = [...this.state.fileList];
    let fileName = taskList[index];
    let fileDetails = [...this.state.fileDetails];

    /*Logic to remove from fileDetails*/
    for (let i = 0; i < fileDetails.length; i++) {
      if (fileDetails[i].name === fileName) {
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

      //Logic to show file status message when last file is deleted
      if (document.getElementsByClassName("deleteFile").length === 1) {
        var msg =
          "<p className='submitNote'> <span>All files are <span>uploaded successfully</span>. </p>";
        document.getElementById("upload_file_status").innerHTML = msg;
      }
    } else {
      this.setState({
        fileName: "Choose files"
      });

      document.getElementById("submit-file-msg-id").style.display = "none";
    }

    this.confirmBoxClickNo();
  }

  

  showAlert(msg) {
    let x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 4000);
  }

  showConfirmationBox(index) {
    let popup = document.getElementById("confirmBoxPopupId");
    let contentElement = document.getElementById("confirmBoxPopupId-content");
    contentElement.innerHTML = "Are you sure you want to delete this file?";
    popup.style.visibility = "visible";
    popup.style.opacity = "1";
    this.deleteFileIndex = index;
  }
  confirmBoxClickYes() {
    let index = this.deleteFileIndex;
    this.triggerDelete(index);
  }

  confirmBoxClickNo = e => {
    let popup = document.getElementById("confirmBoxPopupId");
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
  };

  render() {
    return (
      <div>
        <div id="snackbar">Some text some message..</div>
        <div id="confirmBoxPopupId" className="overlay">
          <div className="popup">
            <a className="close" href="#" onClick={() => this.confirmBoxClickNo()}>
              &times;
            </a>
            <div id="confirmBoxPopupId-content" className="content">
              Are you sure you want to delete this file?
            </div>
            <div id="buttons">
              <button id="cancelBtn" onClick={() => this.confirmBoxClickNo()}>
                No
              </button>
              <button id="yesBtn" onClick={() => this.confirmBoxClickYes()}>
                Yes
              </button>
            </div>
          </div>
        </div>
        <div className="upload-container">
        <div className="page-Title">Upload Document</div>
        <div className="">
          <div className="field-container">
          <p className="labelTitle">Document Type</p>
          <p className="labelTitle">Clause</p>
            <select className="appendixDropdown">
              <option>Appendix A</option>
              <option>Appendix B</option>
              <option>Appendix C</option>
              <option>Appendix D</option>
            </select>

            <input type="text" className="EnterClause"></input>
  
            <div className="filedDevide1" style={{display:'none'}}>
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
          </div>
          <div className="file-upload" droppable="true">
            <div
              className="dropBox-component H250"
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
                          className="fileStatus deleteFile"
                          id={file + "_img"}
                          onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            this.showConfirmationBox(index);
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
                  <p>Drop your files here or <span className="uploadFilesBlock" onClick={this.handleClick.bind(this)}>Upload Files</span></p>
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
          <div className="testLable">
            <p className="labelTitle upDoc">Document URL</p>
            {/* <p className="labelTitle upDoc">Clause</p> */}
            {/* <input type="text" className="EnterClause"></input> */}
          </div>
          <div>
            <input type="text" className="inputURL" onChange={(event) => this.getUrl(event)}/>
            <div id="showMessage" style={{float:'left'}}>
              {this.state.successMsg ?
              <p className='submitNoteNew'> <span>File <span>uploaded successfully,</span> <span className='uploadFilesBlock'><a className='viewResultsHyperlink' href='/results' >view results.</a></span> </span></p>
              :''}
            </div>
          </div>
          

          <div className="crt-account">
            <button
              id="submitBtn"
               className={`createAccountUpload ${
                this.state.url!== '' ? "activeBtn" : "disabled"
              }`}
              // className={`createAccountUpload ${
              //   this.state.fileDetails.length ? "activeBtn" : "disabled"
              // }`}
              // onClick={() => this.UploadFilesToS3()}
              onClick={() => this.ShowMessage()}
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

export default FileUploadComponent;
