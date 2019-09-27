const http = require('http'); // pull in the http server module
const url = require('url'); // pull in the url module
// pull in the query string module
const query = require('querystring');
// pull in our html response handler file
const htmlHandler = require('./htmlResponses.js');
// pull in our json response handler file
const jsonHandler = require('./jsonResponses.js');

// set the port. process.env.PORT and NODE_PORT are for servers like heroku
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// key:value object to look up URL routes to specific functions

const handlePost = (request, response, parsedUrl) => {
  // handles errors
  if (parsedUrl.pathname === '/addUser') {
    const body = [];

    request.on('error', () => {
      response.statusCode = 400; // bad request status code
      response.end();
    });


    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString(); // makes it a string
      const bodyParams = query.parse(bodyString); // makes it a jsonObject
      jsonHandler.addUser(request, response, bodyParams);
    });
  }
};

const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response, parsedUrl);
  } else if (parsedUrl.pathname === '/getUsersHead') {
    jsonHandler.getUsersHead(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.notReal(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.notRealHead(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

// handle HTTP requests. In node the HTTP server will automatically
// send this function request and pre-filled response objects.
const onRequest = (request, response) => {
  // parse the url using the url module
  // This will let us grab any section of the URL by name
  const parsedUrl = url.parse(request.url);

  // check if the path name (the /name part of the url) matches
  // any in our url object. If so call that function. If not, default to index.
  // if (urlStruct[parsedUrl.pathname]) {
  //   urlStruct[parsedUrl.pathname](request, response);
  // } else {
  //   urlStruct.notFound(request, response);
  // }


  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

// start HTTP server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
