/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: [/^emoji-picker-react/],
  future: {
    unstable_cssModules: true,
    unstable_vanillaExtract: true,
    unstable_cssSideEffectImports: true,
  },
};
