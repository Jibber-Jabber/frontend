const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/auth",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/users",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/posts",
    createProxyMiddleware({
      target: "http://localhost:8081",
      changeOrigin: true,
    })
  );
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8082",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/ws", { target: "http://localhost:8082", ws: true })
  );
};
