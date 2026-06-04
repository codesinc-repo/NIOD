import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { formatMoney } from '../../lib/format';
import { Btn, PageTitle, Card, EmptyState } from './_shared';

export default function AdminProducts() {
  const [q, setQ] = useState('');
  const { data, loading, reload } = useApi(`/api/admin/products?q=${encodeURIComponent(q)}&limit=100`, { admin: true });
  const rows = data?.data || [];

  async function remove(p) {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    await api.delete(`/api/admin/products/${p.id}`, { admin: true });
    reload();
  }

  return (
    <div>
      <PageTitle title="Products" subtitle={`${data?.total ?? 0} total`}
        action={<Btn as="link" to="/admin/products/new" variant="primary">+ New product</Btn>} />

      <div className="mb-4 flex gap-2">
        <input
          placeholder="Search by name or benefit…" value={q} onChange={(e) => setQ(e.target.value)}
          className="px-3 py-2 border border-neutral-300 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-neutral-500">Loading…</div>
        ) : rows.length === 0 ? (
          <EmptyState title="No products yet" hint="Start by adding your first formulation."
            action={<Btn as="link" to="/admin/products/new" variant="primary">+ New product</Btn>} />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 tracking-wider">
              <tr>
                <th className="text-left px-4 py-2.5">Product</th>
                <th className="text-left px-4 py-2.5">Category</th>
                <th className="text-right px-4 py-2.5">Price</th>
                <th className="text-right px-4 py-2.5">Stock</th>
                <th className="text-center px-4 py-2.5">Active</th>
                <th className="text-right px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.image ? <img src={p.image} alt="" className="w-10 h-10 rounded object-cover bg-neutral-100" /> : <div className="w-10 h-10 rounded bg-neutral-100" />}
                      <div>
                        <Link to={`/admin/products/${p.id}`} className="font-medium hover:underline">{p.name}</Link>
                        <div className="text-xs text-neutral-500">{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{p.category_name || '—'}</td>
                  <td className="px-4 py-3 text-right">{formatMoney(p.price, p.currency)}</td>
                  <td className="px-4 py-3 text-right">{p.track_stock ? p.stock : '∞'}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${p.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'}`}>
                      {p.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Btn as="link" to={`/admin/products/${p.id}`} className="mr-1.5">Edit</Btn>
                    <Btn variant="danger" onClick={() => remove(p)}>Delete</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
