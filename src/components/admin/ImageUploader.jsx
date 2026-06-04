// Reusable image picker for the admin: drag-drop, file picker, or paste URL.
// Uploads to /api/media (admin auth) and returns the resulting public URL via onChange.
import { useRef, useState } from 'react';
import { apiBase, tokenStore } from '../../lib/api';

export default function ImageUploader({ value, onChange, label = 'Image', height = 160, allowUrl = true }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  async function uploadFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please pick an image file.'); return; }
    if (file.size > 8 * 1024 * 1024)     { setError('Max size is 8 MB.'); return; }
    setError(''); setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${apiBase}/api/media`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${tokenStore.getAdmin()}` },
        body: fd,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message || `Upload failed (${res.status})`);
      onChange?.(json.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div>
      {label && <div className="text-xs font-medium text-neutral-700 mb-1.5">{label}</div>}

      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault(); setDragOver(false);
          const f = e.dataTransfer.files?.[0]; if (f) uploadFile(f);
        }}
        style={{ height }}
        className={`relative w-full rounded-lg border-2 border-dashed flex items-center justify-center text-center px-4 transition cursor-pointer ${dragOver ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-300 hover:border-neutral-500 bg-white'} ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        {value ? (
          <>
            <img src={value} alt="" className="max-h-full max-w-full object-contain" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange?.(''); }}
              className="absolute top-2 right-2 bg-white border border-neutral-300 rounded-full w-6 h-6 text-xs hover:bg-red-50 hover:border-red-300"
              aria-label="Remove image"
            >×</button>
          </>
        ) : (
          <div className="text-xs text-neutral-500">
            {uploading ? (
              <span>Uploading…</span>
            ) : (
              <>
                <div className="font-medium text-neutral-700">Click or drop an image</div>
                <div className="mt-0.5">PNG, JPG, WebP — up to 8 MB</div>
              </>
            )}
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => uploadFile(e.target.files?.[0])}
        />
      </div>

      {allowUrl && (
        <div className="mt-2 flex items-center gap-2">
          <input
            type="url"
            placeholder="or paste an image URL"
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-xs"
          />
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
