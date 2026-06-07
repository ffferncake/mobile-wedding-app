import { readdir, writeFile } from "fs/promises";
import path from "path";

const galleryTabs = ["studio", "summer", "winter"];
const galleryRoot = path.join(process.cwd(), "public", "images", "gallery");
const behindSceneRoot = path.join(process.cwd(), "public", "images", "behide");
const outputFile = path.join(process.cwd(), "src", "app", "data", "gallery.ts");

function sortByImageNumber(a, b) {
  const aNumber = Number.parseInt(a, 10);
  const bNumber = Number.parseInt(b, 10);

  if (Number.isNaN(aNumber) || Number.isNaN(bNumber)) {
    return a.localeCompare(b);
  }

  return aNumber - bNumber;
}

const entries = await Promise.all(
  galleryTabs.map(async (tab) => {
    const folder = path.join(galleryRoot, tab);
    const images = await getImages(folder, `/images/gallery/${tab}`);

    return [tab, images];
  }),
);

const gallery = Object.fromEntries(entries);
const behindSceneImages = await getImages(behindSceneRoot, "/images/behide");

async function getImages(folder, publicPath) {
  const files = await readdir(folder);

  return files
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort(sortByImageNumber)
    .map((file) => `${publicPath}/${file}`);
}

await writeFile(
  outputFile,
  [
    `export const galleryImages = ${JSON.stringify(gallery, null, 2)} as const;`,
    `export const behindSceneImages = ${JSON.stringify(behindSceneImages, null, 2)} as const;`,
    "",
  ].join("\n"),
);

console.log(`Generated ${path.relative(process.cwd(), outputFile)}`);
