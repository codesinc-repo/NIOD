import { Link } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import { useCart } from '../lib/CartContext';
import { formatMoney } from '../lib/format';

export default function CartPage() {
  const { cart, loading, updateQty, removeItem } = useCart();
  const items = cart?.items || [];
  const subtotal = items.reduce((s, it) => s + Number(it.unit_price) * it.qty, 0);
  return (
    <StoreShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-light mb-8">Your Cart</h1>
        {loading ? <div className="text-sm text-neutral-500">Loading…</div>
          : items.length === 0 ? (
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-10 text-center">
              <p className="text-neutral-700">Your cart is empty.</p>
              <Link to="/category/best-sellers" className="inline-block mt-4 px-5 py-2.5 bg-black text-white text-sm rounded-full">Shop bestsellers</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 divide-y divide-neutral-200 border-y border-neutral-200">
                {items.map((it) => (
                  <div key={it.id} className="py-5 flex gap-4 items-center">
                    <img src={it.product_image} alt="" className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-neutral-50 object-cover" />
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${it.product_slug}`} className="text-sm sm:text-base font-medium hover:underline block">{it.product_name}</Link>
                      {it.size_label && <div className="text-xs text-neutral-500 mt-0.5">{it.size_label}</div>}
                      <div className="text-sm text-neutral-700 mt-1">{formatMoney(it.unit_price)}</div>
                    </div>
                    <div className="flex items-center gap-1.5 border border-neutral-300 rounded-full">
                      <button onClick={() => updateQty(it.id, it.qty - 1)} className="w-8 h-8 hover:bg-neutral-100 rounded-full text-lg leading-none">−</button>
                      <span className="text-sm w-6 text-center">{it.qty}</span>
                      <button onClick={() => updateQty(it.id, it.qty + 1)} className="w-8 h-8 hover:bg-neutral-100 rounded-full text-lg leading-none">+</button>
                    </div>
                    <div className="text-sm font-medium w-20 sm:w-24 text-right">{formatMoney(Number(it.unit_price) * it.qty)}</div>
                    <button onClick={() => removeItem(it.id)} className="text-xs text-neutral-500 hover:text-red-600">Remove</button>
                  </div>
                ))}
              </div>
              <aside className="bg-neutral-50 rounded-xl p-6 h-fit border border-neutral-200">
                <h2 className="font-medium mb-4">Order summary</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span>{formatMoney(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-600">Shipping</span><span className="text-neutral-500">Calculated at checkout</span></div>
                </div>
                <div className="flex justify-between text-base font-medium mt-4 pt-4 border-t border-neutral-200"><span>Total</span><span>{formatMoney(subtotal)}</span></div>
                <Link to="/checkout" className="mt-5 block w-full text-center bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-neutral-800">Checkout</Link>
                <Link to="/" className="mt-3 block w-full text-center border border-neutral-300 py-3 rounded-full text-sm hover:bg-neutral-100">Continue shopping</Link>
              </aside>
            </div>
          )}
      </div>
    </StoreShell>
  );
}
