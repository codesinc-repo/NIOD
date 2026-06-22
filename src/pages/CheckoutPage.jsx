import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import { useCart } from '../lib/CartContext';
import { useAuth } from '../lib/AuthContext';
import { api } from '../lib/api';
import { useApi } from '../lib/hooks';
import { formatMoney } from '../lib/format';

export default function CheckoutPage() {
  const { cart, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: settings } = useApi('/api/settings');

  const items = cart?.items || [];
  const subtotal = items.reduce((s, it) => s + Number(it.unit_price) * it.qty, 0);

  const [form, setForm] = useState({
    email: user?.email || '',
    phone: '',
    full_name: user?.name || '',
    line1: '', line2: '', city: '', state: '', postal_code: '', country: 'PK',
    payment_method: 'cod',
    notes: '',
  });
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, email: user.email || f.email, full_name: user.name || f.full_name }));
  }, [user]);

  const shipFlat = Number(settings?.shipping_flat_rate || 0);
  const freeThreshold = Number(settings?.free_shipping_threshold || 0);
  const shippingTotal = subtotal >= freeThreshold ? 0 : shipFlat;
  const taxableBase = Math.max(subtotal - discount, 0);
  const taxRate = Number(settings?.tax_rate_percent || 0);
  const taxTotal = Math.round(taxableBase * taxRate) / 100;
  const grand = Math.round((taxableBase + shippingTotal + taxTotal) * 100) / 100;

  async function applyCoupon() {
    if (!coupon) return;
    setCouponError('');
    try {
      const r = await api.post('/api/cart/coupon-preview', { code: coupon, subtotal });
      setDiscount(Number(r.discount || 0));
      setAppliedCode(r.code);
    } catch (err) {
      setDiscount(0); setAppliedCode(null);
      setCouponError(err?.body?.message || 'Invalid code');
    }
  }
  function removeCoupon() { setDiscount(0); setAppliedCode(null); setCoupon(''); setCouponError(''); }

  async function placeOrder(e) {
    e.preventDefault();
    if (items.length === 0) { setError('Your cart is empty.'); return; }
    setError(''); setSubmitting(true);
    try {
      const order = await api.post('/api/orders/checkout', {
        email: form.email,
        phone: form.phone,
        payment_method: form.payment_method,
        coupon_code: appliedCode,
        notes: form.notes,
        shipping: {
          full_name: form.full_name, phone: form.phone,
          line1: form.line1, line2: form.line2,
          city: form.city, state: form.state, postal_code: form.postal_code,
          country: form.country,
        },
      }, { cart: true, auth: !!user });
      await clear();
      navigate(`/order-confirmation/${order.order_number}?email=${encodeURIComponent(form.email)}`, { replace: true });
    } catch (err) {
      setError(err?.body?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <StoreShell>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-light mb-3">Your cart is empty</h1>
          <Link to="/" className="inline-block mt-3 px-5 py-2.5 bg-black text-white text-sm rounded-full">Continue shopping</Link>
        </div>
      </StoreShell>
    );
  }

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  return (
    <StoreShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-light mb-8">Checkout</h1>
        <form onSubmit={placeOrder} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <section>
              <h2 className="font-medium mb-3">Contact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="email" required placeholder="Email" value={form.email} onChange={(e) => set({ email: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                <input type="tel" required placeholder="Phone" value={form.phone} onChange={(e) => set({ phone: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
              </div>
              {!user && <Link to="/login" className="inline-block mt-2 text-xs text-neutral-600 underline">Already have an account? Sign in</Link>}
            </section>

            <section>
              <h2 className="font-medium mb-3">Shipping address</h2>
              <div className="space-y-3">
                <input required placeholder="Full name" value={form.full_name} onChange={(e) => set({ full_name: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                <input required placeholder="Address line 1" value={form.line1} onChange={(e) => set({ line1: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                <input placeholder="Apartment, suite, etc. (optional)" value={form.line2} onChange={(e) => set({ line2: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <input required placeholder="City" value={form.city} onChange={(e) => set({ city: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                  <input placeholder="State / Province" value={form.state} onChange={(e) => set({ state: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                  <input placeholder="Postal code" value={form.postal_code} onChange={(e) => set({ postal_code: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm" />
                </div>
                <select value={form.country} onChange={(e) => set({ country: e.target.value })} className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
                  <option value="PK">Pakistan</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                </select>
              </div>
            </section>

            <section>
              <h2 className="font-medium mb-3">Payment method</h2>
              <div className="space-y-3">
                <label className="flex items-start gap-3 border border-neutral-300 rounded-lg px-4 py-3 cursor-pointer">
                  <input type="radio" name="payment_method" value="cod" checked={form.payment_method === 'cod'} onChange={() => set({ payment_method: 'cod' })} />
                  <div>
                    <div className="text-sm font-medium">Cash on Delivery</div>
                    <div className="text-xs text-neutral-500">Pay the rider when your order arrives.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 border border-neutral-300 rounded-lg px-4 py-3 cursor-pointer">
                  <div>
                    <div className="text-sm font-medium">Easypaisa (Advance Cash)</div>
                    <div className="text-xs text-neutral-500 mt-1">
                      Send advance payment to <strong className="text-base font-bold text-neutral-900 block my-1">03002116104</strong>
                    </div>
                  </div>
                </label>
              </div>
            </section>

            <section>
              <h2 className="font-medium mb-2">Order notes (optional)</h2>
              <textarea value={form.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="Anything we should know?" className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm min-h-[80px]" />
            </section>
          </div>

          <aside className="lg:col-span-2 bg-neutral-50 border border-neutral-200 rounded-xl p-6 h-fit">
            <h2 className="font-medium mb-4">Order summary</h2>
            <ul className="divide-y divide-neutral-200 mb-4 max-h-72 overflow-y-auto">
              {items.map((it) => (
                <li key={it.id} className="py-3 flex gap-3 items-center">
                  <img src={it.product_image} alt="" className="w-14 h-14 rounded bg-white object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{it.product_name}</div>
                    <div className="text-xs text-neutral-500">{it.size_label || ''} {it.size_label && '·'} Qty {it.qty}</div>
                  </div>
                  <div className="text-sm">{formatMoney(Number(it.unit_price) * it.qty)}</div>
                </li>
              ))}
            </ul>

            <div className="flex gap-2 mb-4">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} placeholder="Coupon code" className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm" />
              {appliedCode ? <button type="button" onClick={removeCoupon} className="px-3 py-2 text-xs border border-neutral-300 rounded-lg">Remove</button>
                : <button type="button" onClick={applyCoupon} className="px-3 py-2 text-xs bg-black text-white rounded-lg">Apply</button>}
            </div>
            {couponError && <div className="mb-2 text-xs text-red-600">{couponError}</div>}

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span>{formatMoney(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-emerald-700"><span>Discount ({appliedCode})</span><span>−{formatMoney(discount)}</span></div>}
              <div className="flex justify-between"><span className="text-neutral-600">Shipping</span><span>{shippingTotal === 0 ? 'Free' : formatMoney(shippingTotal)}</span></div>
              {taxTotal > 0 && <div className="flex justify-between"><span className="text-neutral-600">Tax</span><span>{formatMoney(taxTotal)}</span></div>}
              <div className="flex justify-between text-base font-medium pt-3 mt-2 border-t border-neutral-200"><span>Total</span><span>{formatMoney(grand)}</span></div>
            </div>
            {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
            <button disabled={submitting} className="mt-5 w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-neutral-800 disabled:opacity-60">{submitting ? 'Placing order…' : `Place order · ${formatMoney(grand)}`}</button>
            <p className="mt-3 text-[11px] text-neutral-500 text-center">
              {form.payment_method === 'easypaisa'
                ? 'Please send the advance payment to Easypaisa number 03002116104 and include your order details.'
                : 'You will pay in cash at the time of delivery.'}
            </p>
          </aside>
        </form>
      </div>
    </StoreShell>
  );
}
