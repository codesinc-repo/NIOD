import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { formatDateTime } from '../../lib/format';
import { Btn, Card, PageTitle, EmptyState } from './_shared';

export default function AdminSubscribers() {
  const { data, loading, reload } = useApi('/api/admin/subscribers', { admin: true });
  const rows = data || [];
  async function remove(r) { if (confirm(`Remove ${r.email}?`)) { await api.delete(`/api/admin/subscribers/${r.id}`, { admin: true }); reload(); } }
  function exportCsv() {
    const csv = ['email,source,created_at', ...rows.map((r) => `${r.email},${r.source || ''},${r.created_at}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'subscribers.csv'; a.click(); URL.revokeObjectURL(url);
  }
  return (
    <div>
      <PageTitle title="Subscribers" subtitle={`${rows.length} email(s)`}
        action={<Btn onClick={exportCsv} disabled={!rows.length}>Export CSV</Btn>} />
      <Card className="overflow-hidden">
        {loading ? <div className="p-6 text-sm text-neutral-500">Loading…</div>
          : rows.length === 0 ? <EmptyState title="No subscribers yet" />
          : (
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 tracking-wider"><tr><th className="text-left px-4 py-2.5">Email</th><th className="text-left px-4 py-2.5">Source</th><th className="text-left px-4 py-2.5">Joined</th><th></th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                    <td className="px-4 py-3">{r.email}</td>
                    <td className="px-4 py-3 text-neutral-500">{r.source || '—'}</td>
                    <td className="px-4 py-3 text-neutral-500">{formatDateTime(r.created_at)}</td>
                    <td className="px-4 py-3 text-right"><Btn variant="danger" onClick={() => remove(r)}>Remove</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </Card>
    </div>
  );
}
