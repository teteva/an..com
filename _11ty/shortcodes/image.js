// _11ty/shortcodes/image.js
import Image from "@11ty/eleventy-img";
import path from "path";

export default async function imageShortcode(src, alt = "", cls = "", widths = [750], formats = ["avif", "webp", "jpeg"]) {
  if (!src) return "";

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return `<img src="${src}" alt="${alt}" class="${cls}" loading="lazy" decoding="async">`;
  }

  let metadata = await Image(src, {
    widths,
    formats,
    outputDir: "./_site/img/",
    urlPath: "/img/",
  });

  return Image.generateHTML(metadata, {
    alt,
    class: cls,
    loading: "lazy",
    decoding: "async",
  });
}
