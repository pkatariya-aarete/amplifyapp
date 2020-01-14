/* eslint-disable-line */ const aws = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider(
    { apiVersion: "2016-04-18" }
  );
  const params = {
    UserPoolId: event.userPoolId,
    AttributesToGet: [],
    Filter: 'email="' + event.request.userAttributes.email + '"'
  };

  try {
    cognitoidentityserviceprovider.listUsers(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
        var userList = data;
        if (userList.Users.length > 0) {
          callback(new Error("EmailAlreadyExist", event));
        } else {
          callback(null, event);
        }
      }
    });
  } catch (e) {
    callback(null, e);
  }
};
