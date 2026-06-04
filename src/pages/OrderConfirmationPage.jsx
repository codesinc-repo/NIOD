import { Link, useParams, useSearchParams } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import { useApi } from '../lib/hooks';
import { formatMoney, formatDateTime } from '../lib/format';

export default function OrderConfirmationPage() {
  const { orderNumber } = useParams();
  const [params] = useSearchParams();
  const email = params.get('email') || '';
  const { data: o, loading, error } = useApi(orderNumber ? `/api/orders/${orderNumber}${email ? `?email=${encodeURIComponent(email)}` : ''}` : null);

  return (
    <StoreShell>
      <div className="max-w-3xl mx-auto px-4 py-12">
        {loading ? <div className="text-sm text-neutral-500">Loading…</div>
          : error || !o ? (
            <div className="text-center py-12">
              <h1 className="text-2xl font-light mb-3">Order not found</h1>
              <p className="text-sm text-neutral-500">{error?.body?.message || 'Please check the link.'}</p>
              <Link to="/" className="inline-block mt-4 px-5 py-2.5 bg-black text-white text-sm rounded-full">Back to home</Link>
            </div>
          ) : (
            <div>
              <div className="text-center mb-10">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">✓</div>
                <h1 className="text-3xl font-light mt-4">Thank you for your order</h1>
                <p className="text-sm text-neutral-600 mt-2">Order <span className="font-medium">{o.order_number}</span> · placed {formatDateTime(o.placed_at)}</p>
                {o.payment_method === 'cod' && <p className="text-sm text-neutral-600 mt-1">Pay <span className="font-medium">{formatMoney(o.grand_total, o.currency)}</span> in cash on delivery.</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="border border-neutral-200 rounded-xl p-5">
                  <div className="text-xs uppercase text-neutral-500 tracking-wider mb-2">Shipping to</div>
                  <div className="text-sm">
                    <div className="font-medium">{o.ship_full_name}</div>
                    <div>{o.ship_line1}{o.ship_line2 ? `, ${o.ship_line2}` : ''}</div>
                    <div>{o.ship_city}{o.ship_state ? `, ${o.ship_state}` : ''} {o.ship_postal_code || ''}</div>
                    <div>{o.ship_country}</div>
                    {o.ship_phone && <div className="mt-1 text-neutral-500">{o.ship_phone}</div>}
                  </div>
                </div>
                <div className="border border-neutral-200 rounded-xl p-5">
                  <div className="text-xs uppercase text-neutral-500 tracking-wider mb-2">Order summary</div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span>{formatMoney(o.subtotal, o.currency)}</span></div>
                    {Number(o.discount_total) > 0 && <div className="flex justify-between text-emerald-700"><span>Discount</span><span>−{formatMoney(o.discount_total, o.currency)}</span></div>}
                    <div className="flex justify-between"><span className="text-neutral-600">Shipping</span><span>{Number(o.shipping_total) === 0 ? 'Free' : formatMoney(o.shipping_total, o.currency)}</span></div>
                    {Number(o.tax_total) > 0 && <div className="flex justify-between"><span className="text-neutral-600">Tax</span><span>{formatMoney(o.tax_total, o.currency)}</span></div>}
                    <div className="flex justify-between font-medium pt-2 mt-2 border-t border-neutral-200"><span>Total</span><span>{formatMoney(o.grand_total, o.currency)}</span></div>
                  </div>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-xl">
                <div className="px-5 py-3 border-b border-neutral-200 text-xs uppercase text-neutral-500 tracking-wider">Items</div>
                <ul className="divide-y divide-neutral-100">
                  {(o.items || []).map((it) => (
                    <li key={it.id} className="px-5 py-4 flex items-center gap-4">
                      {it.product_image && <img src={it.product_image} alt="" className="w-14 h-14 rounded bg-neutral-50 object-cover" />}
                      <div className="flex-1">
                        <div className="text-sm font-medium">{it.product_name}</div>
                        {it.size_label && <div className="text-xs text-neutral-500">{it.size_label}</div>}
                      </div>
                      <div className="text-sm text-neutral-500">×{it.qty}</div>
                      <div className="text-sm font-medium w-20 text-right">{formatMoney(it.line_total, o.currency)}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center mt-8">
                <Link to="/" className="inline-block px-5 py-2.5 bg-black text-white text-sm rounded-full">Back to home</Link>
              </div>
            </div>
          )}
      </div>
    </StoreShell>
  );
}
