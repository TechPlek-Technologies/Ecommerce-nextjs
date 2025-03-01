const express = require("express");
const next = require("next");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Use Helmet to set secure HTTP headers
  server.use(helmet());

  // Enable gzip compression for performance optimization
  server.use(compression());

  // Serve static files from the public/uploads directory
  server.use(
    "/uploads",
    express.static(path.join(__dirname, "public", "uploads"))
  );

  // Handle all other routes with Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(port, (err) => {
    if (err) {
      console.error("Server failed to start", err);
      process.exit(1);
    }
    console.log(
      `> Ready on http://localhost:${port} in ${
        dev ? "development" : "production"
      } mode`
    );
  });
});
