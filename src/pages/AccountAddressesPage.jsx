import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/hooks';
import { api } from '../lib/api';

const empty = { label: '', full_name: '', phone: '', line1: '', line2: '', city: '', state: '', postal_code: '', country: 'PK', is_default: false };

export default function AccountAddressesPage() {
  const { user, loading } = useAuth();
  const { data, reload } = useApi(user ? '/api/addresses' : null, { auth: true });
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  if (loading) return <StoreShell><div className="max-w-3xl mx-auto px-4 py-16 text-sm text-neutral-500">Loading…</div></StoreShell>;
  if (!user)   return <Navigate to="/login?next=/account/addresses" replace />;
  const rows = data || [];

  async function save() {
    setSaving(true);
    try {
      const { id, ...payload } = editing;
      if (id) await api.put(`/api/addresses/${id}`, payload, { auth: true });
      else    await api.post('/api/addresses', payload, { auth: true });
      setEditing(null); reload();
    } finally { setSaving(false); }
  }
  async function remove(a) { if (confirm('Delete address?')) { await api.delete(`/api/addresses/${a.id}`, { auth: true }); reload(); } }

  return (
    <StoreShell>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link to="/account" className="text-sm text-neutral-500 hover:underline">← Account</Link>
        <div className="flex items-center justify-between mt-2 mb-6">
          <h1 className="text-3xl font-light">Addresses</h1>
          <button onClick={() => setEditing({ ...empty })} className="px-4 py-2 bg-black text-white rounded-full text-sm">+ Add address</button>
        </div>
        {rows.length === 0 ? <div className="text-sm text-neutral-600">No saved addresses yet.</div> : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rows.map((a) => (
              <li key={a.id} className="border border-neutral-200 rounded-xl p-5 text-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{a.label || 'Address'}</div>
                  {a.is_default ? <span className="text-[10px] uppercase tracking-wider bg-neutral-900 text-white px-2 py-0.5 rounded-full">Default</span> : null}
                </div>
                <div>{a.full_name}</div>
                {a.phone && <div className="text-neutral-500">{a.phone}</div>}
                <div className="mt-1">{a.line1}{a.line2 ? `, ${a.line2}` : ''}</div>
                <div>{a.city}{a.state ? `, ${a.state}` : ''} {a.postal_code || ''}</div>
                <div>{a.country}</div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => setEditing(a)} className="text-xs underline">Edit</button>
                  <button onClick={() => remove(a)} className="text-xs underline text-red-600">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {editing && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setEditing(null)}>
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-semibold mb-4">{editing.id ? 'Edit address' : 'New address'}</h2>
              <div className="space-y-3">
                <input placeholder="Label (Home, Office…)" value={editing.label || ''} onChange={(e) => setEditing({ ...editing, label: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                <input required placeholder="Full name" value={editing.full_name} onChange={(e) => setEditing({ ...editing, full_name: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                <input placeholder="Phone" value={editing.phone || ''} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                <input required placeholder="Address line 1" value={editing.line1} onChange={(e) => setEditing({ ...editing, line1: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                <input placeholder="Address line 2" value={editing.line2 || ''} onChange={(e) => setEditing({ ...editing, line2: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                <div className="grid grid-cols-3 gap-2">
                  <input required placeholder="City" value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                  <input placeholder="State" value={editing.state || ''} onChange={(e) => setEditing({ ...editing, state: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                  <input placeholder="Postal" value={editing.postal_code || ''} onChange={(e) => setEditing({ ...editing, postal_code: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                </div>
                <input placeholder="Country" value={editing.country} onChange={(e) => setEditing({ ...editing, country: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!editing.is_default} onChange={(e) => setEditing({ ...editing, is_default: e.target.checked })} /> Set as default</label>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm border border-neutral-300 rounded-lg">Cancel</button>
                <button onClick={save} disabled={saving} className="px-4 py-2 text-sm bg-black text-white rounded-lg">{saving ? 'Saving…' : 'Save'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StoreShell>
  );
}
