import Link from "next/link";
import { Nunito } from "next/font/google";
import { getAllPosts } from "@/lib/posts";

function formatDate(raw: string): string {
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const nunito = Nunito({
  weight: "500",
  display: "swap",
  subsets: ["latin"],
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-white text-black">
      {/* Header */}
      <div className="text-center mt-16 mb-10">
        <h1 className={`${nunito.className} text-6xl mb-1 uppercase tracking-tight`}>
          Blog
        </h1>
        <div className="h-1 w-12 bg-gray-300 mx-auto mb-4"></div>
        <p className="text-gray-500 tracking-[0.25em] uppercase text-[10px] font-bold">
          Tim Dinan
        </p>
      </div>

      {/* Post List */}
      <div className="w-full max-w-xs flex flex-col space-y-4">
        {posts.length === 0 && (
          <p className="text-gray-400 text-center text-sm">No posts yet.</p>
        )}
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-gray-100 hover:bg-gray-200 rounded p-4 transition-all"
          >
            {post.category && (
              <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-1">
                {post.category}
              </p>
            )}
            <p
              className={`${nunito.className} text-lg font-bold leading-tight group-hover:underline`}
            >
              {post.title}
            </p>
            {post.date && (
              <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-1">
                {formatDate(post.date)}
              </p>
            )}
            {post.description && (
              <p className="text-sm text-gray-600 mt-2">{post.description}</p>
            )}
          </Link>
        ))}

        {/* Back link */}
        <Link
          href="/"
          className={`${nunito.className} text-center text-sm text-gray-400 hover:text-black transition-colors pt-2`}
        >
          ← Back
        </Link>
      </div>
    </main>
  );
}
