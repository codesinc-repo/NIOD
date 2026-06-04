import { Link, Navigate, useNavigate } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import { useAuth } from '../lib/AuthContext';

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  if (loading) return <StoreShell><div className="max-w-3xl mx-auto px-4 py-16 text-sm text-neutral-500">Loading…</div></StoreShell>;
  if (!user) return <Navigate to="/login?next=/account" replace />;
  return (
    <StoreShell>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-light mb-2">Hi, {user.name?.split(' ')[0] || 'there'}</h1>
        <p className="text-sm text-neutral-500 mb-8">{user.email}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/account/orders" className="border border-neutral-200 rounded-xl p-5 hover:shadow-sm">
            <div className="text-base font-medium">My orders</div>
            <div className="text-sm text-neutral-500 mt-1">Order history & tracking</div>
          </Link>
          <Link to="/account/addresses" className="border border-neutral-200 rounded-xl p-5 hover:shadow-sm">
            <div className="text-base font-medium">Addresses</div>
            <div className="text-sm text-neutral-500 mt-1">Saved shipping addresses</div>
          </Link>
          <Link to="/account/wishlist" className="border border-neutral-200 rounded-xl p-5 hover:shadow-sm">
            <div className="text-base font-medium">Wishlist</div>
            <div className="text-sm text-neutral-500 mt-1">Saved products</div>
          </Link>
        </div>
        <button onClick={() => { logout(); navigate('/'); }} className="mt-8 text-sm text-neutral-600 underline">Sign out</button>
      </div>
    </StoreShell>
  );
}
