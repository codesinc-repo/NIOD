// Generic CRUD UI for flat resources (concerns, member-benefits, social-cards, scientists).
// fields prop drives the form: [{ key, label, kind?: 'image' | 'number' | 'bool', required? }]
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { Btn, Card, PageTitle, TextField, Toggle, EmptyState } from './_shared';
import ImageUploader from '../../components/admin/ImageUploader';

export default function AdminSimpleList({ resource, title, fields }) {
  const path = `/api/admin/${resource}`;
  const { data, loading, reload } = useApi(path, { admin: true });
  const rows = data || [];
  const [editing, setEditing] = useState(null); // null=closed, {}=new, row=edit
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function startNew() {
    const blank = {};
    for (const f of fields) blank[f.key] = f.kind === 'bool' ? true : f.kind === 'number' ? 0 : '';
    setEditing(blank); setError('');
  }
  function startEdit(row) {
    const v = {};
    for (const f of fields) v[f.key] = row[f.key] ?? (f.kind === 'bool' ? false : f.kind === 'number' ? 0 : '');
    v.id = row.id;
    setEditing(v); setError('');
  }
  async function save() {
    setSaving(true); setError('');
    try {
      const { id, ...payload } = editing;
      if (id) await api.put(`${path}/${id}`, payload, { admin: true });
      else    await api.post(path, payload, { admin: true });
      setEditing(null);
      reload();
    } catch (err) {
      setError(err?.body?.message || err.message);
    } finally { setSaving(false); }
  }
  async function remove(row) {
    if (!confirm('Delete this entry?')) return;
    await api.delete(`${path}/${row.id}`, { admin: true });
    reload();
  }

  return (
    <div>
      <PageTitle title={title} subtitle={`${rows.length} total`}
        action={<Btn variant="primary" onClick={startNew}>+ New</Btn>} />

      <Card className="overflow-hidden">
        {loading ? <div className="p-6 text-sm text-neutral-500">Loading…</div>
          : rows.length === 0 ? <EmptyState title={`No ${title.toLowerCase()} yet`} action={<Btn variant="primary" onClick={startNew}>+ New</Btn>} />
          : (
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 tracking-wider">
                <tr>
                  {fields.map((f) => <th key={f.key} className="text-left px-4 py-2.5">{f.label}</th>)}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                    {fields.map((f) => (
                      <td key={f.key} className="px-4 py-3 text-neutral-700">
                        {f.kind === 'image' && r[f.key]
                          ? <img src={r[f.key]} alt="" className="w-10 h-10 rounded object-cover bg-neutral-100" />
                          : f.kind === 'bool'
                            ? (r[f.key] ? 'Yes' : 'No')
                            : String(r[f.key] ?? '').slice(0, 60)}
                      </td>
                    ))}
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
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">{editing.id ? `Edit ${title.slice(0, -1)}` : `New ${title.slice(0, -1)}`}</h2>
            {error && <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
            <div className="space-y-4">
              {fields.map((f) => {
                const val = editing[f.key];
                if (f.kind === 'bool') {
                  return <Toggle key={f.key} label={f.label} checked={!!val} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />;
                }
                if (f.kind === 'image') {
                  return <ImageUploader key={f.key} label={f.label} value={val} onChange={(url) => setEditing({ ...editing, [f.key]: url })} height={160} />;
                }
                return (
                  <TextField
                    key={f.key}
                    label={f.label}
                    type={f.kind === 'number' ? 'number' : 'text'}
                    required={!!f.required}
                    value={val ?? ''}
                    onChange={(e) => setEditing({ ...editing, [f.key]: f.kind === 'number' ? parseInt(e.target.value || '0', 10) : e.target.value })}
                  />
                );
              })}
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
