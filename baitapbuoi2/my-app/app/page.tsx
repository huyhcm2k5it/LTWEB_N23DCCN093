import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "10px", fontSize: "32px", fontWeight: "bold" }}>Trang chủ Blog</h1>

      <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
        <li>
          <Link href="/blog" style={{ color: "blue" }}>Danh sách bài viết</Link>
        </li>
        <li>
          <Link href="/categories" style={{ color: "blue" }}>Danh mục bài viết</Link>
        </li>
      </ul>
    </div>
  );
}
