const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const assetsSrc = path.join(rootDir, "src", "assets");
const assetsDest = path.join(distDir, "src", "assets");

function cleanDist() {
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
    console.log("✔ Cleaned dist/");
  }
}

function compileTS() {
  console.log("⚙ Compiling TypeScript...");
  execSync("npx tsc -p tsconfig.build.json", { stdio: "inherit" });
}

function copyAssets() {
  if (!fs.existsSync(assetsSrc)) return;

  fs.mkdirSync(assetsDest, { recursive: true });

  const copyRecursive = (src, dest) => {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  };

  copyRecursive(assetsSrc, assetsDest);
  console.log("✔ Copied assets/");
}

function main() {
  cleanDist();
  compileTS();
  copyAssets();
  console.log("🎯 Build complete");
}

main();