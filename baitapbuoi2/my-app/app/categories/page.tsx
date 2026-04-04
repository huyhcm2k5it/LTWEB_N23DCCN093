export default function CategoriesPage() {
  const categories = ["Công nghệ", "Lập trình", "Cuộc sống"];

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "10px", fontSize: "32px", fontWeight: "bold" }}>Danh mục bài viết</h1>

      <ul style={{ listStyle: "disc", paddingLeft: "20px", fontSize: "16px" }}>
        {categories.map((category) => (
          <li key={category}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
