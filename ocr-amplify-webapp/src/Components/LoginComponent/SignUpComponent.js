import React from "react";
import { SignUp } from "aws-amplify-react";
import { Auth } from "aws-amplify";

//Register
class SignUpComponent extends SignUp {
  constructor(props) {
    super(props);
  }
  state = {
    name: '',
    family_name: '',
    username: '',
    password: '',
    email: '',
    submitBtnStatus: false
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    if (
      (this.state.name && this.state.family_name &&
      this.state.username && this.state.password &&
      this.state.email) === '') {
        this.setState({submitBtnStatus: true})
      }
    else {
      this.setState({submitBtnStatus: false})
    }
  };

  onBlurPasswordValidation = e => {
    let passInput = document.getElementById("password");
    if (passInput.classList.contains("success-password")) {
      passInput.classList.remove("success-password");
    }

    document.getElementById("passwordTooltip").style.display = "none";
  };
  onFocusPasswordValidation = e => {
    document.getElementById("passwordTooltip").style.display = "block";
  };

  onKeyUpPasswordValidation = e => {
    console.log(e)
    let pwd = e.target.value.trim();
    let flag = {
      alphabet: false,
      number: false,
      specialCharacter: false,
      length: false
    };

    //let pwdMsgElement = document.getElementById("password-error-message");

    let passwordAlphabetElement = document.getElementById("password-alphabet");
    let passwordNumberElement = document.getElementById("password-number");
    let passwordSpecialChar = document.getElementById(
      "password-specialCharacter"
    );
    let passwordLengthElement = document.getElementById("password-length");
    let passwordInputElement = document.getElementById("password");
    
    const validColor = 'valid';
    const invalidColor = 'invalid';
    //const defaulColor = 'valid';

    if (pwd.length === 0) {
      //pwdCss = validColor
      passwordAlphabetElement.classList.remove("invalid");
      passwordNumberElement.classList.remove("invalid");
      passwordSpecialChar.classList.remove("invalid");
      passwordLengthElement.classList.remove("invalid");

      passwordAlphabetElement.classList.remove("valid");
      passwordNumberElement.classList.remove("valid");
      passwordSpecialChar.classList.remove("valid");
      passwordLengthElement.classList.remove("valid");

      document.getElementById("password").classList.remove("error-password");
      document.getElementById("password").classList.remove("success-password");
    } else {
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

      let lowerCaseLetters = /[a-z]/g;
      let upperCaseLetters = /[A-Z]/g;
      if (pwd.match(lowerCaseLetters) || pwd.match(upperCaseLetters)) {
        passwordAlphabetElement.classList.remove("invalid");
        passwordAlphabetElement.classList.add("valid");
        flag.alphabet = true;
      } else {
        passwordAlphabetElement.classList.remove("valid");
        passwordAlphabetElement.classList.add("invalid");
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

      //Password Criteria
      if (
        flag.alphabet &&
        flag.number &&
        flag.length &&
        flag.specialCharacter
      ) {
        document.getElementById("password").classList.remove("error-password");
        document.getElementById("password").classList.add("success-password");
      } else {
        document
          .getElementById("password")
          .classList.remove("success-password");
        document.getElementById("password").classList.add("error-password");
      }
    }
    //return pwdCss
  };

  signUp(event) {
    if (!this.isDataValid()) {
      const { name, family_name, username, password, email } = this.state;
      Auth.signUp({
        username: email,
        password,
        attributes: {
          preferred_username: username,
          family_name,
          name
          },
        validationData: []
        }).then(data => {
          console.log(data);
          super.changeState("confirmSignUp");
        }).catch(err => {
          console.log(err);
          let msg = "";
          if (err.code === "UserLambdaValidationException") {
            if (err.message.includes("EmailAlreadyExist")) {
              msg = "The E-mail already exist. Please try again.";
            } else if (err.message.includes("InvalidEmailDomain")) {
              msg = "The E-mail address provided does not meet the domain criteria. Please try again.";
            }
          } else if (err.code === "UsernameExistsException") {
            msg = "The Username already exist. Please try again.";
          } else if (err.code === "InvalidLambdaResponseException") {
            msg = "There was some error on server side. Please try again.";
          }
          this.showAlert(msg);
        });
    }
  }

  isDataValid() {
    var msg = "";
    var flag = false;

    //First Name
    if (document.getElementById("name").value.trim() === "") {
      document.getElementById("name").focus();
      msg = "Please enter First Name.";
      flag = true;
    }
    //Last Name
    else if (document.getElementById("family_name").value.trim() === "") {
      document.getElementById("family_name").focus();
      msg = "Please enter Last Name.";
      flag = true;
    }
    //Username
    else if (document.getElementById("username").value.trim() === "") {
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
    //Password Length
    else if (document.getElementById("password").value.trim().length < 8) {
      msg =
        "Password length should be at least of 8 characters. Please try again.";
      document.getElementById("password").focus();
      flag = true;
    }
    //Password Special Character Check
    else if (
      !this.isSpecialCharacter(document.getElementById("password").value.trim())
    ) {
      document.getElementById("password").focus();
      flag = true;
      msg =
        "Password should contain at least 1 special character. Please try again.";
    }
    //Password contains alphabet
    else if (
      !this.isAlphabet(document.getElementById("password").value.trim())
    ) {
      document.getElementById("password").focus();
      flag = true;
      msg = "Password should contain at least 1 alphabet. Please try again.";
    }
    //Password contains numbers
    else if (!this.isNumber(document.getElementById("password").value.trim())) {
      document.getElementById("password").focus();
      flag = true;
      msg = "Password should contain at least 1 number. Please try again.";
    }
    //Email
    else if (document.getElementById("email").value.trim() === "") {
      document.getElementById("email").focus();
      msg = "Please enter E-mail.";
      flag = true;
    }
    //Email format
    else if (document.getElementById("email").value.trim() != "") {
      var email = document.getElementById("email").value.trim();
      if (!this.validateEmail(email)) {
        msg = "Please enter a valid E-mail format.";
        flag = true;
      } else if (!this.validateEmailDomain(email)) {
        msg =
          "The E-mail address provided does not meet the domain criteria. Please try again.";
        flag = true;
      }
    }

    if (flag) {
      this.showAlert(msg);
    }
    return flag;
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateEmailDomain(email) {
    email = email.toLowerCase();
    let emailFormat = /@aarete.com$/;
    return emailFormat.test(email);
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

  showAlert(msg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 4000);
  }

  showComponent(theme) {
    const btnCss = this.state.submitBtnStatus ? "disabled" : ""
    //const pwdCss = 'default'
    return (
      <div className="signup-container">
        <div id="snackbar">Some text some message..</div>
        <div className="page-Title"> Create a new account </div>
        <div className="field-container">
          <div className="filedDevide">
            <label className="label-fields">
              First Name <span className="asteric"> * </span>
            </label>

            <input
              id="name"
              name="name"
              className="input-fields"
              type="text"
              placeholder="John"
              value={this.state.name}
              onChange={this.onChange}
              tabIndex="1"
            ></input>

            <label className="label-fields">
              Username <span className="asteric"> * </span>
            </label>

            <input
              id="username"
              name="username"
              className="input-fields"
              type="text"
              placeholder="john.doe"
              value={this.state.username}
              onChange={this.onChange}
              tabIndex="3"
            ></input>

            <label className="label-fields">
              E-mail <span className="asteric"> * </span>{" "}
            </label>

            <input
              id="email"
              name="email"
              className="input-fields"
              type="email"
              placeholder="john.doe@aarete.com"
              value={this.state.email}
              onChange={this.onChange}
              tabIndex="5"
            ></input>
          </div>

          <div className="filedDevide">
            <label className="label-fields">
              Last Name <span className="asteric"> * </span>
            </label>

            <input
              id="family_name"
              name="family_name"
              className="input-fields"
              type="text"
              placeholder="Doe"
              value={this.state.family_name}
              onChange={this.onChange}
              tabIndex="2"
            ></input>

            <label className="label-fields">
              Password <span className="asteric">*</span>
            </label>

            <input
              id="password"
              name="password"
              className="input-fields"
              type="password"
              placeholder="******"
              value={this.state.password}
              onChange={this.onChange}
              onKeyUp={this.onKeyUpPasswordValidation}
              onBlur={this.onBlurPasswordValidation}
              onFocus={this.onFocusPasswordValidation}
              tabIndex="4"
            ></input>
            <p id="passwordTooltip">
              <div id="message">
                <span>Password must contain the following:</span>

                <p id="password-alphabet">
                  At least 1 <b>character</b>
                </p>
                <p id="password-number" class="default ">
                  At least 1 <b>number</b>
                </p>
                <p id="password-specialCharacter" class="default ">
                  At least 1 <b>special character</b>
                </p>
                <p id="password-length" class="default ">
                  Minimum length of <b>8 characters</b>
                </p>
              </div>
            </p>
            {/* <p id="password-error-message"></p> */}
          </div>
        </div>

        <div className="crt-account">
          <button
            id="signUpButton"
            className={`createAccount ${btnCss}` }
            onClick={this.signUp}
            tabIndex="6"
          >
            {" "}
            Create Account{" "}
          </button>
          <div className="signIn">
            <p className="secondary-link-signup m-topreset">
              Have an account?{" "}
              <span
                className="sign-up-link graphic-regular link-pointer"
                onClick={() => super.changeState("signIn")}
                tabIndex="7"
              >
                {" "}
                Sign In{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpComponent;