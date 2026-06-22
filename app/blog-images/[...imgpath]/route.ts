import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const markdownDir = path.join(process.cwd(), "markdown");

const MIME: Record<string, string> = {
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png":  "image/png",
  ".gif":  "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg":  "image/svg+xml",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: { imgpath: string[] } }
) {
  const filePath = path.resolve(markdownDir, ...params.imgpath);

  // Security: prevent path traversal outside markdown dir
  if (!filePath.startsWith(markdownDir + path.sep) && filePath !== markdownDir) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const buf = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] ?? "application/octet-stream";
    return new NextResponse(buf, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
