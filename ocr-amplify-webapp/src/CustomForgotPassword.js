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

    let username = document.getElementById("username");
    let code = document.getElementById("rpwd-code");
    let new_password = document.getElementById("rpwd-new_password");
    if (username.value.trim().length) {
      document.getElementById("btn-sendCode").classList.remove("disabled");
    } else {
      if (
        !document.getElementById("btn-sendCode").classList.contains("disabled")
      ) {
        document.getElementById("btn-sendCode").classList.add("disabled");
      }
    }

    if (code.value.trim().length && new_password.value.trim().length) {
      document.getElementById("btn-resetPassword").classList.remove("disabled");
    } else {
      if (
        !document
          .getElementById("btn-resetPassword")
          .classList.contains("disabled")
      ) {
        document.getElementById("btn-resetPassword").classList.add("disabled");
      }
    }
  };

  onBlurPasswordValidation = e => {
    let passInput = document.getElementById("rpwd-new_password");
    if (passInput.classList.contains("success-password")) {
      passInput.classList.remove("success-password");
    }

    document.getElementById("passwordTooltip").style.display = "none";
  };

  onFocusPasswordValidation = e => {
    document.getElementById("passwordTooltip").style.display = "block";
  };

  onKeyUpPasswordValidation = e => {
    let pwd = e.target.value.trim();

    let flag = {
      alphabet: false,
      number: false,
      specialCharacter: false,
      length: false
    };

    //let passwordAlphabetElement = document.getElementById("password-alphabet");
    let passwordNumberElement = document.getElementById("password-number");
    let passwordSpecialChar = document.getElementById(
      "password-specialCharacter"
    );
    let passwordLengthElement = document.getElementById("password-length");
    let passwordInputElement = document.getElementById("rpwd-new_password");

    if (pwd.length === 0) {
      //passwordAlphabetElement.classList.remove("invalid");
      passwordNumberElement.classList.remove("invalid");
      passwordSpecialChar.classList.remove("invalid");
      passwordLengthElement.classList.remove("invalid");

      //passwordAlphabetElement.classList.remove("valid");
      passwordNumberElement.classList.remove("valid");
      passwordSpecialChar.classList.remove("valid");
      passwordLengthElement.classList.remove("valid");

      //document.getElementById("rpwd-new_password").classList.remove("error-password");
      //document.getElementById("rpwd-new_password").classList.remove("success-password");
    } else {
      let lowerCaseLetters = /[a-z]/g;
      let upperCaseLetters = /[A-Z]/g;
      if (pwd.match(lowerCaseLetters) || pwd.match(upperCaseLetters)) {
        //passwordAlphabetElement.classList.remove("invalid");
        //passwordAlphabetElement.classList.add("valid");
        flag.alphabet = true;
      } else {
        //passwordAlphabetElement.classList.remove("valid");
        //passwordAlphabetElement.classList.add("invalid");
      }

      let numbers = /[0-9]/g;
      if (pwd.match(numbers)) {
        passwordNumberElement.classList.remove("invalid");
        passwordNumberElement.classList.add("valid");
        flag.number = true;
      } else {
        passwordNumberElement.classList.remove("valid");
        passwordNumberElement.classList.add("invalid");
      }

      let specialCharaterFormat = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if (pwd.match(specialCharaterFormat)) {
        passwordSpecialChar.classList.remove("invalid");
        passwordSpecialChar.classList.add("valid");
        flag.specialCharacter = true;
      } else {
        passwordSpecialChar.classList.add("invalid");
        passwordSpecialChar.classList.remove("valid");
      }

      if (pwd.length >= 8) {
        passwordInputElement.focus();
        passwordLengthElement.classList.remove("invalid");
        passwordLengthElement.classList.add("valid");
        flag.length = true;
      } else {
        passwordInputElement.focus();
        passwordLengthElement.classList.remove("valid");
        passwordLengthElement.classList.add("invalid");
      }

      //Password Criteria
      if (
        flag.alphabet &&
        flag.number &&
        flag.length &&
        flag.specialCharacter
      ) {
        //document.getElementById("rpwd-new_password").classList.remove("error-password");
        document
          .getElementById("rpwd-new_password")
          .classList.add("success-password");
      } else {
        document
          .getElementById("rpwd-new_password")
          .classList.remove("success-password");
        //document.getElementById("rpwd-new_password").classList.add("error-password");
      }
    }
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
            this.showAlert("The Username doesn't exist. Please try again.");
            document.getElementById("username").focus();
          } else {
            this.showAlert(err.message);
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
            this.showAlert(
              "Code does not matched. Please enter the correct code."
            );
            document.getElementById("rpwd-code").focus();
          } else if (err.code === "InvalidParameterException") {
            this.showAlert("Code must have length equal to 6.");
          } else {
            console.log(err.message);
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
          msg = "Please enter Username.";
          flag = true;
        }
        break;
      case 2:
        //Code
        if (document.getElementById("rpwd-code").value.trim() == "") {
          document.getElementById("rpwd-code").focus();
          msg = "Please enter Code.";
          flag = true;
        }
        //Code length should be 8
        else if (
          document.getElementById("rpwd-code").value.trim().length !== 6
        ) {
          document.getElementById("rpwd-code").focus();
          msg = "Reset Code should be 6 digits.";
          flag = true;
        }
        //Password
        else if (
          document.getElementById("rpwd-new_password").value.trim() == ""
        ) {
          document.getElementById("rpwd-new_password").focus();
          msg = "Please enter Password.";
          flag = true;
        }
        //Password Criteria
        else if (
          document.getElementById("rpwd-new_password").value.trim() != ""
        ) {
          let pwd = document.getElementById("rpwd-new_password").value.trim();
          if (pwd.length < 8) {
            msg =
              "Password length should be at least 8 character. Please try again.";
            document.getElementById("rpwd-new_password").focus();
            flag = true;
          }
          //Password Special Character Check
          else if (!this.isSpecialCharacter(pwd)) {
            document.getElementById("rpwd-new_password").focus();
            flag = true;
            msg =
              "Password should contain at least 1 special character. Please try again.";
          }
          //Password contains alphabet
          else if (!this.isAlphabet(pwd)) {
            document.getElementById("rpwd-new_password").focus();
            flag = true;
            msg =
              "Password should contain atleast 1 alphabet. Please try again.";
          }
          //Password contains numbers
          else if (!this.isNumber(pwd)) {
            document.getElementById("rpwd-new_password").focus();
            flag = true;
            msg = "Password should contain atleast 1 number. Please try again.";
          }
        }
        break;
    }

    if (flag) {
      this.showAlert(msg);
    }
    return flag;
  }

  isSpecialCharacter(str) {
    let specialCharaterFormat = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return specialCharaterFormat.test(str);
  }

  isAlphabet(str) {
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let specialCharaterFormat = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (lowerCaseLetters.test(str) || upperCaseLetters.test(str)) {
      return true;
    }

    return false;
  }

  isNumber(str) {
    let numbers = /[0-9]/g;
    return numbers.test(str);
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
                placeholder="john.deo"
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
                onKeyUp={this.onKeyUpPasswordValidation}
                onBlur={this.onBlurPasswordValidation}
                onFocus={this.onFocusPasswordValidation}
              ></input>
              <p id="passwordTooltip" class="reset-password-passwordTooltip">
                <div id="message">
                  <span>Password must contain the following:</span>

                  {/* <p id="password-alphabet" class="default ">
                    Atleast 1 <b>character</b>
                  </p> */}
                  <p id="password-number" class="default">
                    At least 1 <b>number</b>
                  </p>
                  <p id="password-specialCharacter" class="default">
                    At least 1 <b>special character</b>
                  </p>
                  <p id="password-length" class="default">
                    Minimum length of <b>8 characters</b>
                  </p>
                </div>
              </p>
            </div>
          </div>
        </div>
        <div className="crt-account">
          <button
            id="btn-sendCode"
            className="createAccount disabled "
            onClick={() => this.sendCodeforgotPassword()}
          >
            Send code
          </button>

          <button
            id="btn-resetPassword"
            className="createAccount disabled "
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
