import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import { useProduct } from '../lib/hooks';
import { useCart } from '../lib/CartContext';
import { useAuth } from '../lib/AuthContext';
import { api } from '../lib/api';
import { formatMoney, formatDate } from '../lib/format';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { data: product, loading, error } = useProduct(slug);
  const { add } = useCart();
  const { user } = useAuth();
  const [sizeId, setSizeId] = useState(null);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [wishLoading, setWishLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  if (loading) return <StoreShell><div className="max-w-6xl mx-auto px-4 py-16 text-sm text-neutral-500">Loading…</div></StoreShell>;
  if (error || !product) return (
    <StoreShell><div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-light mb-2">Product not found</h1>
      <Link to="/" className="inline-block mt-3 px-5 py-2.5 bg-black text-white text-sm rounded-full">Back to home</Link>
    </div></StoreShell>
  );

  const images = product.images && product.images.length ? product.images.map((i) => i.url) : (product.image ? [product.image] : []);
  const sizes = product.sizes || [];
  const selectedSize = sizes.find((s) => s.id === sizeId);
  const unitPrice = Number(product.price) + Number(selectedSize?.price_delta || 0);

  async function onAdd() {
    setAdding(true); setFeedback('');
    try {
      await add(product.id, qty, sizeId);
      setFeedback('Added to cart!');
      setTimeout(() => setFeedback(''), 2500);
    } catch (err) {
      setFeedback(err?.body?.message || 'Could not add');
    } finally { setAdding(false); }
  }

  async function onWishlist() {
    if (!user) { window.location.href = `/login?next=/product/${slug}`; return; }
    setWishLoading(true);
    try {
      await api.post(`/api/wishlist/${product.id}`, {}, { auth: true });
      setFeedback('Saved to wishlist'); setTimeout(() => setFeedback(''), 2500);
    } catch (err) {
      setFeedback(err?.body?.message || 'Could not save');
    } finally { setWishLoading(false); }
  }

  return (
    <StoreShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-xs text-neutral-500 mb-5">
          <Link to="/" className="hover:text-neutral-900">Home</Link>
          {product.category_slug && <> · <Link to={`/category/${product.category_slug}`} className="hover:text-neutral-900">{product.category_name}</Link></>}
          <> · {product.name}</>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="aspect-square bg-neutral-50 rounded-2xl overflow-hidden">
              {images[activeImg] && <img src={images[activeImg]} alt="" className="w-full h-full object-contain" />}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {images.map((u, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square rounded-lg overflow-hidden border ${i === activeImg ? 'border-neutral-900' : 'border-neutral-200'}`}>
                    <img src={u} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.tag && <div className="text-xs uppercase tracking-wider text-neutral-500 mb-2">{product.tag}</div>}
            <h1 className="text-3xl sm:text-4xl font-light">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="text-amber-500">{'★'.repeat(Math.round(Number(product.rating)))}{'☆'.repeat(5 - Math.round(Number(product.rating)))}</span>
              <span className="text-neutral-500">{product.rating} ({product.rating_count})</span>
            </div>
            {product.benefit && <p className="mt-3 text-neutral-600">{product.benefit}</p>}

            <div className="mt-5 text-2xl font-medium">{formatMoney(unitPrice, product.currency)}</div>

            {sizes.length > 0 && (
              <div className="mt-5">
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Size</div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button key={s.id} onClick={() => setSizeId(s.id)}
                      className={`px-4 py-2 text-sm rounded-full border ${s.id === sizeId ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 hover:border-neutral-900'}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border border-neutral-300 rounded-full">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 hover:bg-neutral-100 rounded-full text-lg">−</button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-10 h-10 hover:bg-neutral-100 rounded-full text-lg">+</button>
              </div>
              <button onClick={onAdd} disabled={adding} className="flex-1 px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 disabled:opacity-60">{adding ? 'Adding…' : 'Add to cart'}</button>
              <button onClick={onWishlist} disabled={wishLoading} className="px-4 py-3 border border-neutral-300 rounded-full text-sm hover:bg-neutral-50" title="Save to wishlist">♡</button>
            </div>
            {feedback && <div className="mt-3 text-sm text-emerald-700">{feedback}</div>}

            {product.description && (
              <div className="mt-8 border-t border-neutral-200 pt-6">
                <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-2">Description</h2>
                <p className="text-sm text-neutral-700 whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {(product.reviews || []).length > 0 && (
              <div className="mt-8 border-t border-neutral-200 pt-6">
                <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-3">Reviews</h2>
                <ul className="space-y-4">
                  {product.reviews.map((r) => (
                    <li key={r.id}>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-amber-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                        <span className="text-neutral-500">{r.author_name} · {formatDate(r.created_at)}</span>
                      </div>
                      {r.title && <div className="font-medium mt-1">{r.title}</div>}
                      {r.body && <p className="text-sm text-neutral-700 mt-1">{r.body}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </StoreShell>
  );
}
