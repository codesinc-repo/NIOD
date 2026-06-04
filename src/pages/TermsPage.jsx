import LegalPage from './LegalPage';

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms & Conditions" updated="May 2026">
      <p>These terms govern your use of paresheyorganic.com and any purchase you make. By using the site you agree to them.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">1. Orders & pricing</h2>
      <p>All prices are listed in Pakistani Rupees (PKR) and include applicable taxes unless stated otherwise. We reserve the right to refuse or cancel any order — including obvious pricing errors. If we cancel an order before shipment, you owe nothing.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">2. Payment</h2>
      <p>We currently accept <strong>Cash on Delivery</strong> across Pakistan. Additional payment options will be added soon. For COD orders, please have the exact amount ready for the rider.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">3. Shipping</h2>
      <p>Standard shipping is a flat PKR 250 anywhere in Pakistan. Orders above PKR 5,000 ship free. Most orders dispatch within 1–2 business days and arrive in 3–5 working days. See our <a href="/shipping" className="underline">shipping policy</a> for details.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">4. Returns</h2>
      <p>Skincare products that have been opened cannot be returned for hygiene reasons. Unopened products can be returned within 7 days of delivery for a refund or exchange. Damaged or incorrect items are always our responsibility — message us and we’ll fix it.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">5. Allergies & sensitivities</h2>
      <p>While our formulations are plant-based and gentle, individual reactions can happen. We recommend patch-testing new products on the inside of your forearm. Please read the ingredient list and consult a dermatologist if you have a known allergy.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">6. Intellectual property</h2>
      <p>All content on this site — copy, images, product names — belongs to Pareshey Organic. Don’t copy or reuse without permission.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">7. Limitation of liability</h2>
      <p>To the extent permitted by law, Pareshey Organic isn’t liable for indirect or consequential losses from the use of our products or website.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">8. Governing law</h2>
      <p>These terms are governed by the laws of the Islamic Republic of Pakistan. Any disputes will be handled by the courts of Lahore.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">9. Contact</h2>
      <p><a href="mailto:paresheyorganics@gmail.com" className="underline">paresheyorganics@gmail.com</a></p>
    </LegalPage>
  );
}
