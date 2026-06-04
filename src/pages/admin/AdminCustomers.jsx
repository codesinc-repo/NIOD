import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../lib/hooks';
import { formatDate } from '../../lib/format';
import { Card, PageTitle, EmptyState } from './_shared';

export default function AdminCustomers() {
  const [q, setQ] = useState('');
  const { data, loading } = useApi(`/api/admin/customers?q=${encodeURIComponent(q)}&limit=100`, { admin: true });
  const rows = Array.isArray(data) ? data : [];
  return (
    <div>
      <PageTitle title="Customers" subtitle={`${rows.length} shown`} />
      <div className="mb-4 flex gap-2">
        <input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} className="px-3 py-2 border border-neutral-300 rounded-lg text-sm w-72" />
      </div>
      <Card className="overflow-hidden">
        {loading ? <div className="p-6 text-sm text-neutral-500">Loading…</div>
          : rows.length === 0 ? <EmptyState title="No customers" />
          : (
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 tracking-wider">
                <tr><th className="text-left px-4 py-2.5">Name</th><th className="text-left px-4 py-2.5">Email</th><th className="text-left px-4 py-2.5">Phone</th><th className="text-left px-4 py-2.5">Joined</th></tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                    <td className="px-4 py-3"><Link to={`/admin/customers/${c.id}`} className="font-medium hover:underline">{c.name}</Link></td>
                    <td className="px-4 py-3 text-neutral-600">{c.email}</td>
                    <td className="px-4 py-3 text-neutral-600">{c.phone || '—'}</td>
                    <td className="px-4 py-3 text-neutral-600">{formatDate(c.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </Card>
    </div>
  );
}
