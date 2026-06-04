import { useRef, useState } from 'react';
import { api, apiBase, tokenStore } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { formatDateTime } from '../../lib/format';
import { Btn, Card, PageTitle, EmptyState } from './_shared';

export default function AdminMedia() {
  const { data, loading, reload } = useApi('/api/media', { admin: true });
  const rows = data || [];
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      // Use fetch directly so we get FormData behavior
      const res = await fetch(`${apiBase}/api/media`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${tokenStore.getAdmin()}` },
        body: fd,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message || 'Upload failed');
      reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  async function remove(m) {
    if (!confirm(`Delete ${m.original_name || m.filename}?`)) return;
    await api.delete(`/api/media/${m.id}`, { admin: true });
    reload();
  }

  function copy(url) {
    navigator.clipboard.writeText(url);
  }

  return (
    <div>
      <PageTitle title="Media" subtitle={`${rows.length} files`}
        action={
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer">
            {uploading ? 'Uploading…' : '+ Upload image'}
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
          </label>
        } />
      {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
      {loading ? <div className="text-sm text-neutral-500">Loading…</div>
        : rows.length === 0 ? <EmptyState title="No media yet" hint="Upload an image to get a public URL you can paste into products or posts." />
        : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {rows.map((m) => (
              <Card key={m.id} className="overflow-hidden">
                <img src={m.url} alt="" className="w-full aspect-square object-cover bg-neutral-50" />
                <div className="p-2 text-xs">
                  <div className="truncate" title={m.original_name}>{m.original_name || m.filename}</div>
                  <div className="text-neutral-400">{formatDateTime(m.created_at)}</div>
                  <div className="flex gap-1 mt-2">
                    <button onClick={() => copy(m.url)} className="flex-1 text-xs px-2 py-1 bg-neutral-100 hover:bg-neutral-200 rounded">Copy URL</button>
                    <button onClick={() => remove(m)} className="text-xs px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded">Del</button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
    </div>
  );
}
