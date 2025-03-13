class Route {
  constructor(method, url, statusCode = 200) {
    this.method = method;
    this.url = url;
    this.statusCode = statusCode;
  }
}

class ViewRoute extends Route {
  constructor(method, url, content, statusCode = 200) {
    super(method, url, statusCode);
    this.contentType = "text/html";
    this.content = content;
  }

  render() {
    return `<main id="root">
      ${this.content}
      </main>`;
  }
}

class APIRoute extends Route {
  constructor(method, url, contentHandler, statusCode = 200) {
    super(method, url, statusCode);
    this.contentType = "application/json";
    this.contentHandler = contentHandler;
  }

  render(reqBody) {
    return JSON.stringify(this.contentHandler(reqBody)); // Fixed the handler call
  }
}

module.exports = { ViewRoute, APIRoute };
