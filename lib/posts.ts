import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Root, Image } from "mdast";

const postsDir = path.join(process.cwd(), "markdown");

export interface PostMeta {
  slug: string;       // relative path without .md, e.g. "tech/my-post"
  title: string;
  date: string;
  description: string;
  category: string | null; // top-level folder name, or null for root posts
}

export interface Post extends PostMeta {
  contentHtml: string;
}

/** Recursively collect all .md file paths relative to `base`. */
function getMdFiles(dir: string, base: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMdFiles(fullPath, base));
    } else if (entry.name.endsWith(".md")) {
      // Use forward slashes regardless of OS
      files.push(path.relative(base, fullPath).replace(/\\/g, "/"));
    }
  }
  return files;
}

export function getAllPosts(): PostMeta[] {
  const relPaths = getMdFiles(postsDir, postsDir);

  const posts = relPaths.map((relPath) => {
    const slug = relPath.replace(/\.md$/, "");
    const segments = slug.split("/");
    const category = segments.length > 1 ? segments[0] : null;

    const fullPath = path.join(postsDir, relPath);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      description: data.description ?? "",
      category,
    } as PostMeta;
  });

  return posts.sort((a, b) => {
    const toMs = (d: string) => (d ? new Date(d).getTime() : 0);
    return toMs(b.date) - toMs(a.date);
  });
}

/**
 * Remark plugin: rewrites relative image src values so they are served by
 * the /blog-images route handler, which reads directly from the markdown/ folder.
 * e.g. slug "travel/japan" + src "photo.jpg" → "/blog-images/travel/photo.jpg"
 */
function remarkAbsoluteImages(postDir: string) {
  return (tree: Root) => {
    visit(tree, "image", (node: Image) => {
      if (
        node.url &&
        !node.url.startsWith("http") &&
        !node.url.startsWith("/") &&
        !node.url.startsWith("data:")
      ) {
        const base = postDir ? `/blog-images/${postDir}` : "/blog-images";
        node.url = `${base}/${node.url}`;
      }
    });
  };
}

export async function getPost(slug: string): Promise<Post> {
  const fullPath = path.join(postsDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const segments = slug.split("/");
  const category = segments.length > 1 ? segments[0] : null;
  // Directory of the post relative to the markdown root (e.g. "travel" or "")
  const postDir = segments.length > 1 ? segments.slice(0, -1).join("/") : "";

  const processed = await remark()
    .use(remarkAbsoluteImages, postDir)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    category,
    contentHtml,
  };
}
