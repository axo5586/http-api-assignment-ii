
const users = {};


// function to send a json object
const respondJSON = (request, response, status, object) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': 'application/json' });
  // stringify the object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  response.write(JSON.stringify(object));
  // Send the response to the client
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// function for getting users
const getUsers = (request, response) => {
  // message to send
  const responseJSON = {
    users,
    message: 'getUsers with GET',
  };

  // set our error message
  responseJSON.message = 'Created Successfully';

  // give the error a consistent id
  responseJSON.id = 'Success';

  // return our json with a 200 bad request code
  return respondJSON(request, response, 200, responseJSON);
};

// function for getting users, head request
const getUsersHead = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'getUsers with HEAD.',
  };

  // give the error a consistent id
  responseJSON.id = 'Success';

  // return our json with a 200 bad request code
  return respondJSONMeta(request, response, 200);
};

// function for fake request
const notReal = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'notReal with GET.',
  };
    // set our error message
  responseJSON.message = 'The page you were looking for was not found.';

  // give the error a consistent id
  responseJSON.id = 'notReal';

  // return our json with a 404 bad request code
  return respondJSON(request, response, 404, responseJSON);
};

// function for fake request, head request
const notRealHead = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'notReal with HEAD.',
  };

  // set our error message
  responseJSON.message = 'Resource not found.';

  // give the error a consistent id
  responseJSON.id = 'notRealHead';

  // return our json with a 404 bad request code
  return respondJSONMeta(request, response, 404, responseJSON);
};

// function to show not found error
const notFound = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201; // success created
  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
    users[body.name].name = body.name;
  }

  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return responseJSON(request, response, responseCode, responseJSON);
  }

  // catch
  return respondJSONMeta(request, response, 204); // sending data to inform user body is updated
};

// exports to set functions to public.
module.exports = {
  getUsers,
  getUsersHead,
  notReal,
  notRealHead,
  notFound,
  addUser,
};
