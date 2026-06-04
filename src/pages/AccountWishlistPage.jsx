import { Link, Navigate } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/hooks';
import { api } from '../lib/api';
import { useCart } from '../lib/CartContext';
import { formatMoney } from '../lib/format';

export default function AccountWishlistPage() {
  const { user, loading } = useAuth();
  const { data, reload } = useApi(user ? '/api/wishlist' : null, { auth: true });
  const { add } = useCart();
  if (loading) return <StoreShell><div className="max-w-3xl mx-auto px-4 py-16 text-sm text-neutral-500">Loading…</div></StoreShell>;
  if (!user)   return <Navigate to="/login?next=/account/wishlist" replace />;
  const rows = data || [];

  async function unwish(id) { await api.delete(`/api/wishlist/${id}`, { auth: true }); reload(); }

  return (
    <StoreShell>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link to="/account" className="text-sm text-neutral-500 hover:underline">← Account</Link>
        <h1 className="text-3xl font-light mt-2 mb-6">Wishlist</h1>
        {rows.length === 0 ? <div className="text-sm text-neutral-600">Your wishlist is empty.</div> : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {rows.map((p) => (
              <li key={p.id} className="border border-neutral-200 rounded-xl overflow-hidden">
                <Link to={`/product/${p.slug}`}><img src={p.image} alt="" className="w-full aspect-square object-cover bg-neutral-50" /></Link>
                <div className="p-4">
                  <Link to={`/product/${p.slug}`} className="text-sm font-medium hover:underline">{p.name}</Link>
                  <div className="text-sm text-neutral-700 mt-1">{formatMoney(p.price)}</div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => add(p.id, 1)} className="flex-1 text-xs px-3 py-2 bg-black text-white rounded-full">Add to cart</button>
                    <button onClick={() => unwish(p.id)} className="text-xs px-3 py-2 border border-neutral-300 rounded-full">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </StoreShell>
  );
}
