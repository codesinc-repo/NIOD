import LegalPage from './LegalPage';

export default function ShippingPage() {
  return (
    <LegalPage eyebrow="Customer Care" title="Shipping & Returns" updated="May 2026">
      <h2 className="text-xl font-medium mt-4 mb-2">Shipping</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Flat rate:</strong> PKR 250 anywhere in Pakistan.</li>
        <li><strong>Free shipping</strong> on orders above PKR 5,000.</li>
        <li><strong>Dispatch:</strong> 1–2 business days from order placement.</li>
        <li><strong>Delivery:</strong> typically 3–5 working days nationwide.</li>
        <li>You’ll receive an order number (e.g. <code>NIO-…</code>) — track status from your account dashboard.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-2">Cash on Delivery</h2>
      <p>We currently accept COD across Pakistan. The rider will collect the order total in cash on arrival — please keep the exact amount ready. We’re working on online payment options and they’ll be added soon.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">Returns</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Opened products:</strong> for hygiene reasons, opened skincare cannot be returned.</li>
        <li><strong>Unopened products:</strong> may be returned within 7 days of delivery for a refund or exchange. The buyer covers return courier.</li>
        <li><strong>Damaged or incorrect items:</strong> always our responsibility — message us within 48 hours of delivery and we’ll replace or refund, courier on us.</li>
        <li><strong>Refunds:</strong> processed within 5–7 business days after we receive the returned product.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-2">Need help?</h2>
      <p>Email <a href="mailto:hello@paresheyorganic.com" className="underline">hello@paresheyorganic.com</a> or WhatsApp <a href="tel:+923001234567" className="underline">+92 300 1234567</a>. Please have your order number ready.</p>
    </LegalPage>
  );
}
