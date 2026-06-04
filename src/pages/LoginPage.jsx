import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import { useAuth } from '../lib/AuthContext';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/account';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (user) return <Navigate to={next} replace />;

  async function onSubmit(e) {
    e.preventDefault();
    setError(''); setSubmitting(true);
    try {
      await login(email, password);
      navigate(next, { replace: true });
    } catch (err) {
      setError(err?.body?.message || 'Sign in failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <StoreShell>
      <div className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-3xl font-light mb-2 text-center">Sign in</h1>
        <p className="text-sm text-neutral-500 text-center mb-8">Welcome back.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" />
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" />
          {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
          <button disabled={submitting} className="w-full py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 disabled:opacity-60">{submitting ? 'Signing in…' : 'Sign in'}</button>
        </form>
        <p className="text-sm text-center text-neutral-600 mt-6">New here? <Link to="/register" className="underline">Create an account</Link></p>
      </div>
    </StoreShell>
  );
}
