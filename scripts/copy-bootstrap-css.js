const fs = require("fs");
const path = require("path");

const source = path.join(
  __dirname,
  "..",
  "node_modules",
  "bootstrap",
  "dist",
  "css",
  "bootstrap.min.css"
);
const targetDir = path.join(__dirname, "..", "public", "css");
const target = path.join(targetDir, "bootstrap.min.css");

if (!fs.existsSync(source)) {
  console.warn("Bootstrap CSS not found, skipping copy.");
  process.exit(0);
}

fs.mkdirSync(targetDir, { recursive: true });
fs.copyFileSync(source, target);
console.log("Copied bootstrap.min.css to public/css/");
