import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { formatMoney } from '../lib/format';

const HeaderSearch = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const d = await api.get(`/api/products?q=${encodeURIComponent(q)}&limit=8`);
        setResults(d?.data || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [query, open]);

  if (!open) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    onClose();
    navigate(`/category/best-sellers?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-transparent"
      />
      <div className="absolute left-0 right-0 top-full z-50 border-t border-neutral-100 bg-white shadow-sm">
        <form onSubmit={onSubmit} className="mx-auto w-full max-w-[1100px] px-4 py-5 md:px-8">
          <div className="mx-auto flex w-full max-w-[820px] items-center gap-3 rounded-full border border-neutral-300 bg-white px-5 py-3 transition focus-within:border-neutral-900 focus-within:shadow-[0_0_0_3px_rgba(15,61,31,0.08)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-neutral-500"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, categories..."
              className="flex-1 border-0 bg-transparent text-[15px] text-neutral-800 outline-none placeholder:text-neutral-400"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 rounded-full p-1 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>
        </form>

        {query.trim().length >= 2 && (
          <div className="mx-auto max-w-[1100px] px-4 pb-6 md:px-8">
            {loading ? (
              <p className="py-4 text-center text-sm text-neutral-500">Searching…</p>
            ) : results.length === 0 ? (
              <p className="py-4 text-center text-sm text-neutral-500">No products match "{query.trim()}".</p>
            ) : (
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={p.slug ? `/product/${p.slug}` : '#'}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-lg border border-neutral-100 p-2 hover:bg-neutral-50"
                    >
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded bg-neutral-100">
                        {p.image && <img src={p.image} alt={p.name} className="h-full w-full object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-neutral-900">{p.name}</p>
                        <p className="text-xs text-neutral-500">{formatMoney(p.price, p.currency)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderSearch;
