(this["webpackJsonpocr-amplify-webapp"]=this["webpackJsonpocr-amplify-webapp"]||[]).push([[0],{118:function(e,t,a){e.exports=a.p+"static/media/arrow-up.a7b7c045.svg"},119:function(e,t,a){e.exports=a.p+"static/media/Drag-Files.ed75c0ac.svg"},120:function(e,t,a){e.exports=a.p+"static/media/Signout-Icon.ca31ce0d.svg"},121:function(e,t,a){e.exports=a.p+"static/media/ocrbg.eba89b75.png"},124:function(e,t,a){e.exports=a(538)},129:function(e,t,a){},535:function(e,t,a){},536:function(e,t,a){},537:function(e,t,a){},538:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),l=a(112),i=a.n(l),o=(a(129),a(22)),c=a(23),r=a(24),d=a(9),m=a(25),u=a(19),p={aws_project_region:"us-east-1",aws_content_delivery_bucket:"aarete-ocr-webapp-dev",aws_content_delivery_bucket_region:"us-east-1",aws_content_delivery_url:"http://aarete-ocr-webapp-dev.s3-website-us-east-1.amazonaws.com",aws_cognito_identity_pool_id:"us-east-1:5aa323df-8619-491a-9e9c-3c0621ddffd1",aws_cognito_region:"us-east-1",aws_user_pools_id:"us-east-1_B9Go5OZBv",aws_user_pools_web_client_id:"70ea1b05rfnj266csm536g5k61",oauth:{},aws_user_files_s3_bucket:"aarete-ocr-documentswebapp-dev",aws_user_files_s3_bucket_region:"us-east-1"},g=a(33),f=a(29),h=a(18),v=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(r.a)(this,Object(d.a)(t).call(this,e))).state={username:"",password:""},a.onChange=function(e){a.setState(Object(g.a)({},e.target.name,e.target.value));var t=document.getElementById("username");document.getElementById("password").value.trim().length&&t.value.trim().length?document.getElementById("signInButton").classList.remove("disabled"):document.getElementById("signInButton").classList.contains("disabled")||document.getElementById("signInButton").classList.add("disabled")},a._validAuthStates=["signIn","signedOut","signedUp"],a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"signIn",value:function(e){var a=this,s=this.state,n=s.username,l=s.password;this.isDataValid()||h.a.signIn({username:n,password:l}).then((function(e){var s=e.attributes.name;window.localStorage.setItem("firstName",s),Object(f.a)(Object(d.a)(t.prototype),"changeState",a).call(a,"signedIn")})).catch((function(e){console.log(e);a.showAlert("The credentials provided are not valid. <br/>Please try logging in again.")}))}},{key:"isDataValid",value:function(){var e="",t=!1;return""===document.getElementById("username").value.trim()?(document.getElementById("username").focus(),e="Please enter username.",t=!0):""===document.getElementById("password").value.trim()&&(document.getElementById("password").focus(),e="Please enter password.",t=!0),t&&this.showAlert(e),t}},{key:"showAlert",value:function(e){var t=document.getElementById("snackbar");t.innerHTML=e,t.className="show",setTimeout((function(){t.className=t.className.replace("show","")}),4e3)}},{key:"showComponent",value:function(e){var a=this;return n.a.createElement("div",{className:"signin-container"},n.a.createElement("div",{id:"snackbar"},"Some text some message.."),n.a.createElement("div",{className:"projectName m-bottom"},"OCR ",n.a.createElement("span",{className:"subHead"},"Automation App")),n.a.createElement("div",{className:"page-Title"},"Sign in to your account"),n.a.createElement("div",{className:"field-container"},n.a.createElement("div",{className:"filedDevide"},n.a.createElement("label",{className:"label-fields"},"Username",n.a.createElement("span",{className:"asteric"},"*")),n.a.createElement("input",{id:"username",name:"username",className:"input-fields",type:"text",placeholder:"john.doe",onChange:this.onChange}),n.a.createElement("label",{className:"label-fields"},"Password",n.a.createElement("span",{className:"asteric"},"*")),n.a.createElement("input",{id:"password",name:"password",className:"input-fields",type:"password",placeholder:"******",onChange:this.onChange}))),n.a.createElement("div",{className:"crt-account"},n.a.createElement("button",{id:"signInButton",className:"createAccount login disabled",onClick:function(){return a.signIn()}},"Login"),n.a.createElement("div",{className:"forget-reset-cont"},n.a.createElement("p",{className:"forgot-password"},"Forget Password?"),n.a.createElement("p",{className:"reset-password link-pointer",onClick:function(){return Object(f.a)(Object(d.a)(t.prototype),"changeState",a).call(a,"forgotPassword")}},"Reset"))),n.a.createElement("div",{className:"clear-both"}),n.a.createElement("div",{className:"sign-up-link link-pointer",onClick:function(){return Object(f.a)(Object(d.a)(t.prototype),"changeState",a).call(a,"signUp")}},"Sign Up"))}}]),t}(u.e),E=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(r.a)(this,Object(d.a)(t).call(this,e))).state={firstName:"",lastName:"",username:"",password:"",email:""},a.onChange=function(e){a.setState(Object(g.a)({},e.target.name,e.target.value));var t=document.getElementById("name"),s=document.getElementById("family_name"),n=document.getElementById("email"),l=document.getElementById("password");document.getElementById("username").value.trim().length&&l.value.trim().length&&t.value.trim().length&&s.value.trim().length&&n.value.trim().length?document.getElementById("signUpButton").classList.remove("disabled"):document.getElementById("signUpButton").classList.contains("disabled")||document.getElementById("signUpButton").classList.add("disabled")},a.onBlurPasswordValidation=function(e){var t=document.getElementById("password");t.classList.contains("success-password")&&t.classList.remove("success-password"),document.getElementById("passwordTooltip").style.display="none"},a.onFocusPasswordValidation=function(e){document.getElementById("passwordTooltip").style.display="block"},a.onKeyUpPasswordValidation=function(e){var t=e.target.value.trim(),a={alphabet:!1,number:!1,specialCharacter:!1,length:!1},s=document.getElementById("password-alphabet"),n=document.getElementById("password-number"),l=document.getElementById("password-specialCharacter"),i=document.getElementById("password-length"),o=document.getElementById("password");t.match(/[a-z]/g)||t.match(/[A-Z]/g)?(s.classList.remove("invalid"),s.classList.add("valid"),a.alphabet=!0):(s.classList.remove("valid"),s.classList.add("invalid"));t.match(/[0-9]/g)?(n.classList.remove("invalid"),n.classList.add("valid"),a.number=!0):(n.classList.remove("valid"),n.classList.add("invalid"));t.match(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)?(l.classList.remove("invalid"),l.classList.add("valid"),a.specialCharacter=!0):(l.classList.add("invalid"),l.classList.remove("valid")),t.length>=8?(o.focus(),i.classList.remove("invalid"),i.classList.add("valid"),a.length=!0):(o.focus(),i.classList.remove("valid"),i.classList.add("invalid")),""!=t&&(a.alphabet&&a.number&&a.length&&a.specialCharacter?(document.getElementById("password").classList.remove("error-password"),document.getElementById("password").classList.add("success-password")):(document.getElementById("password").classList.remove("success-password"),document.getElementById("password").classList.add("error-password")))},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"signUp",value:function(e){var a=this;if(!this.isDataValid()){var s=this.state,n=s.name,l=s.family_name,i=s.username,o=s.password,c=s.email;window.localStorage.setItem("username",i),h.a.signUp({username:i,password:o,attributes:{email:c,family_name:l,name:n},validationData:[]}).then((function(e){console.log(e),Object(f.a)(Object(d.a)(t.prototype),"changeState",a).call(a,"confirmSignUp")})).catch((function(e){if(console.log(e),"UserLambdaValidationException"===e.code){var t="";e.message.includes("EmailAlreadyExist")?(t="The email already exist, please try again",a.showAlert(t)):e.message.includes("InvalidEmailDomain")&&(t="The email address provided does not meet the domain criteria. <br/>Please try again.",a.showAlert(t))}else if("UsernameExistsException"===e.code){a.showAlert("Username already exist!")}}))}}},{key:"isDataValid",value:function(){var e="",t=!1;if(""===document.getElementById("name").value.trim())document.getElementById("name").focus(),e="Please enter first name.",t=!0;else if(""===document.getElementById("family_name").value.trim())document.getElementById("family_name").focus(),e="Please enter last name.",t=!0;else if(""===document.getElementById("username").value.trim())document.getElementById("username").focus(),e="Please enter username.",t=!0;else if(""===document.getElementById("password").value.trim())document.getElementById("password").focus(),e="Please enter password.",t=!0;else if(document.getElementById("password").value.trim().length<8)e="Password length should be atleast 8 characters",document.getElementById("password").focus(),t=!0;else if(this.isSpecialCharacter(document.getElementById("password").value.trim()))if(this.isAlphabet(document.getElementById("password").value.trim()))if(this.isNumber(document.getElementById("password").value.trim())){if(""===document.getElementById("email").value.trim())document.getElementById("email").focus(),e="Please enter email.",t=!0;else if(""!=document.getElementById("email").value.trim()){var a=document.getElementById("email").value.trim();this.validateEmail(a)||(e="Please enter valid email format.",t=!0)}}else document.getElementById("password").focus(),t=!0,e="Password should contain atleast 1 number. Please try again.";else document.getElementById("password").focus(),t=!0,e="Password should contain atleast 1 alphabet. Please try again.";else document.getElementById("password").focus(),t=!0,e="Password should contain atleast 1 special characters. Please try again.";return t&&this.showAlert(e),t}},{key:"validateEmail",value:function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}},{key:"isSpecialCharacter",value:function(e){return/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e)}},{key:"isAlphabet",value:function(e){return!(!/[a-z]/g.test(e)&&!/[A-Z]/g.test(e))}},{key:"isNumber",value:function(e){return/[0-9]/g.test(e)}},{key:"showAlert",value:function(e){var t=document.getElementById("snackbar");t.innerHTML=e,t.className="show",setTimeout((function(){t.className=t.className.replace("show","")}),4e3)}},{key:"showComponent",value:function(e){var a=this;return n.a.createElement("div",{className:"signup-container"},n.a.createElement("div",{id:"snackbar"},"Some text some message.."),n.a.createElement("div",{className:"projectName m-bottom"},"OCR ",n.a.createElement("span",{className:"subHead"},"Automation App")),n.a.createElement("div",{className:"page-Title"}," Create a new account "),n.a.createElement("div",{className:"field-container"},n.a.createElement("div",{className:"filedDevide"},n.a.createElement("label",{className:"label-fields"},"First Name ",n.a.createElement("span",{className:"asteric"}," * ")),n.a.createElement("input",{id:"name",name:"name",className:"input-fields",type:"text",placeholder:"John",onChange:this.onChange,tabIndex:"1"}),n.a.createElement("label",{className:"label-fields"},"Username ",n.a.createElement("span",{className:"asteric"}," * ")),n.a.createElement("input",{id:"username",name:"username",className:"input-fields",type:"text",placeholder:"john.doe",onChange:this.onChange,tabIndex:"3"}),n.a.createElement("label",{className:"label-fields"},"E-mail ",n.a.createElement("span",{className:"asteric"}," * ")," "),n.a.createElement("input",{id:"email",name:"email",className:"input-fields",type:"email",placeholder:"john.doe@aarete.com",onChange:this.onChange,tabIndex:"5"})),n.a.createElement("div",{className:"filedDevide"},n.a.createElement("label",{className:"label-fields"},"Last Name ",n.a.createElement("span",{className:"asteric"}," * ")),n.a.createElement("input",{id:"family_name",name:"family_name",className:"input-fields",type:"text",placeholder:"Doe",onChange:this.onChange,tabIndex:"2"}),n.a.createElement("label",{className:"label-fields"},"Password ",n.a.createElement("span",{className:"asteric"},"*")),n.a.createElement("input",{id:"password",name:"password",className:"input-fields",type:"password",placeholder:"******",onChange:this.onChange,onKeyUp:this.onKeyUpPasswordValidation,onBlur:this.onBlurPasswordValidation,onFocus:this.onFocusPasswordValidation,tabIndex:"4"}),n.a.createElement("p",{id:"passwordTooltip"},n.a.createElement("div",{id:"message"},n.a.createElement("span",null,"Password must contain the following:"),n.a.createElement("p",{id:"password-alphabet",class:"invalid"},"Atleast 1 ",n.a.createElement("b",null,"character")),n.a.createElement("p",{id:"password-number",class:"invalid"},"Atleast 1 ",n.a.createElement("b",null,"number")),n.a.createElement("p",{id:"password-specialCharacter",class:"invalid"},"Atleast 1 ",n.a.createElement("b",null,"special characters")),n.a.createElement("p",{id:"password-length",class:"invalid"},"Minimum length ",n.a.createElement("b",null,"8 characters")))))),n.a.createElement("div",{className:"crt-account"},n.a.createElement("button",{id:"signUpButton",className:"createAccount disabled",onClick:this.signUp,tabIndex:"6"}," ","Create Account"," "),n.a.createElement("div",{className:"signIn"},n.a.createElement("p",{className:"secondary-link-signup m-topreset"},"Have an account?"," ",n.a.createElement("span",{className:"sign-up-link graphic-regular link-pointer",onClick:function(){return Object(f.a)(Object(d.a)(t.prototype),"changeState",a).call(a,"signIn")},tabIndex:"7"}," ","Sign In"," ")))))}}]),t}(u.f),y=function(e){function t(){var e,a;Object(o.a)(this,t);for(var s=arguments.length,n=new Array(s),l=0;l<s;l++)n[l]=arguments[l];return(a=Object(r.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(n)))).state={username:"",code:"",new_password:""},a.onChange=function(e){a.setState(Object(g.a)({},e.target.name,e.target.value));var t=document.getElementById("username"),s=document.getElementById("rpwd-code"),n=document.getElementById("rpwd-new_password");t.value.trim().length?document.getElementById("btn-sendCode").classList.remove("disabled"):document.getElementById("btn-sendCode").classList.contains("disabled")||document.getElementById("btn-sendCode").classList.add("disabled"),s.value.trim().length&&n.value.trim().length?document.getElementById("btn-resetPassword").classList.remove("disabled"):document.getElementById("btn-resetPassword").classList.contains("disabled")||document.getElementById("btn-resetPassword").classList.add("disabled")},a.onBlurPasswordValidation=function(e){var t=document.getElementById("rpwd-new_password");t.classList.contains("success-password")&&t.classList.remove("success-password"),document.getElementById("passwordTooltip").style.display="none"},a.onFocusPasswordValidation=function(e){document.getElementById("passwordTooltip").style.display="block"},a.onKeyUpPasswordValidation=function(e){var t=e.target.value.trim(),a={alphabet:!1,number:!1,specialCharacter:!1,length:!1},s=document.getElementById("password-alphabet"),n=document.getElementById("password-number"),l=document.getElementById("password-specialCharacter"),i=document.getElementById("password-length"),o=document.getElementById("rpwd-new_password");t.match(/[a-z]/g)||t.match(/[A-Z]/g)?(s.classList.remove("invalid"),s.classList.add("valid"),a.alphabet=!0):(s.classList.remove("valid"),s.classList.add("invalid"));t.match(/[0-9]/g)?(n.classList.remove("invalid"),n.classList.add("valid"),a.number=!0):(n.classList.remove("valid"),n.classList.add("invalid"));t.match(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)?(l.classList.remove("invalid"),l.classList.add("valid"),a.specialCharacter=!0):(l.classList.add("invalid"),l.classList.remove("valid")),t.length>=8?(o.focus(),i.classList.remove("invalid"),i.classList.add("valid"),a.length=!0):(o.focus(),i.classList.remove("valid"),i.classList.add("invalid")),""!=t&&(a.alphabet&&a.number&&a.length&&a.specialCharacter?(document.getElementById("rpwd-new_password").classList.remove("error-password"),document.getElementById("rpwd-new_password").classList.add("success-password")):(document.getElementById("rpwd-new_password").classList.remove("success-password"),document.getElementById("rpwd-new_password").classList.add("error-password")))},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"sendCodeforgotPassword",value:function(e){var t=this;if(!this.isDataValid(1)){var a=this.state.username;h.a.forgotPassword(a).then((function(e){console.log(e),t.hideUsername()})).catch((function(e){console.log(e),"UserNotFoundException"===e.code?(t.showAlert("User not found!"),document.getElementById("username").focus()):t.showAlert(e.message)}))}}},{key:"resetPassword",value:function(e){var a=this;if(!this.isDataValid(2)){var s=this.state,n=s.username,l=s.code,i=s.new_password;h.a.forgotPasswordSubmit(n,l,i).then((function(e){console.log(e),Object(f.a)(Object(d.a)(t.prototype),"changeState",a).call(a,"signIn")})).catch((function(e){console.log(e),"CodeMismatchException"===e.code?(a.showAlert("Code not matched! Please enter correct code"),document.getElementById("rpwd-code").focus()):"InvalidParameterException"===e.code?a.showAlert("Must have length greater then or equal to 6"):a.showAlert(e.message)}))}}},{key:"hideUsername",value:function(){var e=document.getElementById("forgot-password-new-password-section"),t=document.getElementById("btn-sendCode"),a=document.getElementById("btn-resetPassword");document.getElementById("forgot-password-confirmation-code-section").style.display="none",t.style.display="none",e.style.display="block",a.style.display="block"}},{key:"isDataValid",value:function(e){var t="",a=!1;switch(e){case 1:""==document.getElementById("username").value.trim()&&(document.getElementById("username").focus(),t="Please enter username.",a=!0);break;case 2:if(""==document.getElementById("rpwd-code").value.trim())document.getElementById("rpwd-code").focus(),t="Please enter code.",a=!0;else if(6!==document.getElementById("rpwd-code").value.trim().length)document.getElementById("rpwd-code").focus(),t="Reset code should be 6 digit.",a=!0;else if(""==document.getElementById("rpwd-new_password").value.trim())document.getElementById("rpwd-new_password").focus(),t="Please enter password.",a=!0;else if(this.isSpecialCharacter(document.getElementById("rpwd-new_password").value.trim()))document.getElementById("password").focus(),a=!0,t="Special characters are not allowed in password.";else if(""!=document.getElementById("rpwd-new_password").value.trim()){var s=document.getElementById("rpwd-new_password").value.trim();s.length<8?(t="Password length should be atleast 8 characters",document.getElementById("rpwd-new_password").focus(),a=!0):this.isAlphaNumeric(s)||(document.getElementById("rpwd-new_password").focus(),a=!0,t="Password should be alphanumeric")}}return a&&this.showAlert(t),a}},{key:"isSpecialCharacter",value:function(e){var t,a,s;for(a=0,s=e.length;a<s;a++)if(!((t=e.charCodeAt(a))>47&&t<58)&&!(t>64&&t<91)&&!(t>96&&t<123))return!0;return!1}},{key:"isSpecialCharacter",value:function(e){return/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e)}},{key:"isAlphabet",value:function(e){return!(!/[a-z]/g.test(e)&&!/[A-Z]/g.test(e))}},{key:"isNumber",value:function(e){return/[0-9]/g.test(e)}},{key:"isAlphaNumeric",value:function(e){var t,a,s,n=!1,l=!1;for(a=0,s=e.length;a<s;a++)if((t=e.charCodeAt(a))>47&&t<58)n=!0;else if(t>64&&t<91||t>96&&t<123)l=!0;else if(!(t>47&&t<58)&&!(t>64&&t<91)&&!(t>96&&t<123))return!1;return!(!l||!n)}},{key:"showAlert",value:function(e){var t=document.getElementById("snackbar");t.innerHTML=e,t.className="show",setTimeout((function(){t.className=t.className.replace("show","")}),4e3)}},{key:"showComponent",value:function(e){var a=this;return n.a.createElement("div",{className:"signin-container"},n.a.createElement("div",{id:"snackbar"},"Some text some message.."),n.a.createElement("div",{className:"projectName m-bottom"},"OCR ",n.a.createElement("span",{className:"subHead"},"Automation App")),n.a.createElement("div",{className:"page-Title"},"Reset your password"),n.a.createElement("div",{className:"field-container"},n.a.createElement("div",{className:"filedDevide"},n.a.createElement("div",{id:"forgot-password-confirmation-code-section"},n.a.createElement("label",{className:"label-fields"},"Username",n.a.createElement("span",{className:"asteric"},"*")),n.a.createElement("input",{id:"username",name:"username",className:"input-fields",type:"text",placeholder:"john.deo",onChange:this.onChange})),n.a.createElement("div",{id:"forgot-password-new-password-section"},n.a.createElement("label",{className:"label-fields"},"Reset Code",n.a.createElement("span",{className:"asteric"},"*")),n.a.createElement("input",{className:"input-fields",id:"rpwd-code",name:"code",type:"password",placeholder:"******",onChange:this.onChange}),n.a.createElement("label",{className:"label-fields"},"New Password",n.a.createElement("span",{className:"asteric"},"*")),n.a.createElement("input",{className:"input-fields",id:"rpwd-new_password",name:"new_password",type:"password",placeholder:"******",onChange:this.onChange,onKeyUp:this.onKeyUpPasswordValidation,onBlur:this.onBlurPasswordValidation,onFocus:this.onFocusPasswordValidation}),n.a.createElement("p",{id:"passwordTooltip",class:"reset-password-passwordTooltip"},n.a.createElement("div",{id:"message"},n.a.createElement("span",null,"Password must contain the following:"),n.a.createElement("p",{id:"password-alphabet",class:"invalid"},"Atleast 1 ",n.a.createElement("b",null,"character")),n.a.createElement("p",{id:"password-number",class:"invalid"},"Atleast 1 ",n.a.createElement("b",null,"number")),n.a.createElement("p",{id:"password-specialCharacter",class:"invalid"},"Atleast 1 ",n.a.createElement("b",null,"special characters")),n.a.createElement("p",{id:"password-length",class:"invalid"},"Minimum length ",n.a.createElement("b",null,"8 characters"))))))),n.a.createElement("div",{className:"crt-account"},n.a.createElement("button",{id:"btn-sendCode",className:"createAccount disabled ",onClick:function(){return a.sendCodeforgotPassword()}},"Send code"),n.a.createElement("button",{id:"btn-resetPassword",className:"createAccount disabled ",onClick:function(){return a.resetPassword()}},"Reset Password"),n.a.createElement("div",{className:"forget-reset-cont"},n.a.createElement("p",{className:"secondary-link-reset-password m-topreset"},"Back to",n.a.createElement("span",{className:"sign-up-link graphic-regular link-pointer",onClick:function(){return Object(f.a)(Object(d.a)(t.prototype),"changeState",a).call(a,"signIn")}}," ","Sign In")))),n.a.createElement("div",{className:"clear-both"}))}}]),t}(u.c),w=(a(58),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(r.a)(this,Object(d.a)(t).call(this,e))).state={username:"",code:""},a.onChange=function(e){a.setState(Object(g.a)({},e.target.name,e.target.value)),document.getElementById("code").value.trim().length?document.getElementById("confirmButton").classList.remove("disabled"):document.getElementById("confirmButton").classList.contains("disabled")||document.getElementById("confirmButton").classList.add("disabled")},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"resendCode",value:function(e){var t=this,a=this.state.username;h.a.resendSignUp(a).then((function(){t.showAlert("Code resent successfully")})).catch((function(e){console.log(e),t.showAlert(e)}))}},{key:"confirmSignUp",value:function(e){var a=this,s=this.state,n=s.username,l=s.code;this.isDataValid()||(n=document.getElementById("username").value.trim(),h.a.confirmSignUp(n,l,{forceAliasCreation:!0}).then((function(e){console.log(e),Object(f.a)(Object(d.a)(t.prototype),"changeState",a).call(a,"signIn")})).catch((function(e){console.log(e),a.showAlert(e.message)})))}},{key:"isDataValid",value:function(){var e="",t=!1;return""===document.getElementById("username").value.trim()?(document.getElementById("username").focus(),e="Please enter username.",t=!0):""===document.getElementById("code").value.trim()?(document.getElementById("code").focus(),e="Please enter 6 digit code.",t=!0):document.getElementById("code").value.trim().length<6&&(document.getElementById("code").focus(),e="Please enter valid 6 digit code.",t=!0),t&&this.showAlert(e),t}},{key:"showAlert",value:function(e){var t=document.getElementById("snackbar");t.innerHTML=e,t.className="show",setTimeout((function(){t.className=t.className.replace("show","")}),4e3)}},{key:"showComponent",value:function(e){var a,s=this;return n.a.createElement("div",{className:"signin-container"},n.a.createElement("div",{id:"snackbar"},"Some text some message.."),n.a.createElement("div",{className:"projectName m-bottom"},"OCR ",n.a.createElement("span",{className:"subHead"},"Automation App")),n.a.createElement("div",{className:"page-Title"},"Confirm Sign Up"),n.a.createElement("div",{className:"field-container"},n.a.createElement("div",{className:"filedDevide"},n.a.createElement("label",{className:"label-fields"},"Username",n.a.createElement("span",{className:"asteric"},"*")),n.a.createElement("input",{id:"username",name:"username",className:"input-fields",type:"text",placeholder:"John-Doe",value:null!=window.localStorage.getItem("username")?window.localStorage.getItem("username"):"",onChange:this.onChange,readOnly:!0}),n.a.createElement("label",{className:"label-fields"},"Confirmation Code",n.a.createElement("span",{className:"asteric"},"*")),n.a.createElement("input",{id:"code",name:"code",className:"input-fields",type:"password",placeholder:"******",onChange:this.onChange}))),n.a.createElement("div",{className:"crt-account"},n.a.createElement("button",(a={className:"createAccount disabled",id:"confirmButton"},Object(g.a)(a,"className","createAccount disabled"),Object(g.a)(a,"onClick",(function(){return s.confirmSignUp()})),a),"Confirm"),n.a.createElement("div",{className:"forget-reset-cont"},n.a.createElement("p",{className:"forgot-password"},"Lost your code?"),n.a.createElement("p",{className:"secondary-link-confirm-signup link-pointer",onClick:function(){return s.resendCode()}},"Resend"))),n.a.createElement("div",{className:"clear-both"}),n.a.createElement("div",{className:"secondary-link-confirm-signup m-topreset"},"Have an account?"," ",n.a.createElement("span",{className:"sign-up-link graphic-regular link-pointer",onClick:function(){return Object(f.a)(Object(d.a)(t.prototype),"changeState",s).call(s,"signIn")},tabIndex:"7"}," ","Sign In"," ")))}}]),t}(u.b)),b=a(67),N=a(43),I=a(118),B=a.n(I),C=a(119),k=a.n(C),L=a(120),S=a.n(L),_=(a(535),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(r.a)(this,Object(d.a)(t).call(this,e))).onDragOver=function(e){e.preventDefault(),e.stopPropagation()},a.onDragEnter=function(e){e.preventDefault(),e.stopPropagation()},a.ondragleave=function(e){e.preventDefault(),e.stopPropagation()},a.onFileDrop=function(e){e.preventDefault(),e.stopPropagation();var t=[],s=["application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/pdf"],n=["pdf","docx"],l=0,i=0;if(e.dataTransfer.items.length){for(var o=e.dataTransfer.files,c=[],r=0;r<o.length;r++){var d=o[r].name.replace(/^.*\./,""),m=o[r].type;-1!==n.indexOf(d)&&-1!==s.indexOf(m)?(c.push(o[r]),t=t.concat(o[r].name),i++):l++}a.setState({fileDetails:a.state.fileDetails.concat(c)}),a.state.fileList.length?a.setState({fileList:a.state.fileList.concat(t)}):a.setState({fileList:t}),a.state.fileList.length?a.setState({fileName:i+a.state.fileList.length+"  Files Selected"}):i>1?a.setState({fileName:i+"  Files Selected"}):a.setState({fileName:i+"  File Selected"}),document.getElementById("submit-file-msg-id").style.display="block",document.getElementById("upload_file_status").innerHTML="Press <span>Submit</span> to Upload or <span>Clear All</span> to delete all files."}else a.setState({fileName:"Choose files to upload"}),document.getElementById("submit-file-msg-id").style.display="none";if(l){var u=l+" file(s) have an invalid format. Please ensure all files are either in DOCX or PDF format.";a.showAlert(u)}},a.confirmBoxClickNo=function(e){var t=document.getElementById("confirmBoxPopupId");t.style.visibility="hidden",t.style.opacity="0"},a.uploadFile=a.uploadFile.bind(Object(N.a)(a)),a.handleClick=a.handleClick.bind(Object(N.a)(a)),a.deleteFileIndex=0,a.state={fileName:"Choose files to upload",fileList:[],uniqueList:[],fileDetails:[],revisedFiles:[]},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"uploadFile",value:function(e){for(var t=e.target.files,a=[],s=0;s<t.length;s++)a.push(t[s]);this.setState({fileDetails:this.state.fileDetails.concat(a)});for(var n=[],l=0;l<t.length;l++)n=n.concat(t[l].name);(this.state.fileList.length?this.setState({fileList:this.state.fileList.concat(n)}):this.setState({fileList:n}),t.length)?(document.getElementById("submit-file-msg-id").style.display="block",(new FormData).append("file",t),this.state.fileList.length?this.setState({fileName:t.length+this.state.fileList.length+"  Files Selected"}):t.length>1?this.setState({fileName:t.length+"  Files Selected"}):this.setState({fileName:t.length+"  File Selected"})):this.state.fileList.length?this.setState({fileName:this.state.fileList.length+"  File Selected"}):(this.setState({fileName:"Choose files to upload"}),document.getElementById("submit-file-msg-id").style.display="none")}},{key:"clearAllFiles",value:function(){this.setState({fileDetails:[]}),this.setState({fileList:[]}),this.setState({fileName:"Choose files to upload"}),document.getElementById("submit-file-msg-id").style.display="none"}},{key:"UploadFilesToS3",value:function(e){for(var t=this,a=this.state.fileDetails,s=a.length,n="application/vnd.openxmlformats-officedocument.wordprocessingml.document",l="dev/source-documents-docx/",i="application/pdf",o="dev/source-documents-pdf/",c=0,r=0;r<s;r++){var d=a[r],m="",u=d.type;u==n?m=l+d.name:u==i&&(m=o+d.name),document.getElementById(d.name+"_img").classList.remove("deleteFile"),document.getElementById(d.name+"_img").classList.add("loadingFile"),h.b.put(m,d,{level:"public",contentType:u}).then((function(e){console.log("File upload result= ",e);var a=++c+" of "+s+" Uploaded";document.getElementById("upload_file_status").innerHTML=a;var n=e.key+"",l=n.split("/");if(l&&(n=l[l.length-1],document.getElementById(n+"_img").classList.remove("loadingFile"),document.getElementById(n+"_img").classList.add("uploadedFile")),c==s){t.setState({fileDetails:[]});a="<p class='submitNote'> <span>All files are <span>uploaded successfully</span>. </p>";document.getElementById("upload_file_status").innerHTML=a}})).catch((function(e){console.log(e)}))}c=0}},{key:"handleClick",value:function(e){this.refs.fileUploader.click()}},{key:"triggerDelete",value:function(e){for(var t=Object(b.a)(this.state.fileList),a=t[e],s=Object(b.a)(this.state.fileDetails),n=0;n<s.length;n++)if(s[n].name==a){s.splice(n,1);break}if(this.setState({fileDetails:s}),t.splice(e,1),this.setState({fileList:t}),t.length){if(this.setState({fileName:t.length+"  File Selected"}),document.getElementById("submit-file-msg-id").style.display="block",1===document.getElementsByClassName("deleteFile").length){document.getElementById("upload_file_status").innerHTML="<p class='submitNote'> <span>All files are <span>uploaded successfully</span>. </p>"}}else this.setState({fileName:"Choose files to upload"}),document.getElementById("submit-file-msg-id").style.display="none";this.confirmBoxClickNo()}},{key:"signOut",value:function(){var e=this;h.a.signOut().then((function(t){console.log(t),e._validAuthStates=["signIn"],window.location.reload()})).catch((function(e){return console.log(e)}))}},{key:"showAlert",value:function(e){var t=document.getElementById("snackbar");t.innerHTML=e,t.className="show",setTimeout((function(){t.className=t.className.replace("show","")}),4e3)}},{key:"showConfirmationBox",value:function(e){var t=document.getElementById("confirmBoxPopupId");document.getElementById("confirmBoxPopupId-content").innerHTML="Are you sure you want to delete this file?",t.style.visibility="visible",t.style.opacity="1",this.deleteFileIndex=e}},{key:"confirmBoxClickYes",value:function(){var e=this.deleteFileIndex;this.triggerDelete(e)}},{key:"render",value:function(){var e=this;return n.a.createElement("div",null,n.a.createElement("div",{id:"snackbar"},"Some text some message.."),n.a.createElement("div",{id:"confirmBoxPopupId",class:"overlay"},n.a.createElement("div",{class:"popup"},n.a.createElement("a",{class:"close",href:"#",onClick:function(){return e.confirmBoxClickNo()}},"\xd7"),n.a.createElement("div",{id:"confirmBoxPopupId-content",class:"content"},"Are you sure you want to delete this file?"),n.a.createElement("div",{id:"buttons"},n.a.createElement("button",{id:"cancelBtn",onClick:function(){return e.confirmBoxClickNo()}},"No"),n.a.createElement("button",{id:"yesBtn",onClick:function(){return e.confirmBoxClickYes()}},"Yes")))),n.a.createElement("div",null,n.a.createElement("span",{className:"helloUser"},"Hello! ",window.localStorage.getItem("firstName")),n.a.createElement("div",{className:"signOutBlock",onClick:function(){return e.signOut()}},n.a.createElement("span",{className:"signoutIcon"},n.a.createElement("img",{src:S.a,alt:"signout Button"})),n.a.createElement("span",{className:"signoutText"},"Signout"))),n.a.createElement("div",{className:"upload-container"},n.a.createElement("div",{className:"projectName projectName-upload m-bottom"},"OCR ",n.a.createElement("span",{className:"subHead"},"Automation App")),n.a.createElement("div",{className:"page-Title"},"Upload Document"),n.a.createElement("div",{className:"field-container"},n.a.createElement("div",{className:"filedDevide1"},n.a.createElement("input",{type:"file",name:"file",id:"filesToS3",className:"inputfile",onChange:this.uploadFile,multiple:!0,accept:".docx, .pdf",ref:"fileUploader"}),n.a.createElement("label",{htmlFor:"file",className:"chooseFile"},this.state.fileName),n.a.createElement("button",{className:"uploadFile",onClick:this.handleClick.bind(this)},n.a.createElement("img",{src:B.a,alt:"upload"})))),n.a.createElement("div",{className:"file-upload",droppable:"true"},n.a.createElement("div",{className:"dropBox-component H200",onDragEnter:this.onDragEnter,onDragOver:this.onDragOver,onDrop:this.onFileDrop,onDragLeave:this.dragleave,droppable:"true"},this.state.fileList.length?n.a.createElement("div",null,this.state.fileList.map((function(t,a){return n.a.createElement("div",{key:a,className:"fileWrapper"},n.a.createElement("p",{className:"fileNameList",key:a},t),n.a.createElement("p",{className:"fileStatus deleteFile",id:t+"_img",onClick:function(t){t.stopPropagation(),t.preventDefault(),e.showConfirmationBox(a)}},n.a.createElement("span",{className:"crossButton"},n.a.createElement("img",{src:""}))))}))):n.a.createElement("div",{className:"dropBox-component align-center"},n.a.createElement("img",{src:k.a,alt:"dropfile",className:"dropImg"}),n.a.createElement("p",null,"Drop your files here")))),n.a.createElement("div",{className:"submit-file-msg",id:"submit-file-msg-id"},n.a.createElement("p",{className:"submitNote",id:"upload_file_status"},"Press ",n.a.createElement("span",null,"Submit")," to Upload or ",n.a.createElement("span",null,"Clear All")," to delete all files.")),n.a.createElement("div",{className:"crt-account"},n.a.createElement("button",{id:"submitBtn",className:"createAccountUpload ".concat(this.state.fileDetails.length?"activeBtn":"disabled"),onClick:function(){return e.UploadFilesToS3()}},"Submit"),n.a.createElement("button",{className:"clearAll",onClick:function(){return e.clearAllFiles()}},"CLEAR ALL"))))}}]),t}(n.a.Component));h.c.configure(p);var O=function(e){function t(e,a){return Object(o.a)(this,t),Object(r.a)(this,Object(d.a)(t).call(this,e,a))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return"signedIn"===this.props.authState?n.a.createElement("div",null,n.a.createElement(_,null)):null}}]),t}(n.a.Component),A=(a(536),a(537),a(121)),j={width:"100%",height:"100%",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundImage:"url(".concat(a.n(A).a,")"),position:"absolute"},P=function(e){function t(e,a){return Object(o.a)(this,t),Object(r.a)(this,Object(d.a)(t).call(this,e,a))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"App",style:j},n.a.createElement(u.a,{hide:[u.e,u.f,u.c,u.b,u.d],amplifyConfig:p,authState:"signIn"},n.a.createElement(v,null),n.a.createElement(E,null),n.a.createElement(y,null),n.a.createElement(w,null),n.a.createElement(O,null)))}}]),t}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},56:function(e,t){},58:function(e,t,a){}},[[124,1,2]]]);
//# sourceMappingURL=main.21f724f4.chunk.js.map