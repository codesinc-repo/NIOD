import { useState } from 'react';
import StoreShell from '../components/StoreShell';

const FAQ = [
  {
    section: 'Orders & shipping',
    items: [
      { q: 'How long does delivery take?',
        a: 'Most orders dispatch within 1–2 business days and arrive in 3–5 working days anywhere in Pakistan.' },
      { q: 'How much is shipping?',
        a: 'Flat PKR 250 — free on orders above PKR 5,000.' },
      { q: 'Do you offer Cash on Delivery?',
        a: 'Yes, COD is available across Pakistan. Please keep the exact amount ready for the rider.' },
      { q: 'Can I track my order?',
        a: 'Yes — sign in and visit your Orders page to see live status, from "placed" through to "delivered".' },
      { q: 'Do you ship internationally?',
        a: 'Not yet — we currently ship within Pakistan only. International shipping is on our roadmap for 2026.' },
    ],
  },
  {
    section: 'Returns & refunds',
    items: [
      { q: 'Can I return an opened product?',
        a: 'For hygiene reasons, opened skincare cannot be returned. Please patch-test new products on your inner forearm before full use.' },
      { q: 'How long do I have to return an unopened product?',
        a: '7 days from delivery. Email us with your order number and we’ll arrange the return.' },
      { q: 'My order arrived damaged. What do I do?',
        a: 'Message us within 48 hours with photos and your order number — we’ll replace or refund, courier on us.' },
    ],
  },
  {
    section: 'Products & ingredients',
    items: [
      { q: 'Are your products organic?',
        a: 'Our key actives (turmeric, neem, saffron, bhringraj, rose, aloe) are sourced from organic-certified farms. Our formulations are free from parabens, sulfates and synthetic fragrance.' },
      { q: 'Are your products tested on animals?',
        a: 'Never. Every batch is dermatologically reviewed before it leaves the lab — no animal testing at any stage.' },
      { q: 'Are your products safe during pregnancy?',
        a: 'Most are, but pregnancy is highly individual. We recommend consulting your doctor before using actives like Vitamin C. Email us for specifics on any product.' },
      { q: 'Can I use multiple Pareshey products together?',
        a: 'Yes — that\'s what they\'re designed for. Start with cleanse → tone → serum → moisturise. Reach out via the contact form for a personalised routine recommendation.' },
    ],
  },
  {
    section: 'Account',
    items: [
      { q: 'Do I need an account to shop?',
        a: 'No — guest checkout is available. An account gets you order history, saved addresses, and a wishlist.' },
      { q: 'I forgot my password.',
        a: 'Email hello@paresheyorganic.com and we’ll help you reset it.' },
    ],
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState({});
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  return (
    <StoreShell>
      <header className="bg-[#f6f4f0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs uppercase tracking-widest text-neutral-500">Customer Care</p>
          <h1 className="mt-2 text-4xl font-light">Frequently asked questions</h1>
          <p className="mt-3 text-neutral-600">Can’t find what you’re looking for? <a href="/contact" className="underline">Contact us</a>.</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {FAQ.map((group) => (
          <section key={group.section}>
            <h2 className="text-lg font-medium mb-3">{group.section}</h2>
            <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
              {group.items.map((it, i) => {
                const key = `${group.section}-${i}`;
                const isOpen = !!open[key];
                return (
                  <li key={key}>
                    <button onClick={() => toggle(key)} className="w-full text-left flex items-center justify-between py-4">
                      <span className="text-sm font-medium pr-4">{it.q}</span>
                      <span className={`text-xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    {isOpen && <p className="pb-5 text-sm text-neutral-700 leading-relaxed">{it.a}</p>}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </StoreShell>
  );
}
