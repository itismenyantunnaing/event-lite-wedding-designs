import sharp from "sharp";
import { readdir, unlink } from "node:fs/promises";
import path from "node:path";

const directory = path.join(process.cwd(), "public", "doodles");
const files = (await readdir(directory)).filter((file) => file.endsWith(".png"));

for (const file of files) {
  const source = path.join(directory, file);
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let pixel = 0; pixel < data.length; pixel += 4) {
    const brightness = (data[pixel] + data[pixel + 1] + data[pixel + 2]) / 3;
    data[pixel + 3] = brightness > 190 ? 0 : Math.min(255, (190 - brightness) * 5);
  }

  const output = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png().toBuffer();

  const temporary = `${source}.processed.png`;
  await sharp(output).toFile(temporary);
  await sharp(temporary).toFile(source);
  await unlink(temporary);
}

const scheduleSource = path.join(directory, "schedule-icons.png");
const scheduleIcons = [
  { name: "rings", top: 70, height: 330 },
  { name: "glasses", top: 390, height: 360 },
  { name: "cake", top: 730, height: 460 },
  { name: "car", top: 1170, height: 490 },
];

for (const icon of scheduleIcons) {
  const crop = await sharp(scheduleSource)
    .extract({ left: 0, top: icon.top, width: 941, height: icon.height })
    .png()
    .toBuffer();

  await sharp(crop)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(directory, `schedule-${icon.name}.png`));
}

const giftsSource = path.join(directory, "gifts-chandelier.png");
const giftsCrop = await sharp(giftsSource)
  .extract({ left: 0, top: 0, width: 941, height: 1080 })
  .png()
  .toBuffer();

await sharp(giftsCrop)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(directory, "gifts-only.png"));

const chandelierCrop = await sharp(giftsSource)
  .extract({ left: 0, top: 1040, width: 941, height: 631 })
  .png()
  .toBuffer();

await sharp(chandelierCrop)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(directory, "chandelier.png"));
