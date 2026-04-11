import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Chỉ xử lý trang chủ
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  // Fetch sản phẩm từ API
  const res = await fetch(
    "https://dummyjson.com/products/category/mens-shirts"
  );

  if (!res.ok) {
    return NextResponse.next();
  }

  const data = await res.json();
  const products = data.products || [];

  if (products.length === 0) {
    return NextResponse.next();
  }

  // Đọc ID áo lần trước từ cookie
  const lastId = request.cookies.get("lastProductId")?.value;

  // Lọc bỏ áo lần trước
  const available = products.filter(
    (p: { id: number }) => String(p.id) !== lastId
  );
  const pool = available.length > 0 ? available : products;

  // Random chọn áo mới
  const picked = pool[Math.floor(Math.random() * pool.length)];

  // Ghi product ID vào URL để page.tsx đọc
  const url = request.nextUrl.clone();
  url.searchParams.set("productId", String(picked.id));

  const response = NextResponse.rewrite(url);

  // Lưu cookie cho lần sau
  response.cookies.set("lastProductId", String(picked.id), {
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
}

export const config = {
  matcher: ["/"],
};
