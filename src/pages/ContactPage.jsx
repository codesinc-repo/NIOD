import { useState } from 'react';
import StoreShell from '../components/StoreShell';
import { api } from '../lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState(''); // '', 'sending', 'ok', 'err'
  const [msg, setMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending'); setMsg('');
    try {
      await api.post('/api/contact', form);
      setStatus('ok');
      setMsg('Thanks — we’ve received your message and will reply within 1–2 business days.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus('err');
      setMsg(err?.body?.message || 'Something went wrong. Please try again or email us directly.');
    }
  }

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  return (
    <StoreShell>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xs uppercase tracking-widest text-neutral-500">Contact</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-light">We’d love to hear from you.</h1>
        <p className="mt-3 text-neutral-600 max-w-2xl">Questions about an order, ingredients, or your routine? Send us a message — our team replies within 1–2 business days.</p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <aside className="space-y-6 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Customer care</div>
              <a href="mailto:hello@paresheyorganic.com" className="text-base hover:underline">hello@paresheyorganic.com</a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Phone / WhatsApp</div>
              <a href="tel:+923001234567" className="text-base hover:underline">+92 300 1234567</a>
              <div className="text-xs text-neutral-500 mt-0.5">Mon–Sat, 10am–7pm PKT</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Studio address</div>
              <p>House 12, Block C<br />Lahore, Pakistan</p>
            </div>
            <div className="bg-[#f6f4f0] rounded-xl p-4 text-xs text-neutral-700">
              <strong className="block mb-1 text-neutral-900">Order issues?</strong>
              Have your order number ready (e.g. <code>NIO-…</code>) and we’ll resolve it faster.
            </div>
          </aside>

          <form onSubmit={onSubmit} className="lg:col-span-2 bg-white border border-neutral-200 rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required placeholder="Your name" value={form.name} onChange={(e) => set({ name: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
              <input required type="email" placeholder="Email" value={form.email} onChange={(e) => set({ email: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
            </div>
            <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => set({ phone: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
            <input placeholder="Subject" value={form.subject} onChange={(e) => set({ subject: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
            <textarea required placeholder="How can we help?" value={form.message} onChange={(e) => set({ message: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm min-h-[160px]" />
            {msg && <div className={`text-sm rounded-lg px-3 py-2 ${status === 'ok' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-red-600 bg-red-50 border border-red-200'}`}>{msg}</div>}
            <button disabled={status === 'sending'} className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Send message'}</button>
          </form>
        </div>
      </div>
    </StoreShell>
  );
}
