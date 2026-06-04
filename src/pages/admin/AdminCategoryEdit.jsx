import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { Btn, Card, PageTitle, TextField, TextArea, Select, Toggle } from './_shared';

const empty = { name: '', slug: '', parent_id: '', description: '', hero_eyebrow: '', hero_title: '', hero_copy: '', hero_image: '', sort_order: 0, is_active: true };

export default function AdminCategoryEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const { data: cats } = useApi('/api/admin/categories', { admin: true });
  const { data: existing } = useApi(isNew ? null : `/api/admin/categories/${id}`, { admin: true });
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (existing) setForm({ ...empty, ...existing, parent_id: existing.parent_id ?? '', is_active: !!existing.is_active });
  }, [existing]);

  async function onSubmit(e) {
    e.preventDefault();
    setError(''); setSaving(true);
    try {
      const payload = { ...form, parent_id: form.parent_id || null };
      if (isNew) await api.post('/api/admin/categories', payload, { admin: true });
      else       await api.put(`/api/admin/categories/${id}`, payload, { admin: true });
      navigate('/admin/categories');
    } catch (err) {
      setError(err?.body?.message || err.message);
    } finally { setSaving(false); }
  }

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  return (
    <form onSubmit={onSubmit}>
      <PageTitle title={isNew ? 'New Category' : 'Edit Category'}
        action={<div className="flex gap-2"><Btn as="link" to="/admin/categories">Cancel</Btn><Btn type="submit" variant="primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn></div>} />
      {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 space-y-4 lg:col-span-2">
          <TextField label="Name" required value={form.name} onChange={(e) => set({ name: e.target.value })} />
          <TextField label="Slug" placeholder="auto-generated if blank" value={form.slug} onChange={(e) => set({ slug: e.target.value })} />
          <TextArea label="Description" value={form.description || ''} onChange={(e) => set({ description: e.target.value })} />
          <div className="font-medium pt-2">Hero section</div>
          <TextField label="Eyebrow text" value={form.hero_eyebrow || ''} onChange={(e) => set({ hero_eyebrow: e.target.value })} />
          <TextField label="Hero title" value={form.hero_title || ''} onChange={(e) => set({ hero_title: e.target.value })} />
          <TextArea label="Hero copy" value={form.hero_copy || ''} onChange={(e) => set({ hero_copy: e.target.value })} />
          <TextField label="Hero image URL" value={form.hero_image || ''} onChange={(e) => set({ hero_image: e.target.value })} />
        </Card>
        <Card className="p-5 space-y-4">
          <Select label="Parent category" value={form.parent_id || ''} onChange={(e) => set({ parent_id: e.target.value })}
            options={[{ value: '', label: '— Top level —' }, ...((cats || []).filter((c) => String(c.id) !== String(id)).map((c) => ({ value: c.id, label: c.name })))]} />
          <TextField label="Sort order" type="number" value={form.sort_order || 0} onChange={(e) => set({ sort_order: parseInt(e.target.value || '0', 10) })} />
          <Toggle label="Active" checked={form.is_active} onChange={(v) => set({ is_active: v })} />
        </Card>
      </div>
    </form>
  );
}
