import Link from "next/link";

const posts: Record<string, { title: string; content: string }> = {
  "bai-viet-1": {
    title: "Bài viết 1",
    content: "Đây là nội dung chi tiết của bài viết 1.",
  },
  "bai-viet-2": {
    title: "Bài viết 2",
    content: "Đây là nội dung chi tiết của bài viết 2.",
  },
};

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return <div style={{ padding: "40px" }}>Bài viết không tồn tại</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "20px" }}>{post.title}</h1>

      <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "30px" }}>
        {post.content}
      </p>

      <Link href="/blog" style={{ color: "blue" }}>← Quay lại danh sách</Link>
    </div>
  );
}
