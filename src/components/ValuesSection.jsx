const LeafIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 21c0-9 6-15 16-16-.5 8-5 16-16 16Z" />
    <path d="M5 21c4-6 8-9 14-12" />
  </svg>
);

const HandLeafIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3c-2 3-3 5-3 7a3 3 0 0 0 6 0c0-2-1-4-3-7Z" />
    <path d="M3 14c2 0 3 1 3 3v1a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-1c0-2 1-3 3-3" />
  </svg>
);

const BeakerIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 3h6" />
    <path d="M10 3v5.5L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 8.5V3" />
    <path d="M7 14h10" />
  </svg>
);

const GlobeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18" />
    <path d="M12 3a14 14 0 0 0 0 18" />
  </svg>
);

const VALUES = [
  { Icon: LeafIcon,     title: 'Natural Ingredients',  body: 'We use only what nature intended.' },
  { Icon: HandLeafIcon, title: 'Sustainably Sourced',  body: 'Responsibly sourced for a better tomorrow.' },
  { Icon: BeakerIcon,   title: 'No Harsh Chemicals',   body: 'Free from toxins, parabens and artificial additives.' },
  { Icon: GlobeIcon,    title: 'Eco-Friendly',         body: 'Good for the planet, good for the future.' },
];

const ValuesSection = () => (
  <section className="bg-white py-16 font-['Inter',sans-serif] text-[#1b4423] md:py-20">
    <div className="mx-auto max-w-[1200px] px-6">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em]">
          Good for You. Good for Nature.
        </h2>
        <span className="mt-3 inline-block h-[2px] w-12 rounded-full bg-[#1b4423]/60" aria-hidden="true" />
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8">
        {VALUES.map(({ Icon, title, body }) => (
          <li key={title} className="flex flex-col items-center text-center">
            <span className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-[#eef3e3]">
              <Icon className="h-9 w-9 text-[#1b4423]" />
            </span>
            <h3 className="mt-5 text-[16px] font-bold tracking-tight md:text-[17px]">{title}</h3>
            <p className="mt-2 max-w-[200px] text-[13px] leading-[1.45] text-[#4a5a4d] md:text-[14px]">{body}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ValuesSection;
