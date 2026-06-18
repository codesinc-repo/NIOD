import { Link } from 'react-router-dom';
import landingImg from '../assets/landingImg.png';

const LeafIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 21c0-9 6-15 16-16-.5 8-5 16-16 16Z" />
    <path d="M5 21c4-6 8-9 14-12" />
  </svg>
);

const BeakerIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 3h6" />
    <path d="M10 3v5.5L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 8.5V3" />
    <path d="M7 14h10" />
  </svg>
);

const HandLeafIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3c-2 3-3 5-3 7a3 3 0 0 0 6 0c0-2-1-4-3-7Z" />
    <path d="M3 14c2 0 3 1 3 3v1a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-1c0-2 1-3 3-3" />
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

const BADGES = [
  { Icon: LeafIcon,     label: '100% Natural' },
  { Icon: BeakerIcon,   label: 'Chemical Free' },
  { Icon: HandLeafIcon, label: 'Sustainable' },
  { Icon: GlobeIcon,    label: 'Eco Friendly' },
];

const HeroSection = () => (
  <section className="relative overflow-hidden bg-white font-['Inter',sans-serif]">
    <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-stretch md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="flex flex-col justify-center px-6 py-12 md:px-[5%] md:py-16 lg:py-20">
        <div className="max-w-[520px] text-[#1b3a22]">
          <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[#1b4423]">
            Pure by Nature,
            <br />
            Made with Care.
          </h1>

          <span className="mt-4 block h-[2px] w-12 rounded-full bg-[#1b4423]/70" aria-hidden="true" />

          <p className="mt-5 max-w-[420px] text-[15px] leading-[1.65] text-[#3a4a3f] md:text-[16px]">
            Pareshey Organics brings you the finest range of natural and organic products for a healthier you and a better planet.
          </p>

          <Link
            to="/category/best-sellers"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1b4423] px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0f2c16]"
          >
            Shop Now <span aria-hidden="true">→</span>
          </Link>

          <ul className="mt-10 grid max-w-[420px] grid-cols-4 gap-4 text-center">
            {BADGES.map(({ Icon, label }) => (
              <li key={label} className="flex flex-col items-center gap-2">
                <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#1b4423]/70 text-[#1b4423]">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-[12px] font-medium leading-tight text-[#1b3a22]">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center md:justify-end">
        <img
          src={landingImg}
          alt="Pareshey Organics skincare range"
          className="block h-auto w-full max-w-[640px]"
        />
      </div>
    </div>
  </section>
);

export default HeroSection;
