function getResponse(error, body = null, statusCode = null, customHeader = null) {
  // Default
  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  // Header
  if (customHeader != null) {
    response.headers = { ...response.headers, ...customHeader };
  }

  // Error
  if (error != null) {
    const errorStatusCode = error.statusCode != null ? error.statusCode : 500;
    response.statusCode = statusCode == null ? errorStatusCode : statusCode;

    // Check if error is string or object
    if (typeof error === 'string') {
      response.body = {
        message: error,
      };
    } else {
      response.body = {
        message: error.message || '',
        code: error.code || '',
      };
    }
  } else {
    // Success
    response.statusCode = statusCode == null ? 200 : statusCode;
    response.body = body;
  }

  response.body = JSON.stringify(response.body);
  return response;
}


function newError(message, code = null, statusCode = null) {
  const errorObject = {
    message,
  };
  if (code != null) errorObject.code = code;
  if (statusCode != null) errorObject.statusCode = statusCode;
  return errorObject;
}

module.exports = {
  getResponse,
  newError,
};
