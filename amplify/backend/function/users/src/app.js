/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authOcramplifywebapp1908e8daUserPoolId = process.env.AUTH_OCRAMPLIFYWEBAPP1908E8DA_USERPOOLID

Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/users', function(req, res) {
  // Add your code here
  var query = req.query
  var params = {
    UserPoolId: query.UserPoolId,
    AttributesToGet: [
      'STRING_VALUE',
      /* more items */
    ],
    //Filter: 'STRING_VALUE',
    //Limit: 'NUMBER_VALUE',
    //PaginationToken: 'STRING_VALUE'
  };
  var cognitoIDP = new AWS.CognitoIdentityServiceProvider();
  var users = null
  users = await cognitoIDP.listUsers(params).promise();
  if (users === null) {
    console.log('No Users Found!')
    res.json({success: true, message:'Users Found!', data:users});
  } else {
    res.json({success: false, message:'No Users Found!', data:users});
  }
});

/****************************
* Example post method *
****************************/

app.post('/users', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/users', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/users', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
