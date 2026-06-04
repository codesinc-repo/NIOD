import LegalPage from './LegalPage';

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="May 2026">
      <p>Pareshey Organic (“we”, “us”, “our”) respects your privacy. This policy explains what personal information we collect when you use paresheyorganic.com and how we use it.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">What we collect</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Account details</strong> — name, email, phone number and password (stored securely, never in plain text).</li>
        <li><strong>Order details</strong> — shipping address, items purchased, payment method (Cash on Delivery, for now).</li>
        <li><strong>Communications</strong> — anything you send via our contact form or newsletter signup.</li>
        <li><strong>Usage data</strong> — pages visited, basic device information, and anonymous analytics.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-2">How we use it</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>To fulfil and deliver your order, and contact you about it.</li>
        <li>To send the newsletter, only if you’ve opted in.</li>
        <li>To improve the website experience.</li>
        <li>To meet legal and tax obligations.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-2">What we don’t do</h2>
      <p>We never sell your personal data. We don’t share it with third parties except where strictly required to deliver your order (couriers) or comply with law.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">Your rights</h2>
      <p>You can access, correct or delete your data anytime. Email <a href="mailto:hello@paresheyorganic.com" className="underline">hello@paresheyorganic.com</a> or use the “Sign in → Account” menu to manage your details.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">Cookies</h2>
      <p>We use a single cookie to keep your shopping cart and login session alive. We don’t use third-party tracking cookies.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">Contact</h2>
      <p>Questions about privacy? <a href="mailto:hello@paresheyorganic.com" className="underline">hello@paresheyorganic.com</a></p>
    </LegalPage>
  );
}
