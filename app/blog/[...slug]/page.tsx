import Link from "next/link";
import { Nunito } from "next/font/google";
import { getPost, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

const nunito = Nunito({
  weight: "500",
  display: "swap",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug.split("/") }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugPath = params.slug.join("/");
  let post;
  try {
    post = await getPost(slugPath);
  } catch {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-white text-black">
      {/* Header */}
      <div className="text-center mt-16 mb-10">
        <h1
          className={`${nunito.className} text-4xl mb-1 uppercase tracking-tight`}
        >
          {post.title}
        </h1>
        <div className="h-1 w-12 bg-gray-300 mx-auto mb-4"></div>
        {post.date && (
          <p className="text-gray-500 tracking-[0.25em] uppercase text-[10px] font-bold">
            {post.date}
          </p>
        )}
      </div>

      {/* Post Content */}
      <article
        className="w-full max-w-xs prose prose-sm prose-gray"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Back link */}
      <div className="w-full max-w-xs mt-10">
        <Link
          href="/blog"
          className={`${nunito.className} text-sm text-gray-400 hover:text-black transition-colors`}
        >
          ← All posts
        </Link>
      </div>
    </main>
  );
}
