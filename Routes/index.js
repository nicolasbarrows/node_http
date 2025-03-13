const { ViewRoute, APIRoute } = require("./types");

const routes = {
  "GET/": new ViewRoute("GET", "/", "<h1>Home<h1>"),
  "GET/about": new APIRoute("GET", "/about", (reqBody) => ({
    name: "Nicolas",
    city: "Montevallo",
  })),
  "POST/echo": new APIRoute("POST", "/echo", function (reqBody) {
    return JSON.stringify({ url: this.url, method: this.method, reqBody });
  }),
  notfound: new ViewRoute("GET", "/", "<h1>404 Not Found</h1>", 404), // Fixed the closing tag
};

module.exports = { routes };
