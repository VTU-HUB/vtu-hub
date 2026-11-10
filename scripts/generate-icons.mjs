#!/usr/bin/env node
// Regenerates PNG app icons from public/favicon.svg and recompresses the social share image.
// Usage: node scripts/generate-icons.mjs  (re-run after changing favicon.svg or og source)
import { readFileSync, writeFileSync, existsSync, copyFileSync } from "node:fs";
import sharp from "sharp";

const svg = readFileSync("public/favicon.svg");
const BLUE = "#2563EB";

// Plain square icons (iOS and browsers round the corners themselves for touch icons).
const square = svg
  .toString()
  .replace('rx="8" fill="#2563EB"', `fill="${BLUE}"`);

const icons = [
  ["public/apple-touch-icon.png", 180, square],
  ["public/favicon-48.png", 48, svg.toString()],
  ["public/icon-192.png", 192, svg.toString()],
  ["public/icon-512.png", 512, svg.toString()],
];
for (const [out, size, src] of icons) {
  await sharp(Buffer.from(src), { density: 1200 }).resize(size, size).png({ compressionLevel: 9 }).toFile(out);
  console.log("wrote", out);
}

// Maskable icon: artwork inside the 80% safe zone on a full-bleed background.
const inner = await sharp(Buffer.from(square), { density: 1200 }).resize(410, 410).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: BLUE } })
  .composite([{ input: inner, gravity: "center" }])
  .png({ compressionLevel: 9 })
  .toFile("public/icon-maskable-512.png");
console.log("wrote public/icon-maskable-512.png");

// Share image: 1200x675 (16:9) progressive mozjpeg keeps it well under 200 KB.
const ogSource = existsSync("scripts/og-source.jpg") ? "scripts/og-source.jpg" : "public/og.jpg";
if (ogSource === "public/og.jpg") copyFileSync("public/og.jpg", "scripts/og-source.jpg");
const og = await sharp(readFileSync("scripts/og-source.jpg"))
  .resize(1200, 675, { fit: "cover" })
  .jpeg({ quality: 82, mozjpeg: true, progressive: true })
  .toBuffer();
writeFileSync("public/og.jpg", og);
console.log(`wrote public/og.jpg (${Math.round(og.length / 1024)} KB)`);
