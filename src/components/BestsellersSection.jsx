import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useApi } from '../lib/hooks';

const BestsellersSection = () => {
  const { data, loading } = useApi('/api/products?bestseller=1&limit=8');
  const products = data?.data || [];

  return (
    <section className="bg-white font-['Inter',sans-serif] text-[#111827]">
      <div className="mx-auto max-w-[1191px] border-t border-[#d8d8d8] pb-[86px] pt-[64px]">
        <div className="mb-[49px] flex items-center justify-between px-5 md:px-0">
          <h2 className="text-[30px] font-black leading-none tracking-[-0.065em]">Bestsellers</h2>
          <Link to="/category/best-sellers" className="flex items-center gap-2 text-[16px] font-semibold tracking-[-0.04em] text-black">
            View All <span className="text-[26px] font-normal leading-none">&rarr;</span>
          </Link>
        </div>

        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 gap-x-10 gap-y-[64px] px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square bg-neutral-100 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-10 gap-y-[64px] px-5 pb-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-0">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>

        <div className="mt-9 h-1 w-[40%] max-w-[476px] bg-[#1f1f1f]" />
      </div>
    </section>
  );
};

export default BestsellersSection;
