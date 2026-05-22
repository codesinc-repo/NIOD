const footerGroups = [
  {
    title: 'Company',
    links: ['About Us', 'The Ordinary DNA', 'Join Us', 'Modern Slavery Act'],
  },
  {
    title: 'Our Commitments',
    links: ['Accessibility', 'Sustainability', 'Change is the Journey', 'Everything Is Chemicals'],
  },
  {
    title: 'Customer Care',
    links: ['FAQ', 'Disposal Instructions', 'Return Policy', 'Promotion Terms & Conditions'],
  },
  {
    title: 'Gift Cards',
    links: ['Purchase', 'Check Balance'],
  },
];

const socialLinks = [
  {
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[27px] w-[27px]" fill="currentColor" aria-hidden="true">
        <path d="M14.2 8.1V6.3c0-.9.6-1.1 1-1.1h2.6V1.1L14.2 1c-4 0-4.9 3-4.9 4.9v2.2H6v4.6h3.3V23h4.9V12.7h3.3l.4-4.6h-3.7Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[26px] w-[26px]" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 30 22" className="h-[27px] w-[31px]" fill="currentColor" aria-hidden="true">
        <path d="M29.4 4.1a3.8 3.8 0 0 0-2.7-2.7C24.3.8 15 .8 15 .8s-9.3 0-11.7.6A3.8 3.8 0 0 0 .6 4.1 39.5 39.5 0 0 0 0 11c0 2.3.2 4.7.6 6.9a3.8 3.8 0 0 0 2.7 2.7c2.4.6 11.7.6 11.7.6s9.3 0 11.7-.6a3.8 3.8 0 0 0 2.7-2.7c.4-2.2.6-4.6.6-6.9 0-2.3-.2-4.7-.6-6.9ZM12 15.4V6.6l7.8 4.4L12 15.4Z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[28px] w-[28px]" fill="currentColor" aria-hidden="true">
        <path d="M16.8 2c.4 3 2.1 4.7 5.2 4.9v4.2a9.4 9.4 0 0 1-5.1-1.6v6.8c0 8.6-9.4 11.3-13.2 5.1-2.5-4-.9-11.1 7.1-11.4v4.4c-1 .2-2 .5-2.6 1.1-1.6 1.5-1.1 4.2 1 5.1 2 .9 3.5-.5 3.5-2.8V2h4.1Z" />
      </svg>
    ),
  },
];

const FooterLink = ({ children, className = '' }) => (
  <a href="#" className={`block hover:underline ${className}`}>
    {children}
  </a>
);

const Footer = () => (
  <footer className="border-t border-[#d9d9d9] bg-white font-['Inter',sans-serif] text-black">
    <div className="mx-auto max-w-[1140px] px-5 pb-[37px] pt-[45px] md:px-6 lg:px-0">
      <div className="grid gap-10 lg:grid-cols-[214px_214px_188px_1fr] lg:gap-[38px]">
        <div className="space-y-[33px]">
          {footerGroups.slice(0, 2).map((group) => (
            <section key={group.title}>
              <h2 className="mb-[18px] text-[18px] font-medium leading-none tracking-[-0.05em]">{group.title}</h2>
              <div className="space-y-[7px] text-[13px] font-medium leading-[1.12] tracking-[-0.045em]">
                {group.links.map((link) => (
                  <FooterLink key={link}>{link}</FooterLink>
                ))}
              </div>
            </section>
          ))}

          <section className="pt-[2px]">
            <h2 className="mb-[12px] text-[18px] font-medium leading-none tracking-[-0.05em]">Location</h2>
            <div className="flex items-center gap-[7px] text-[13px] font-bold uppercase tracking-[-0.04em]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 12.5 7 12.5S19 14.2 19 9a7 7 0 0 0-7-7Zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2Z" />
              </svg>
              <span>Canada</span>
              <a href="#" className="text-[12px] font-normal normal-case underline">Change</a>
            </div>
            <div className="mt-[13px] pl-[25px] text-[13px] font-medium tracking-[-0.045em]">
              <span className="font-bold">Language</span>
              <a href="#" className="ml-2 text-[#777]">FR</a>
              <a href="#" className="ml-1 underline">EN</a>
            </div>
          </section>
        </div>

        <div className="space-y-[33px]">
          {footerGroups.slice(2).map((group) => (
            <section key={group.title}>
              <h2 className="mb-[18px] text-[18px] font-medium leading-none tracking-[-0.05em]">{group.title}</h2>
              <div className="space-y-[7px] text-[13px] font-medium leading-[1.12] tracking-[-0.045em]">
                {group.links.map((link) => (
                  <FooterLink key={link}>{link}</FooterLink>
                ))}
              </div>
            </section>
          ))}
        </div>

        <nav className="space-y-[18px] text-[18px] font-medium leading-none tracking-[-0.055em]">
          <FooterLink>Contact Us</FooterLink>
          <FooterLink className="pt-[8px]">Track Order</FooterLink>
          <FooterLink className="pt-[8px]">Sign In</FooterLink>
          <FooterLink className="pt-[8px]">Store Locator</FooterLink>
        </nav>

        <div className="lg:pl-[30px]">
          <section className="border-l border-[#dedede] pl-5 lg:min-h-[304px] lg:pl-[20px]">
            <img
              src="https://theordinary.com/on/demandware.static/Sites-deciem-Site/-/default/dwbeb5ebec/images/theordinary/footer-newsletter-img-TO.png"
              alt="Newsletter"
              className="h-[108px] w-full max-w-[342px] object-cover object-top"
            />
            <div className="max-w-[310px] pt-[14px]">
              <h2 className="text-[20px] font-black leading-none tracking-[-0.06em]">Stay In Touch.</h2>
              <form className="mt-[25px] flex h-[31px] items-start border-b border-[#a9a9a9]">
                <label htmlFor="footer-email" className="sr-only">Email Address</label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Email Address"
                  className="min-w-0 flex-1 bg-transparent text-[12px] font-medium tracking-[-0.045em] text-black outline-none placeholder:text-[#777]"
                />
                <button type="submit" aria-label="Subscribe" className="px-1 text-[26px] leading-[18px] text-[#5b5b5b]">
                  &rsaquo;
                </button>
              </form>
              <p className="mt-[24px] text-[10px] font-medium leading-[1.6] tracking-[-0.05em] text-[#777]">
                *By providing your email address you are agreeing to receive email communications from DECIEM Inc., its affiliates, brands (paresheyorganic) and/or marketing partners. This can be changed at any time. Please refer to our <a href="#" className="text-black underline">Privacy Policy</a> and <a href="#" className="text-black underline">Terms of Use</a> for more details or <a href="#" className="text-black underline">Contact Us</a>.
              </p>
            </div>
          </section>

          <div className="mt-[44px] flex items-center gap-[37px] pl-0 text-black lg:pl-0">
            {socialLinks.map((social) => (
              <a key={social.label} href="#" aria-label={social.label} className="transition-opacity hover:opacity-60">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[68px] flex flex-wrap items-center gap-x-[17px] gap-y-2 text-[11px] font-medium tracking-[-0.045em] text-[#777]">
        <span>&copy; DECIEM Beauty Group Inc. 2022. All rights reserved.</span>
        <FooterLink>Terms &amp; Conditions</FooterLink>
        <span className="text-black">·</span>
        <FooterLink>Privacy Policy</FooterLink>
        <span className="text-black">·</span>
        <FooterLink>Cookies</FooterLink>
        <FooterLink className="font-black text-black">A DECIEM PROJECT.</FooterLink>
      </div>
    </div>
  </footer>
);

export default Footer;
