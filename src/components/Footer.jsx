import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

const footerGroups = [
  {
    title: 'Company',
    links: [
      { label: 'About us',         to: '/about' },
      { label: 'Our story',        to: '/about#story' },
      { label: 'Sustainability',   to: '/sustainability' },
      { label: 'Careers',          to: '/careers' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Contact us',       to: '/contact' },
      { label: 'Shipping & returns', to: '/shipping' },
      { label: 'FAQ',              to: '/faq' },
      { label: 'Track order',      to: '/account/orders' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { label: 'Bestsellers',      to: '/category/best-sellers' },
      { label: 'Skincare',         to: '/category/skincare' },
      { label: 'Body & Hair',      to: '/category/body-hair' },
      { label: 'Sets & Bundles',   to: '/category/skincare-sets' },
      { label: 'The Library',      to: '/blog' },
    ],
  },
];

const socialLinks = [
  { label: 'Facebook',  href: 'https://facebook.com/paresheyorganics',  icon: (
    <svg viewBox="0 0 24 24" className="h-[27px] w-[27px]" fill="currentColor"><path d="M14.2 8.1V6.3c0-.9.6-1.1 1-1.1h2.6V1.1L14.2 1c-4 0-4.9 3-4.9 4.9v2.2H6v4.6h3.3V23h4.9V12.7h3.3l.4-4.6h-3.7Z" /></svg>
  ) },
  { label: 'Instagram', href: 'https://instagram.com/paresheyorganics', icon: (
    <svg viewBox="0 0 24 24" className="h-[26px] w-[26px]" fill="none" stroke="currentColor" strokeWidth="2.1"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></svg>
  ) },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@pareshey.organics', icon: (
    <svg viewBox="0 0 24 24" className="h-[28px] w-[28px]" fill="currentColor"><path d="M16.8 2c.4 3 2.1 4.7 5.2 4.9v4.2a9.4 9.4 0 0 1-5.1-1.6v6.8c0 8.6-9.4 11.3-13.2 5.1-2.5-4-.9-11.1 7.1-11.4v4.4c-1 .2-2 .5-2.6 1.1-1.6 1.5-1.1 4.2 1 5.1 2 .9 3.5-.5 3.5-2.8V2h4.1Z" /></svg>
  ) },
  { label: 'Email',     href: 'mailto:paresheyorganics@gmail.com', icon: (
    <svg viewBox="0 0 24 24" className="h-[26px] w-[26px]" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
  ) },
];

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [msg, setMsg] = useState('');
  async function submit(e) {
    e.preventDefault();
    setStatus('sending'); setMsg('');
    try {
      await api.post('/api/newsletter', { email, source: 'footer' });
      setStatus('ok'); setMsg('Thanks — you’re subscribed.'); setEmail('');
    } catch (err) {
      setStatus('err'); setMsg(err?.body?.message || 'Could not subscribe.');
    }
  }
  return (
    <>
      <form onSubmit={submit} className="mt-[18px] flex h-[36px] items-center border-b border-[#a9a9a9]">
        <label htmlFor="footer-email" className="sr-only">Email Address</label>
        <input id="footer-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address"
          className="min-w-0 flex-1 bg-transparent text-[13px] font-medium tracking-[-0.045em] text-black outline-none placeholder:text-[#777]" />
        <button type="submit" aria-label="Subscribe" disabled={status === 'sending'} className="px-1 text-[26px] leading-[18px] text-[#5b5b5b]">
          &rsaquo;
        </button>
      </form>
      {msg && <p className={`mt-2 text-[11px] ${status === 'ok' ? 'text-emerald-700' : 'text-red-600'}`}>{msg}</p>}
    </>
  );
}

const Footer = () => (
  <footer className="border-t border-[#d9d9d9] bg-white font-['Inter',sans-serif] text-black">
    <div className="mx-auto max-w-[1140px] px-5 pb-[37px] pt-[45px] md:px-6 lg:px-0">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1fr_1.4fr] lg:gap-[38px]">
        {footerGroups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-[18px] text-[18px] font-medium leading-none tracking-[-0.05em]">{group.title}</h2>
            <ul className="space-y-[8px] text-[13px] font-medium leading-[1.12] tracking-[-0.045em]">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="block hover:underline">{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="lg:pl-[10px]">
          <section className="border-l border-[#dedede] pl-5 lg:min-h-[260px] lg:pl-[20px]">
            <div className="max-w-[310px]">
              <h2 className="text-[20px] font-black leading-none tracking-[-0.06em]">Stay in touch.</h2>
              <p className="mt-3 text-[12px] text-[#5b5b5b] tracking-[-0.03em]">Routines, new arrivals and member-only offers — direct to your inbox.</p>
              <NewsletterForm />
              <p className="mt-[16px] text-[10px] font-medium leading-[1.6] tracking-[-0.05em] text-[#777]">
                *By subscribing you agree to receive email from Pareshey Organic. Unsubscribe anytime. See our <Link to="/privacy" className="text-black underline">Privacy Policy</Link> and <Link to="/terms" className="text-black underline">Terms of Use</Link>, or <Link to="/contact" className="text-black underline">contact us</Link>.
              </p>
            </div>
          </section>

          <div className="mt-[28px] flex items-center gap-[28px] text-black">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener" aria-label={social.label} className="transition-opacity hover:opacity-60">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[40px] pt-5 border-t border-neutral-100 flex flex-wrap items-center gap-x-[17px] gap-y-2 text-[11px] font-medium tracking-[-0.045em] text-[#777]">
        <span>&copy; {new Date().getFullYear()} Pareshey Organic. All rights reserved.</span>
        <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
        <span className="text-black">·</span>
        <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        <span className="text-black">·</span>
        <Link to="/shipping" className="hover:underline">Shipping & Returns</Link>
        <span className="ml-auto text-[#999]">Made with care in Pakistan.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
