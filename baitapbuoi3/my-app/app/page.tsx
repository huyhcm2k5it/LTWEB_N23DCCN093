export const dynamic = 'force-dynamic';

export default async function Home() {
  const res = await fetch("https://dummyjson.com/products/category/mens-shirts", {
    cache: "no-store", // Ensure it never caches to get new product on F5
  });
  
  if (!res.ok) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Error fetching products.
      </div>
    );
  }
  
  const data = await res.json();
  const products = data.products || [];
  
  const randomProduct = products.length > 0 
    ? products[Math.floor(Math.random() * products.length)]
    : null;

  if (!randomProduct) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-black">
        No products found.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f2f4f8] p-4 font-sans text-black">
      <h1 className="mb-10 text-[22px] font-bold text-gray-800 tracking-wide">
        Fashion Trending 2026
      </h1>
      
      {/* Product Card */}
      <div className="w-full max-w-[300px] rounded-[1.25rem] bg-white p-[18px] shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
        
        {/* Image Container */}
        <div className="relative mb-5 flex h-[260px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#f0f2f6] p-4 transition duration-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={randomProduct.thumbnail}
            alt={randomProduct.title}
            className="h-full w-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col px-1">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#6db2e4]">
              New Arrival
            </span>
            <span className="text-[15px] font-bold text-[#e14040]">
              ${randomProduct.price}
            </span>
          </div>
          
          <h2 className="mt-[6px] text-[15px] font-bold text-gray-900 line-clamp-1">
            {randomProduct.title}
          </h2>
          
          <button className="mt-5 w-full rounded-lg bg-black py-3 text-[13px] font-semibold text-white transition-colors hover:bg-gray-800 active:bg-gray-900">
            Thêm vào giỏ hàng
          </button>
        </div>

      </div>
    </div>
  );
}
