import React from "react";
import { ConfirmSignUp } from "aws-amplify-react";
import { Auth } from "aws-amplify";

class SignUpConfimationComponent extends ConfirmSignUp {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    code: ''
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    let code = document.getElementById("code");
    if (code.value.trim().length) {
      document.getElementById("confirmButton").classList.remove("disabled");
    } else {
      if (
        !document.getElementById("confirmButton").classList.contains("disabled")
      ) {
        document.getElementById("confirmButton").classList.add("disabled");
      }
    }
  };

  resendCode(event) {
    const { email } = this.state;
    Auth.resendSignUp(email)
      .then(() => {
        this.showAlert("Code resent successfully");
      })
      .catch(e => {
        console.log(e);
        this.showAlert(e);
      });
  }

  confirmSignUp(event) {
    const { email, code } = this.state;
    let username = email
    if (!this.isDataValid()) {
      // After retrieving the confirmation code from the user
      Auth.confirmSignUp(username, code, {
        forceAliasCreation: true
      })
        .then(data => {
          console.log(data);
          super.changeState("signIn");
        })
        .catch(err => {
          console.log(err);
          this.showAlert(err.message);
        });
    }
  }

  isDataValid() {
    var msg = "";
    var flag = false;

    //email
    if (document.getElementById("email").value.trim() === "") {
      document.getElementById("email").focus();
      msg = "Please enter email.";
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
        <div className="page-Title">Confirm Sign Up</div>
        <div className="field-container">
          <div className="filedDevide">
            <label className="label-fields">
              email<span className="asteric">*</span>
            </label>
            <input
              id="email"
              name="email"
              className="input-fields"
              type="text"
              placeholder="John-Doe"
              value={ this.state.email }
              onChange={this.onChange}
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
            className="createAccount disabled"
            id="confirmButton"
            className="createAccount disabled"
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

export default SignUpConfimationComponent;