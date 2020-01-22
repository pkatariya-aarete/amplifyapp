import React from "react";
import { ForgotPassword } from "aws-amplify-react";

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