import React from "react";
import { SignUp } from "aws-amplify-react";
import { Auth } from "aws-amplify";

//Register
export class CustomSignUp extends SignUp {
  constructor(props) {
    super(props);
  }
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  signUp(event) {
    if (!this.isDataValid()) {
      const { name, family_name, username, password, email } = this.state;
      window.localStorage.setItem("username", username);

      Auth.signUp({
        username,
        password,
        attributes: {
          email,
          family_name,
          name
        },
        validationData: []
      })
        .then(data => {
          console.log(data);
          super.changeState("confirmSignUp");
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

    //First Name
    if (document.getElementById("name").value.trim() === "") {
      document.getElementById("name").focus();
      msg = "Please enter first name.";
      flag = true;
    }
    //Last Name
    else if (document.getElementById("family_name").value.trim() === "") {
      document.getElementById("family_name").focus();
      msg = "Please enter last name.";
      flag = true;
    }
    //Username
    else if (document.getElementById("username").value.trim() === "") {
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
    //Password Criteria
    else if (document.getElementById("password").value.trim() != "") {
      let pwd = document.getElementById("password").value.trim();
      if (pwd.length < 8) {
        msg = "Password length should be atleast 8 characters";
        document.getElementById("password").focus();
        flag = true;
      } else if (!this.isAlphaNumeric(pwd)) {
        document.getElementById("password").focus();
        flag = true;
        msg = "Password should be alphanumeric";
      }
    }
    //Email
    else if (document.getElementById("email").value.trim() === "") {
      document.getElementById("email").focus();
      msg = "Please enter email.";
      flag = true;
    }
    //Email format
    else if (document.getElementById("email").value.trim() != "") {
      var email = document.getElementById("email").value.trim();
      if (!this.validateEmail(email)) {
        msg = "Please enter valid email format";
        flag = true;
      }
    }

    if (flag) {
      alert(msg);
    }
    return flag;
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
      <div className="signup-container">
        <div className="projectName m-bottom">
          OCR <span className="subHead">Automation App</span>
        </div>
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
              placeholder="e.g John"
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
              placeholder="e.g john.doe"
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
              placeholder="e.g john.doe@aarete.com"
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
              onChange={this.onChange}
              tabIndex="4"
            ></input>
          </div>
        </div>

        <div className="crt-account">
          <button className="createAccount" onClick={this.signUp} tabIndex="6">
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
