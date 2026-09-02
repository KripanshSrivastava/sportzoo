import type { BlogBlock } from "@/content/blog";

/**
 * Plain-text ⇄ BlogBlock[] for the admin body editor.
 *
 *   ## Heading            → h2
 *   - item / - item       → ul (consecutive dash lines)
 *   ![](https://…) or a   → image
 *     bare image URL line
 *   blank line            → paragraph break
 *   anything else         → paragraph text
 */

const IMG_MD = /^!\[[^\]]*\]\(([^)]+)\)\s*$/;
const BARE_URL = /^https?:\/\/\S+$/;

export function parseBlogBody(text: string): BlogBlock[] {
  const lines = (text ?? "").replace(/\r\n/g, "\n").split("\n");
  const blocks: BlogBlock[] = [];
  let para: string[] = [];
  let list: string[] = [];

  const flushPara = () => {
    if (para.length) blocks.push({ type: "p", text: para.join(" ").trim() });
    para = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type: "ul", items: list.slice() });
    list = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      flushPara();
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      flushPara();
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      continue;
    }
    if (line.startsWith("- ")) {
      flushPara();
      list.push(line.slice(2).trim());
      continue;
    }
    const md = line.match(IMG_MD);
    if (md || BARE_URL.test(line)) {
      flushList();
      flushPara();
      blocks.push({ type: "image", imageUrl: md ? md[1].trim() : line });
      continue;
    }
    flushList();
    para.push(line);
  }
  flushList();
  flushPara();
  return blocks;
}

export function serializeBlogBody(blocks: BlogBlock[]): string {
  return (blocks ?? [])
    .map((b) => {
      if (b.type === "h2") return `## ${b.text ?? ""}`;
      if (b.type === "ul") return (b.items ?? []).map((i) => `- ${i}`).join("\n");
      if (b.type === "image") return `![](${b.imageUrl ?? ""})`;
      return b.text ?? "";
    })
    .join("\n\n");
}
