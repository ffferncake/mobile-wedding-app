import { readdir, writeFile } from "fs/promises";
import path from "path";

const galleryTabs = ["studio", "summer", "winter"];
const galleryRoot = path.join(process.cwd(), "public", "images", "gallery");
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
    const files = await readdir(folder);
    const images = files
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
      .sort(sortByImageNumber)
      .map((file) => `/images/gallery/${tab}/${file}`);

    return [tab, images];
  }),
);

const gallery = Object.fromEntries(entries);

await writeFile(
  outputFile,
  `export const galleryImages = ${JSON.stringify(gallery, null, 2)} as const;\n`,
);

console.log(`Generated ${path.relative(process.cwd(), outputFile)}`);
