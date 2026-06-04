import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { Btn, Card, PageTitle, TextField, TextArea, Select, Toggle } from './_shared';
import ImageUploader from '../../components/admin/ImageUploader';

const empty = {
  name: '', slug: '', category_id: '', tag: '', benefit: '', description: '',
  price: '', compare_at_price: '', currency: 'PKR',
  stock: 0, track_stock: true,
  image: '',
  is_bestseller: false, is_new: false, is_featured: false, is_active: true,
  sort_order: 0,
  sizes: [],
  images: [],
};

export default function AdminProductEdit() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();

  const { data: cats } = useApi('/api/admin/categories', { admin: true });
  const { data: existing } = useApi(isNew ? null : `/api/admin/products/${id}`, { admin: true });

  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (existing) {
      setForm({
        ...empty,
        ...existing,
        category_id: existing.category_id ?? '',
        compare_at_price: existing.compare_at_price ?? '',
        track_stock: !!existing.track_stock,
        is_bestseller: !!existing.is_bestseller,
        is_new: !!existing.is_new,
        is_featured: !!existing.is_featured,
        is_active: !!existing.is_active,
        sizes: (existing.sizes || []).map((s) => ({ label: s.label, sku: s.sku || '', price_delta: s.price_delta || 0, stock: s.stock || 0 })),
        images: (existing.images || []).map((i) => ({ url: i.url, alt: i.alt || '' })),
      });
    }
  }, [existing]);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  async function onSubmit(e) {
    e.preventDefault();
    setError(''); setSaving(true);
    try {
      const payload = {
        ...form,
        category_id: form.category_id || null,
        compare_at_price: form.compare_at_price === '' ? null : form.compare_at_price,
      };
      if (isNew) {
        const created = await api.post('/api/admin/products', payload, { admin: true });
        navigate(`/admin/products/${created.id}`, { replace: true });
      } else {
        await api.put(`/api/admin/products/${id}`, payload, { admin: true });
        navigate('/admin/products');
      }
    } catch (err) {
      setError(err?.body?.message || err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <PageTitle
        title={isNew ? 'New Product' : `Edit Product`}
        subtitle={isNew ? undefined : form.slug}
        action={
          <div className="flex gap-2">
            <Btn as="link" to="/admin/products">Cancel</Btn>
            <Btn type="submit" variant="primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn>
          </div>
        }
      />

      {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5 space-y-4">
            <TextField label="Name" required value={form.name} onChange={(e) => set({ name: e.target.value })} />
            <TextField label="Slug (URL handle)" placeholder="leave blank to auto-generate" value={form.slug} onChange={(e) => set({ slug: e.target.value })} />
            <TextField label="Short benefit" placeholder="e.g. Oil Control, Brightens" value={form.benefit || ''} onChange={(e) => set({ benefit: e.target.value })} />
            <TextField label="Tag" placeholder="Bestseller / New / Award winner…" value={form.tag || ''} onChange={(e) => set({ tag: e.target.value })} />
            <TextArea label="Description" value={form.description || ''} onChange={(e) => set({ description: e.target.value })} />
          </Card>

          <Card className="p-5 space-y-4">
            <div className="font-medium">Pricing & inventory</div>
            <div className="grid grid-cols-3 gap-4">
              <TextField label="Price" type="number" step="0.01" required value={form.price} onChange={(e) => set({ price: e.target.value })} />
              <TextField label="Compare-at price" type="number" step="0.01" value={form.compare_at_price ?? ''} onChange={(e) => set({ compare_at_price: e.target.value })} />
              <TextField label="Currency" value={form.currency || 'PKR'} onChange={(e) => set({ currency: e.target.value })} />
            </div>
            <div className="grid grid-cols-3 gap-4 items-end">
              <TextField label="Stock" type="number" value={form.stock} onChange={(e) => set({ stock: parseInt(e.target.value || '0', 10) })} />
              <div className="pb-2"><Toggle label="Track stock" checked={form.track_stock} onChange={(v) => set({ track_stock: v })} /></div>
              <TextField label="Sort order" type="number" value={form.sort_order || 0} onChange={(e) => set({ sort_order: parseInt(e.target.value || '0', 10) })} />
            </div>
          </Card>

          <SizesEditor sizes={form.sizes} onChange={(sizes) => set({ sizes })} />

          <ImagesEditor images={form.images} onChange={(images) => set({ images })} />
        </div>

        <div className="space-y-6">
          <Card className="p-5 space-y-4">
            <Select label="Category" value={form.category_id || ''} onChange={(e) => set({ category_id: e.target.value })}
              options={[{ value: '', label: '— No category —' }, ...((cats || []).map((c) => ({ value: c.id, label: c.name })))]} />
            <ImageUploader label="Hero image" value={form.image} onChange={(url) => set({ image: url })} height={220} />
          </Card>

          <Card className="p-5 space-y-3">
            <div className="font-medium">Visibility</div>
            <Toggle label="Active (visible on storefront)" checked={form.is_active} onChange={(v) => set({ is_active: v })} />
            <Toggle label="Bestseller" checked={form.is_bestseller} onChange={(v) => set({ is_bestseller: v })} />
            <Toggle label="New arrival" checked={form.is_new} onChange={(v) => set({ is_new: v })} />
            <Toggle label="Featured" checked={form.is_featured} onChange={(v) => set({ is_featured: v })} />
          </Card>
        </div>
      </div>
    </form>
  );
}

function SizesEditor({ sizes, onChange }) {
  const add = () => onChange([...sizes, { label: '', sku: '', price_delta: 0, stock: 0 }]);
  const update = (i, patch) => onChange(sizes.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  const remove = (i) => onChange(sizes.filter((_, idx) => idx !== i));
  return (
    <Card className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-medium">Size variants</div>
        <Btn type="button" onClick={add}>+ Add size</Btn>
      </div>
      {sizes.length === 0 && <div className="text-sm text-neutral-500">No sizes — product is sold as a single SKU.</div>}
      {sizes.map((s, i) => (
        <div key={i} className="grid grid-cols-12 gap-2 items-end">
          <div className="col-span-3"><TextField label={i === 0 ? 'Label' : ''} placeholder="30ml" value={s.label} onChange={(e) => update(i, { label: e.target.value })} /></div>
          <div className="col-span-3"><TextField label={i === 0 ? 'SKU' : ''} value={s.sku || ''} onChange={(e) => update(i, { sku: e.target.value })} /></div>
          <div className="col-span-2"><TextField label={i === 0 ? 'Price Δ' : ''} type="number" step="0.01" value={s.price_delta || 0} onChange={(e) => update(i, { price_delta: parseFloat(e.target.value || '0') })} /></div>
          <div className="col-span-2"><TextField label={i === 0 ? 'Stock' : ''} type="number" value={s.stock || 0} onChange={(e) => update(i, { stock: parseInt(e.target.value || '0', 10) })} /></div>
          <div className="col-span-2"><Btn type="button" variant="danger" onClick={() => remove(i)}>Remove</Btn></div>
        </div>
      ))}
    </Card>
  );
}

function ImagesEditor({ images, onChange }) {
  const add = () => onChange([...images, { url: '', alt: '' }]);
  const update = (i, patch) => onChange(images.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  const remove = (i) => onChange(images.filter((_, idx) => idx !== i));
  return (
    <Card className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-medium">Gallery images</div>
        <Btn type="button" onClick={add}>+ Add image</Btn>
      </div>
      {images.length === 0 && <div className="text-sm text-neutral-500">No gallery images. The hero image will be used.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={i} className="border border-neutral-200 rounded-lg p-3 space-y-2">
            <ImageUploader label={`Image ${i + 1}`} value={img.url} onChange={(url) => update(i, { url })} height={140} />
            <TextField placeholder="Alt text (for accessibility)" value={img.alt || ''} onChange={(e) => update(i, { alt: e.target.value })} />
            <Btn type="button" variant="danger" className="w-full" onClick={() => remove(i)}>Remove</Btn>
          </div>
        ))}
      </div>
    </Card>
  );
}
