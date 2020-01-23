import React from "react";

class LoginComponent extends React.Component {
  constructor(props, context){
    super(props, context)
  }

//  routeAuth(authState) {
//    console.log(authState)
//    switch(authState) {
//      case 'signIn':
//        return <SignInComponent />
//      case 'signUp':
//        return <SignUpComponent />
//      case 'ConfirmSignUp':
//        return <SignUpConfimationComponent />
//      case 'ForgotPassword':
//        return <ForgotPasswordComponent />
//      default:
//        return null
//    }
//  }

  render() {
    const { authState } = this.props
    return(
      <Authenticator amplifyConfig={config} hideDefault={true} >  
        <SignInComponent />
        <SignUpComponent />
        <SignUpConfimationComponent />
        <ForgotPasswordComponent />
      </Authenticator>
    )
  }
}

export default LoginComponent;