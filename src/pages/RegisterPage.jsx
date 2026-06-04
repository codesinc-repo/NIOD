import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import { useAuth } from '../lib/AuthContext';

export default function RegisterPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (user) return <Navigate to="/account" replace />;

  async function onSubmit(e) {
    e.preventDefault();
    setError(''); setSubmitting(true);
    try {
      await register(form);
      navigate('/account', { replace: true });
    } catch (err) {
      setError(err?.body?.message || 'Sign up failed');
    } finally { setSubmitting(false); }
  }

  return (
    <StoreShell>
      <div className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-3xl font-light mb-2 text-center">Create your account</h1>
        <p className="text-sm text-neutral-500 text-center mb-8">Faster checkout, order tracking, wishlist.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm" />
          <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm" />
          <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm" />
          <input type="password" required minLength={8} placeholder="Password (min 8 chars)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm" />
          {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
          <button disabled={submitting} className="w-full py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 disabled:opacity-60">{submitting ? 'Creating…' : 'Create account'}</button>
        </form>
        <p className="text-sm text-center text-neutral-600 mt-6">Already a member? <Link to="/login" className="underline">Sign in</Link></p>
      </div>
    </StoreShell>
  );
}
