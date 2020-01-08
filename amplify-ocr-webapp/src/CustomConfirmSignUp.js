import React from "react";
import "./App.css";
import { ConfirmSignUp } from "aws-amplify-react";
import { Auth } from "aws-amplify";

export class CustomConfirmSignUp extends ConfirmSignUp {
  constructor(props) {
    super(props);
  }

  state = {
    username: "",
    code: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  resendCode(event) {
    const { username } = this.state;
    Auth.resendSignUp(username)
      .then(() => {
        alert("Code resent successfully");
      })
      .catch(e => {
        console.log(e);
        alert(e);
      });
  }

  confirmSignUp(event) {
    var { username, code } = this.state;

    if (!this.isDataValid()) {
      username = document.getElementById("username").value.trim();
      // After retrieving the confirmation code from the user
      Auth.confirmSignUp(username, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true
      })
        .then(data => {
          console.log(data);
          super.changeState("signIn");
        })
        .catch(err => {
          console.log(err);
          alert(err.message);
        });
    }
  }

  isDataValid() {
    var msg = "";
    var flag = false;

    //Username
    if (document.getElementById("username").value.trim() === "") {
      document.getElementById("username").focus();
      msg = "Please enter username.";
      flag = true;
    }
    //Code
    else if (document.getElementById("code").value.trim() === "") {
      document.getElementById("code").focus();
      msg = "Please enter 6 digit code.";
      flag = true;
    }
    //Check code length
    else if (document.getElementById("code").value.trim().length < 6) {
      document.getElementById("code").focus();
      msg = "Please enter valid 6 digit code.";
      flag = true;
    }

    if (flag) {
      alert(msg);
    }
    return flag;
  }

  showComponent(theme) {
    return (
      <div className="signin-container">
        <div className="projectName m-bottom">
          OCR <span className="subHead">Automation App</span>
        </div>
        <div className="page-Title">Confirm Sign Up</div>
        <div className="field-container">
          <div className="filedDevide">
            <label className="label-fields">
              Username<span className="asteric">*</span>
            </label>
            <input
              id="username"
              name="username"
              className="input-fields"
              type="text"
              placeholder="e.g John-Doe"
              value={
                window.localStorage.getItem("username") != null
                  ? window.localStorage.getItem("username")
                  : ""
              }
              onChange={this.onChange}
              readOnly
            ></input>
            <label className="label-fields">
              Confirmation Code<span className="asteric">*</span>
            </label>
            <input
              id="code"
              name="code"
              className="input-fields"
              type="password"
              placeholder="******"
              onChange={this.onChange}
            ></input>
          </div>
        </div>
        <div className="crt-account">
          <button
            className="createAccount"
            onClick={() => this.confirmSignUp()}
          >
            Confirm
          </button>
          <div className="forget-reset-cont">
            <p className="forgot-password">Lost your code?</p>
            <p
              className="secondary-link-confirm-signup link-pointer"
              onClick={() => this.resendCode()}
            >
              Resend
            </p>
          </div>
        </div>
        <div className="clear-both"></div>
        <div className="secondary-link-confirm-signup m-topreset">
          Have an account?{" "}
          <span
            className="sign-up-link graphic-regular link-pointer"
            onClick={() => super.changeState("signIn")}
            tabIndex="7"
          >
            {" "}
            Sign In{" "}
          </span>
        </div>
      </div>
    );
  }
}
