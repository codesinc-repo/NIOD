import { useState } from 'react';
import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { formatDateTime } from '../../lib/format';
import { Btn, Card, PageTitle, EmptyState } from './_shared';

export default function AdminContactMessages() {
  const [unread, setUnread] = useState(false);
  const { data, loading, reload } = useApi(`/api/admin/contact-messages?unread=${unread ? '1' : '0'}`, { admin: true });
  const rows = data || [];

  async function markRead(r) { await api.patch(`/api/admin/contact-messages/${r.id}/read`, {}, { admin: true }); reload(); }
  async function remove(r) { if (confirm('Delete?')) { await api.delete(`/api/admin/contact-messages/${r.id}`, { admin: true }); reload(); } }

  return (
    <div>
      <PageTitle title="Contact Messages" subtitle={`${rows.length} shown`}
        action={
          <div className="flex gap-1.5">
            <button onClick={() => setUnread(false)} className={`text-xs px-3 py-1.5 rounded-lg border ${!unread ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-300'}`}>All</button>
            <button onClick={() => setUnread(true)} className={`text-xs px-3 py-1.5 rounded-lg border ${unread ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-300'}`}>Unread</button>
          </div>
        } />
      <Card className="overflow-hidden">
        {loading ? <div className="p-6 text-sm text-neutral-500">Loading…</div>
          : rows.length === 0 ? <EmptyState title="No messages" />
          : (
            <ul className="divide-y divide-neutral-100">
              {rows.map((m) => (
                <li key={m.id} className={`p-4 sm:p-5 ${m.is_read ? '' : 'bg-amber-50/50'}`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{m.name} <span className="text-neutral-400">·</span> <a href={`mailto:${m.email}`} className="text-neutral-600 hover:underline">{m.email}</a> {m.phone && <span className="text-neutral-500"> · {m.phone}</span>}</div>
                      <div className="text-xs text-neutral-500">{formatDateTime(m.created_at)}{m.subject && ` · ${m.subject}`}</div>
                      <p className="text-sm text-neutral-700 mt-2 whitespace-pre-line">{m.message}</p>
                    </div>
                    <div className="flex gap-1.5">
                      {!m.is_read && <Btn onClick={() => markRead(m)}>Mark read</Btn>}
                      <Btn variant="danger" onClick={() => remove(m)}>Delete</Btn>
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
