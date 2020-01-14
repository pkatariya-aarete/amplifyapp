import React from "react";
import { SignIn } from "aws-amplify-react";
import { Auth } from "aws-amplify";

export class CustomSignIn extends SignIn {
  constructor(props) {
    super(props);
    this._validAuthStates = ["signIn", "signedOut", "signedUp"];
  }

  state = {
    username: "",
    password: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    let password = document.getElementById("username");
    let username = document.getElementById("password");
    if (username.value.trim().length && password.value.trim().length) {
      document.getElementById("signInButton").classList.remove("disabled");
    } else {
      if (
        !document.getElementById("signInButton").classList.contains("disabled")
      ) {
        document.getElementById("signInButton").classList.add("disabled");
      }
    }
  };

  signIn(event) {
    const { username, password } = this.state;

    if (!this.isDataValid()) {
      Auth.signIn({
        username,
        password
      })
        .then(user => {
          let firstName = user["attributes"]["name"];
          window.localStorage.setItem("firstName", firstName);
          super.changeState("signedIn");
        })
        .catch(err => {
          console.log(err);
          let msg =
            "The credentials provided are not valid. <br/>Please try logging in again.";
          this.showAlert(msg);
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
    //Password
    else if (document.getElementById("password").value.trim() === "") {
      document.getElementById("password").focus();
      msg = "Please enter password.";
      flag = true;
    }

    if (flag) {
      this.showAlert(msg);
    }
    return flag;
  }

  showAlert(msg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 4000);
  }

  showComponent(theme) {
    return (
      <div className="signin-container">
        <div id="snackbar">Some text some message..</div>
        <div className="projectName m-bottom">
          OCR <span className="subHead">Automation App</span>
        </div>
        <div className="page-Title">Sign in to your account</div>

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
              placeholder="john.doe"
              onChange={this.onChange}
            ></input>
            <label className="label-fields">
              Password<span className="asteric">*</span>
            </label>
            <input
              id="password"
              name="password"
              className="input-fields"
              type="password"
              placeholder="******"
              onChange={this.onChange}
            ></input>
          </div>
        </div>

        <div className="crt-account">
          <button
            id="signInButton"
            className="createAccount login disabled"
            onClick={() => this.signIn()}
          >
            Login
          </button>
          <div className="forget-reset-cont">
            <p className="forgot-password">Forget Password?</p>
            <p
              className="reset-password link-pointer"
              onClick={() => super.changeState("forgotPassword")}
            >
              Reset
            </p>
          </div>
        </div>
        <div className="clear-both"></div>
        <div
          className="sign-up-link link-pointer"
          onClick={() => super.changeState("signUp")}
        >
          Sign Up
        </div>
      </div>
    );
  }
}
