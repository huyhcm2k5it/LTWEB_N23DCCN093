export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch(
    "https://dummyjson.com/products/category/mens-shirts",
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#dcdcdc] text-black">
        Error fetching products.
      </div>
    );
  }

  const data = await res.json();
  const products = data.products || [];

  if (products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#dcdcdc] text-black">
        No products found.
      </div>
    );
  }

  const randomProduct = products[Math.floor(Math.random() * products.length)];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#dcdcdc] p-4 font-sans">
      <div className="w-[280px]">
        <h1 className="mb-6 text-center text-[20px] font-bold text-black tracking-wide">
          Fashion Trending 2026
        </h1>

        <div className="w-full overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="flex h-[250px] w-full items-center justify-center bg-[#ececec] p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={randomProduct.thumbnail}
              alt={randomProduct.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="px-5 pb-5 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#5ba8d4]">
                New Arrival
              </span>
              <span className="text-[15px] font-bold text-red-600">
                ${randomProduct.price}
              </span>
            </div>

            <h2 className="mt-1 text-[14px] font-bold text-black leading-snug line-clamp-1">
              {randomProduct.title}
            </h2>

            <button className="mt-4 w-full rounded-md bg-[#2d2d2d] py-2.5 text-[12px] font-medium text-white tracking-wide transition-colors hover:bg-black">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
