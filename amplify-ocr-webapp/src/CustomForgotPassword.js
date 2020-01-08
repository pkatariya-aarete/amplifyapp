import React from "react";
import { ForgotPassword } from "aws-amplify-react";
import { Auth } from "aws-amplify";

export class CustomForgotPassword extends ForgotPassword {
  state = {
    username: "",
    code: "",
    new_password: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  sendCodeforgotPassword(event) {
    if (!this.isDataValid(1)) {
      const { username } = this.state;

      Auth.forgotPassword(username)
        .then(data => {
          console.log(data);

          this.hideUsername();
        })
        .catch(err => {
          console.log(err);

          if (err.code === "UserNotFoundException") {
            alert("User not found!");
            document.getElementById("username").focus();
          } else {
            alert(err.message);
          }
        });
    }
  }

  resetPassword(event) {
    if (!this.isDataValid(2)) {
      const { username, code, new_password } = this.state;

      // Collect confirmation code and new password, then
      Auth.forgotPasswordSubmit(username, code, new_password)
        .then(data => {
          console.log(data);
          super.changeState("signIn");
        })
        .catch(err => {
          console.log(err);

          if (err.code === "CodeMismatchException") {
            alert("Code not matched! Please enter correct code");
            document.getElementById("rpwd-code").focus();
          } else if (err.code === "InvalidParameterException") {
            alert("Must have length greater then or equal to 6");
          } else {
            alert(err.message);
          }
        });
    }
  }

  hideUsername() {
    //Elements
    var showDiv = document.getElementById(
      "forgot-password-new-password-section"
    );
    var btnSendCode = document.getElementById("btn-sendCode");
    var btnResetPassword = document.getElementById("btn-resetPassword");
    var hideDiv = document.getElementById(
      "forgot-password-confirmation-code-section"
    );

    hideDiv.style.display = "none";
    btnSendCode.style.display = "none";

    showDiv.style.display = "block";
    btnResetPassword.style.display = "block";
  }

  isDataValid(type) {
    var msg = "";
    var flag = false;
    switch (type) {
      case 1:
        if (document.getElementById("username").value.trim() == "") {
          document.getElementById("username").focus();
          msg = "Please enter username.";
          flag = true;
        }
        break;
      case 2:
        //Code
        if (document.getElementById("rpwd-code").value.trim() == "") {
          document.getElementById("rpwd-code").focus();
          msg = "Please enter code.";
          flag = true;
        }
        //Code length should be 8
        else if (
          document.getElementById("rpwd-code").value.trim().length !== 6
        ) {
          document.getElementById("rpwd-code").focus();
          msg = "Reset code should be 6 digit.";
          flag = true;
        }
        //Password
        else if (
          document.getElementById("rpwd-new_password").value.trim() == ""
        ) {
          document.getElementById("rpwd-new_password").focus();
          msg = "Please enter password.";
          flag = true;
        }
        //Password Criteria
        else if (
          document.getElementById("rpwd-new_password").value.trim() != ""
        ) {
          let pwd = document.getElementById("rpwd-new_password").value.trim();
          if (pwd.length < 8) {
            msg = "Password length should be atleast 8 characters";
            document.getElementById("rpwd-new_password").focus();
            flag = true;
          } else if (!this.isAlphaNumeric(pwd)) {
            document.getElementById("rpwd-new_password").focus();
            flag = true;
            msg = "Password should be alphanumeric";
          }
        }
        break;
    }

    if (flag) {
      alert(msg);
    }
    return flag;
  }

  isAlphaNumeric(str) {
    var code, i, len;
    let numFlag = false;
    let charFlag = false;

    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);

      //set flag if numeric
      if (code > 47 && code < 58) {
        numFlag = true;
      }
      //set flag if alphabet
      else if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
        charFlag = true;
      } else if (
        !(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)
      ) {
        // lower alpha (a-z)
        return false;
      }
    }
    if (charFlag && numFlag) {
      return true;
    } else {
      return false;
    }
  }

  showComponent(theme) {
    return (
      <div className="signin-container">
        <div className="projectName m-bottom">
          OCR <span className="subHead">Automation App</span>
        </div>
        <div className="page-Title">Reset your password</div>
        <div className="field-container">
          <div className="filedDevide">
            <div id="forgot-password-confirmation-code-section">
              <label className="label-fields">
                Username<span className="asteric">*</span>
              </label>
              <input
                id="username"
                name="username"
                className="input-fields"
                type="text"
                placeholder="e.g john.deo"
                onChange={this.onChange}
              ></input>
            </div>

            <div id="forgot-password-new-password-section">
              <label className="label-fields">
                Reset Code<span className="asteric">*</span>
              </label>
              <input
                className="input-fields"
                id="rpwd-code"
                name="code"
                type="password"
                placeholder="******"
                onChange={this.onChange}
              ></input>
              <label className="label-fields">
                New Password<span className="asteric">*</span>
              </label>
              <input
                className="input-fields"
                id="rpwd-new_password"
                name="new_password"
                type="password"
                placeholder="******"
                onChange={this.onChange}
              ></input>
            </div>
          </div>
        </div>
        <div className="crt-account">
          <button
            id="btn-sendCode"
            className="createAccount "
            onClick={() => this.sendCodeforgotPassword()}
          >
            Send code
          </button>

          <button
            id="btn-resetPassword"
            className="createAccount "
            onClick={() => this.resetPassword()}
          >
            Reset Password
          </button>

          <div className="forget-reset-cont">
            <p className="secondary-link-reset-password m-topreset">
              Back to
              <span
                className="sign-up-link graphic-regular link-pointer"
                onClick={() => super.changeState("signIn")}
              >
                {" "}
                Sign In
              </span>
            </p>
          </div>
        </div>
        <div className="clear-both"></div>
      </div>
    );
  }
}
