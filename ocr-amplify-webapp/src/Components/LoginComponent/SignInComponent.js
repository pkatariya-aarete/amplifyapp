import React from "react";
import { SignIn } from "aws-amplify-react";
import { Auth } from "aws-amplify";

class SignInComponent extends SignIn {
  constructor(props, context) {
    super(props, context);
    this._validAuthStates = ["signIn", "signedOut", "signedUp"];
    this.state = {
      username: "",
      password: ""
    }  
  }
  
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
            "The credentials provided are not valid. Please try logging in again.";
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
      msg = "Please enter Username.";
      flag = true;
    }
    //Password
    else if (document.getElementById("password").value.trim() === "") {
      document.getElementById("password").focus();
      msg = "Please enter Password.";
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
        <div className="page-Title">Sign in to your account</div>
        <div className="field-container">
          <div className="filedDevide">
            <label className="label-fields">
              Email<span className="asteric">*</span>
            </label>
            <input
              id="username"
              name="username"
              className="input-fields"
              type="text"
              placeholder="john.doe"
              value={this.state.username}
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
              value={this.state.password}
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

export default SignInComponent;