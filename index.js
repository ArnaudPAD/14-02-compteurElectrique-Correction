const http = require("http");
const app = require("./app");

const port = 3000;

const httpServer = http.createServer(app);

httpServer.listen(port);

httpServer.on("listening", () => {
  console.log(`HTTP server listening on port ${port}`);
});
