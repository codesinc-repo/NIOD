import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { Btn, Card, PageTitle, TextField } from './_shared';

const KNOWN = [
  { key: 'shop_name', label: 'Shop name' },
  { key: 'shop_email', label: 'Shop email' },
  { key: 'currency', label: 'Currency (ISO code)' },
  { key: 'shipping_flat_rate', label: 'Shipping flat rate' },
  { key: 'free_shipping_threshold', label: 'Free shipping above' },
  { key: 'tax_rate_percent', label: 'Tax rate (%)' },
  { key: 'cod_enabled', label: 'COD enabled (1/0)' },
];

export default function AdminSettings() {
  const { data, loading, reload } = useApi('/api/admin/settings', { admin: true });
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { if (data) setForm(data); }, [data]);

  async function save() {
    setSaving(true); setMessage('');
    try {
      await api.put('/api/admin/settings', form, { admin: true });
      setMessage('Saved.');
      reload();
    } catch (err) {
      setMessage(err?.body?.message || err.message);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 2500);
    }
  }

  return (
    <div>
      <PageTitle title="Settings"
        action={<Btn variant="primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn>} />
      {loading ? <div className="text-sm text-neutral-500">Loading…</div> : (
        <Card className="p-5 space-y-4 max-w-2xl">
          {KNOWN.map((k) => (
            <TextField key={k.key} label={k.label} value={form[k.key] ?? ''} onChange={(e) => setForm({ ...form, [k.key]: e.target.value })} />
          ))}
          {message && <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">{message}</div>}
        </Card>
      )}
    </div>
  );
}
