import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { Btn, Card, PageTitle, TextField, TextArea, Toggle } from './_shared';
import ImageUploader from '../../components/admin/ImageUploader';

const empty = { title: '', slug: '', excerpt: '', body: '', category: '', author: '', image: '', is_featured: false, is_published: true };

export default function AdminPostEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const { data: existing } = useApi(isNew ? null : `/api/admin/posts/${id}`, { admin: true });
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (existing) setForm({ ...empty, ...existing, is_featured: !!existing.is_featured, is_published: !!existing.is_published });
  }, [existing]);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  async function onSubmit(e) {
    e.preventDefault();
    setError(''); setSaving(true);
    try {
      if (isNew) await api.post('/api/admin/posts', form, { admin: true });
      else       await api.put(`/api/admin/posts/${id}`, form, { admin: true });
      navigate('/admin/posts');
    } catch (err) {
      setError(err?.body?.message || err.message);
    } finally { setSaving(false); }
  }

  return (
    <form onSubmit={onSubmit}>
      <PageTitle title={isNew ? 'New Post' : 'Edit Post'}
        action={<div className="flex gap-2"><Btn as="link" to="/admin/posts">Cancel</Btn><Btn type="submit" variant="primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn></div>} />
      {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 space-y-4 lg:col-span-2">
          <TextField label="Title" required value={form.title} onChange={(e) => set({ title: e.target.value })} />
          <TextField label="Slug" placeholder="auto-generated if blank" value={form.slug || ''} onChange={(e) => set({ slug: e.target.value })} />
          <TextArea label="Excerpt" value={form.excerpt || ''} onChange={(e) => set({ excerpt: e.target.value })} />
          <TextArea label="Body (HTML supported)" value={form.body || ''} onChange={(e) => set({ body: e.target.value })} rows={20} style={{ minHeight: 300 }} />
        </Card>
        <Card className="p-5 space-y-4">
          <TextField label="Category" value={form.category || ''} onChange={(e) => set({ category: e.target.value })} />
          <TextField label="Author" value={form.author || ''} onChange={(e) => set({ author: e.target.value })} />
          <ImageUploader label="Cover image" value={form.image} onChange={(url) => set({ image: url })} height={180} />
          <Toggle label="Published" checked={form.is_published} onChange={(v) => set({ is_published: v })} />
          <Toggle label="Featured" checked={form.is_featured} onChange={(v) => set({ is_featured: v })} />
        </Card>
      </div>
    </form>
  );
}
