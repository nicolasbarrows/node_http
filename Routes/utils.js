const { routes } = require("./index");
// This module contains the getRouteInfo function that returns an object
// containing the status code, content type, and content of the response
const getRouteInfo = (method, url, reqBody) => {
  console.log(`Received getRouteInfo request: ${method} ${url}`);
  const route = routes[method + url] || routes.notfound; // get the route or set to notfound
  console.log(`Route: ${route}`);
  const info = {
    statusCode: route.statusCode,
    contentType: route.contentType,
    content: route.render(reqBody),
  };

  return info;
};

module.exports = { getRouteInfo };
