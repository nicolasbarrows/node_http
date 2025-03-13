console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

const http = require("http");
const { getRouteInfo } = require("./Routes/utils");
const port = 3000;

const requestHandler = (req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  //listen and collect req body chunks
  const chunks = [];
  req.on("data", (chunk) => {
    console.log(`Received chunk: ${chunk}`);
    chunks.push(chunk);
  });

  //handle the response after the req chunks have arrived
  req.on("end", () => {
    const { method, url } = req;
    //parse the req body or return null if no request body
    let reqBody = null;
    if (chunks.length > 0) {
      try {
        reqBody = JSON.parse(Buffer.concat(chunks).toString());
        console.log(`Parsed request body: ${JSON.stringify(reqBody)}`);
      } catch (err) {
        console.error("Request Body cannot be parsed to JSON");
        console.error(`Raw request body: ${Buffer.concat(chunks).toString()}`);
      }
    }

    //get the route info
    const { statusCode, contentType, content } = getRouteInfo(
      method,
      url,
      reqBody
    );

    console.log(
      `Responding with status: ${statusCode}, contentType: ${contentType}, content: ${content}`
    );

    res.writeHead(statusCode, { "content-type": contentType });
    res.write(content);
    res.end();
  });

  req.on("error", (err) => {
    console.error(`Request error: ${err.message}`);
  });
};

const server = http.createServer(requestHandler);
server.listen(port, () => {
  console.log(`server is listening on ${port}..`);
});
