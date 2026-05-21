import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const galleryTabs = ["winter", "summer", "studio"] as const;

function sortByImageNumber(a: string, b: string) {
  return Number.parseInt(a, 10) - Number.parseInt(b, 10);
}

export async function GET() {
  const galleryRoot = path.join(process.cwd(), "public", "images", "gallery");

  const gallery = await Promise.all(
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

  return NextResponse.json(Object.fromEntries(gallery));
}
