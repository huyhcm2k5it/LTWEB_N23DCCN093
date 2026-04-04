import Link from "next/link";

const posts = [
  { slug: "bai-viet-1", title: "Bài viết 1" },
  { slug: "bai-viet-2", title: "Bài viết 2" },
];

export default function BlogPage() {
  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "10px", fontSize: "32px", fontWeight: "bold" }}>Danh sách bài viết</h1>

      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/blog/${post.slug}`} style={{ color: "blue" }}>
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
