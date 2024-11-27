// Related: https://github.com/remix-run/remix/issues/2835#issuecomment-1144102176
// Replace the HOST env var with SHOPIFY_APP_URL so that it doesn't break the remix server.
if (
    process.env.HOST &&
    (!process.env.SHOPIFY_APP_URL ||
      process.env.SHOPIFY_APP_URL === process.env.HOST)
  ) {
    process.env.SHOPIFY_APP_URL = process.env.HOST;
    delete process.env.HOST;
  }
  
  /** @type {import('@remix-run/dev').AppConfig} */
  module.exports = {
    ignoredRouteFiles: ["**/.*"],
    appDirectory: "app",
    serverModuleFormat: "cjs",
    serverBuildPath: "build/index.js", // Set the server build output path
    assetsBuildDirectory: "public/build", // Directory for static assets
    publicPath: "/build/", // Public path for assets
    dev: { port: process.env.HMR_SERVER_PORT || 8002 },
    future: {},
    // Define webhook routes explicitly to ensure backend endpoints are handled correctly
    routes: async (defineRoutes) => {
        return defineRoutes((route) => {
          route("/webhooks/app/uninstalled", "routes/webhooks.app.uninstalled.jsx");
          // Remove other privacy-related routes since they are no longer needed
        });
      },
  };
  