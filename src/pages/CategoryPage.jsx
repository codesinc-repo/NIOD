import { Link, useParams } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import { useCategory } from '../lib/hooks';
import { formatMoney } from '../lib/format';

export default function CategoryPage() {
  const { slug } = useParams();
  const { data, loading } = useCategory(slug);

  return (
    <StoreShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? <div className="text-sm text-neutral-500">Loading…</div>
          : !data ? <div className="py-16 text-center"><h1 className="text-2xl font-light">Category not found</h1></div>
          : (
            <>
              <header className="mb-8">
                {data.hero_eyebrow && <div className="text-xs uppercase tracking-wider text-neutral-500">{data.hero_eyebrow}</div>}
                <h1 className="text-4xl sm:text-5xl font-light mt-2">{data.hero_title || data.name}</h1>
                {data.hero_copy && <p className="text-neutral-600 mt-3 max-w-2xl">{data.hero_copy}</p>}
              </header>
              <div className="mb-4 text-sm text-neutral-500">{data.total} products</div>
              <ProductGrid products={data.products || []} />
            </>
          )}
      </div>
    </StoreShell>
  );
}

export function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <div className="py-16 text-center text-neutral-500 text-sm">No products yet in this category.</div>;
  }
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((p) => (
        <li key={p.id} className="group">
          <Link to={`/product/${p.slug}`} className="block">
            <div className="aspect-square bg-neutral-50 rounded-xl overflow-hidden">
              {p.image && <img src={p.image} alt="" className="w-full h-full object-contain transition-transform group-hover:scale-105" />}
            </div>
            <div className="mt-3">
              {p.tag && <div className="text-[10px] uppercase tracking-wider text-neutral-500">{p.tag}</div>}
              <div className="text-sm font-medium">{p.name}</div>
              {p.benefit && <div className="text-xs text-neutral-500 mt-0.5 line-clamp-2">{p.benefit}</div>}
              <div className="text-sm mt-1">{formatMoney(p.price, p.currency)}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
