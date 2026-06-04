import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { formatDate } from '../../lib/format';
import { Btn, Card, PageTitle, TextField, Select, Toggle, EmptyState } from './_shared';

const empty = { code: '', type: 'percent', value: 10, min_subtotal: 0, starts_at: '', ends_at: '', usage_limit: '', is_active: true };

export default function AdminCoupons() {
  const { data, loading, reload } = useApi('/api/admin/coupons', { admin: true });
  const rows = data || [];
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function startNew() { setEditing({ ...empty }); setError(''); }
  function startEdit(r) { setEditing({ ...r, starts_at: r.starts_at || '', ends_at: r.ends_at || '', usage_limit: r.usage_limit ?? '' }); setError(''); }
  async function save() {
    setSaving(true); setError('');
    try {
      const { id, ...payload } = editing;
      payload.usage_limit = payload.usage_limit === '' ? null : Number(payload.usage_limit);
      payload.starts_at = payload.starts_at || null;
      payload.ends_at = payload.ends_at || null;
      if (id) await api.put(`/api/admin/coupons/${id}`, payload, { admin: true });
      else    await api.post('/api/admin/coupons', payload, { admin: true });
      setEditing(null); reload();
    } catch (err) { setError(err?.body?.message || err.message); }
    finally { setSaving(false); }
  }
  async function remove(r) {
    if (!confirm(`Delete coupon "${r.code}"?`)) return;
    await api.delete(`/api/admin/coupons/${r.id}`, { admin: true });
    reload();
  }

  return (
    <div>
      <PageTitle title="Coupons" subtitle={`${rows.length} total`}
        action={<Btn variant="primary" onClick={startNew}>+ New coupon</Btn>} />
      <Card className="overflow-hidden">
        {loading ? <div className="p-6 text-sm text-neutral-500">Loading…</div>
          : rows.length === 0 ? <EmptyState title="No coupons yet" action={<Btn variant="primary" onClick={startNew}>+ New coupon</Btn>} />
          : (
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 tracking-wider">
                <tr><th className="text-left px-4 py-2.5">Code</th><th className="text-left px-4 py-2.5">Type</th><th className="text-right px-4 py-2.5">Value</th><th className="text-right px-4 py-2.5">Min</th><th className="text-right px-4 py-2.5">Used</th><th className="text-left px-4 py-2.5">Expires</th><th className="text-center px-4 py-2.5">Active</th><th></th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                    <td className="px-4 py-3 font-medium">{r.code}</td>
                    <td className="px-4 py-3">{r.type}</td>
                    <td className="px-4 py-3 text-right">{r.type === 'percent' ? `${r.value}%` : r.value}</td>
                    <td className="px-4 py-3 text-right">{r.min_subtotal}</td>
                    <td className="px-4 py-3 text-right">{r.used_count}/{r.usage_limit ?? '∞'}</td>
                    <td className="px-4 py-3 text-neutral-600">{r.ends_at ? formatDate(r.ends_at) : '—'}</td>
                    <td className="px-4 py-3 text-center">{r.is_active ? '✓' : '—'}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <Btn className="mr-1.5" onClick={() => startEdit(r)}>Edit</Btn>
                      <Btn variant="danger" onClick={() => remove(r)}>Delete</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </Card>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">{editing.id ? 'Edit coupon' : 'New coupon'}</h2>
            {error && <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
            <div className="space-y-4">
              <TextField label="Code" required value={editing.code} onChange={(e) => setEditing({ ...editing, code: e.target.value.toUpperCase() })} />
              <div className="grid grid-cols-2 gap-3">
                <Select label="Type" value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                  options={[{ value: 'percent', label: 'Percent off' }, { value: 'fixed', label: 'Fixed amount off' }]} />
                <TextField label={editing.type === 'percent' ? 'Percent (1-100)' : 'Amount'} type="number" required value={editing.value} onChange={(e) => setEditing({ ...editing, value: parseFloat(e.target.value || '0') })} />
              </div>
              <TextField label="Minimum subtotal" type="number" value={editing.min_subtotal} onChange={(e) => setEditing({ ...editing, min_subtotal: parseFloat(e.target.value || '0') })} />
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Starts at" type="datetime-local" value={editing.starts_at || ''} onChange={(e) => setEditing({ ...editing, starts_at: e.target.value })} />
                <TextField label="Ends at" type="datetime-local" value={editing.ends_at || ''} onChange={(e) => setEditing({ ...editing, ends_at: e.target.value })} />
              </div>
              <TextField label="Usage limit (blank = unlimited)" type="number" value={editing.usage_limit ?? ''} onChange={(e) => setEditing({ ...editing, usage_limit: e.target.value })} />
              <Toggle label="Active" checked={editing.is_active} onChange={(v) => setEditing({ ...editing, is_active: v })} />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Btn onClick={() => setEditing(null)}>Cancel</Btn>
              <Btn variant="primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
