import React from "react";
import { ForgotPassword } from "aws-amplify-react";
import { Auth } from "aws-amplify";

class NavBarComponent extends ForgotPassword {
  render(){
    return(
      <div className="projectName m-bottom">
        OCR <span className="subHead">Automation App</span>
      </div>
    )
  }
}

export default NavBarComponent;