import { useState } from 'react';
import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { formatDate } from '../../lib/format';
import { Btn, Card, PageTitle, EmptyState } from './_shared';

export default function AdminReviews() {
  const [pending, setPending] = useState(true);
  const { data, loading, reload } = useApi(`/api/admin/reviews?pending=${pending ? '1' : '0'}`, { admin: true });
  const rows = data || [];
  async function approve(r) { await api.patch(`/api/admin/reviews/${r.id}`, { is_approved: true }, { admin: true }); reload(); }
  async function reject(r)  { if (confirm('Delete review?')) { await api.delete(`/api/admin/reviews/${r.id}`, { admin: true }); reload(); } }
  return (
    <div>
      <PageTitle title="Reviews"
        action={
          <div className="flex gap-1.5">
            <button onClick={() => setPending(true)} className={`text-xs px-3 py-1.5 rounded-lg border ${pending ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-300'}`}>Pending</button>
            <button onClick={() => setPending(false)} className={`text-xs px-3 py-1.5 rounded-lg border ${!pending ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-300'}`}>All</button>
          </div>
        } />
      <Card className="overflow-hidden">
        {loading ? <div className="p-6 text-sm text-neutral-500">Loading…</div>
          : rows.length === 0 ? <EmptyState title={pending ? 'No pending reviews' : 'No reviews'} />
          : (
            <ul className="divide-y divide-neutral-100">
              {rows.map((r) => (
                <li key={r.id} className="p-4 sm:p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{r.product_name || `Product #${r.product_id}`} <span className="text-neutral-400">·</span> <span className="text-amber-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span></div>
                      <div className="text-xs text-neutral-500 mt-0.5">{r.author_name} · {formatDate(r.created_at)} {r.is_approved ? ' · ✓ approved' : ' · pending'}</div>
                      {r.title && <div className="mt-2 font-medium">{r.title}</div>}
                      {r.body && <p className="text-sm text-neutral-700 mt-1 whitespace-pre-line">{r.body}</p>}
                    </div>
                    <div className="flex gap-1.5">
                      {!r.is_approved && <Btn variant="primary" onClick={() => approve(r)}>Approve</Btn>}
                      <Btn variant="danger" onClick={() => reject(r)}>Delete</Btn>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
      </Card>
    </div>
  );
}
