const path = require("path");

module.exports = {
  // Check Typescript files
  "**/*.(ts|tsx)": () => "npm tsc --noEmit",

  // Lint and format TypeScript and JavaScript files
  "**/*.(ts|tsx|js)": (filenames) => [
    `npm lint --fix --file ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(" --file ")}`,
    `npm prettier --write ${filenames.join(" ")}`,
  ],

  // Format MarkDown and JSON
  "**/*.(md|json)": (filenames) => `npm prettier --write ${filenames.join(" ")}`,
};
