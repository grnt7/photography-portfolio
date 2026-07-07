const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGES_DIR = path.join(__dirname, "..", "public", "images");
const VARIANTS = [
  { suffix: "-480", width: 480, quality: 78 },
  { suffix: "-800", width: 800, quality: 80 },
];

const SKIP_PATTERN = /-(480|800|1600)\.webp$/i;

async function resizeImage(filePath) {
  const fileName = path.basename(filePath);

  if (!/\.webp$/i.test(fileName) || SKIP_PATTERN.test(fileName)) {
    return;
  }

  const baseName = fileName.replace(/\.webp$/i, "");

  for (const variant of VARIANTS) {
    const outputPath = path.join(IMAGES_DIR, `${baseName}${variant.suffix}.webp`);
    const metadata = await sharp(filePath).metadata();

    if (metadata.width <= variant.width) {
      continue;
    }

    await sharp(filePath)
      .resize({ width: variant.width, withoutEnlargement: true })
      .webp({ quality: variant.quality })
      .toFile(outputPath);

    const { size } = fs.statSync(outputPath);
    console.log(`Created ${path.basename(outputPath)} (${Math.round(size / 1024)} KiB)`);
  }
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Images directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(IMAGES_DIR)
    .filter((file) => file.endsWith(".webp"))
    .map((file) => path.join(IMAGES_DIR, file));

  for (const filePath of files) {
    await resizeImage(filePath);
  }

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
