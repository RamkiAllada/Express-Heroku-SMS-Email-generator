var express = require('express');
var router = express.Router();
// send grid email addon
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

var requestJSON = require("request-json");
var url = require("url");

var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: {
    personalizations: [
      {
        to: [
          {
            email: 'tempram@mailinator.com',
          },
        ],
        subject: 'Hello World from the SendGrid Node.js Library!',
      },
    ],
    from: {
      email: 'app159386653@heroku.com',
    },
    content: [
      {
        type: 'text/plain',
        value: 'Hello, Email!',
      },
    ],
  },
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('in to the rigger email');
  //With promise
  sg.API(request)
    .then(response => {
      console.log('in to response');
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    })
    .catch(error => {
      //error is an instance of SendGridError
      //The full response is attached to error.response
      console.log(error.response.statusCode);
      console.log('in to error 22222');
    });

  // With callback
  sg.API(request, function (error, response) {
    if (error) {
      console.log('Error response received');
    }
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
  
  var TILL_URL = url.parse(process.env.TILL_URL);
  var TILL_BASE = TILL_URL.protocol + "//" + TILL_URL.host;
  var TILL_PATH = TILL_URL.pathname;
  
  if(TILL_URL.query != null) {
    TILL_PATH += "?"+TILL_URL.query;
  }
  
  requestJSON.createClient(TILL_BASE).post(TILL_PATH, {
    "phone": ["9492526302"],
    "text": "Hello Heroku!"
  }, function(err, ress, body) {
    return console.log(ress.statusCode);
  });
  res.send('respond with a resource');
});

module.exports = router;

