#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const COLORS = {
  fill: "#DBA514",
  detail: "#0F1115",
  background: "#0F1115",
};

const outputs = [
  ["apple-touch-icon.png", 180],
  ["favicon-32x32.png", 32],
  ["favicon-16x16.png", 16],
  ["icon-512.png", 512],
];

function medallionSvg(size) {
  const padding = size * 0.1;
  const markSize = size - padding * 2;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${COLORS.background}"/>
  <svg x="${padding}" y="${padding}" width="${markSize}" height="${markSize}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 32 4 Q 54 4 60 16 Q 60 32 60 32 Q 60 48 54 56 Q 32 60 32 60 Q 10 60 8 52 Q 4 32 4 32 Q 4 14 12 8 Q 32 4 32 4 Z" fill="${COLORS.fill}"/>
    <path d="M 8 50 L 56 14" stroke="${COLORS.detail}" stroke-width="3.4" stroke-linecap="round" opacity="0.18"/>
    <path d="M 14 54 L 60 22" stroke="${COLORS.detail}" stroke-width="2" stroke-linecap="round" opacity="0.12"/>
    <rect x="22" y="14" width="22" height="6.5" rx="3.25" fill="${COLORS.detail}"/>
    <rect x="34.75" y="14" width="6.5" height="28" rx="3.25" fill="${COLORS.detail}"/>
    <path d="M 38 38 Q 38 50 28 50 Q 18 50 18 40 L 24.5 40 Q 24.5 44 28 44 Q 31.5 44 31.5 38 Z" fill="${COLORS.detail}"/>
    <circle cx="48" cy="14" r="3" fill="${COLORS.detail}"/>
  </svg>
</svg>`;
}

async function main() {
  await Promise.all(
    outputs.map(async ([filename, size]) => {
      const svg = medallionSvg(size);
      const filePath = path.join(ROOT, filename);

      await sharp(Buffer.from(svg)).png().toFile(filePath);
      const bytes = fs.statSync(filePath).size;
      console.log(`${filename} ${size}x${size} ${bytes} bytes`);
    })
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
