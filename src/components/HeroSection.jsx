const ProductLabel = ({ className = '', children }) => (
  <div
    className={`absolute rounded-[9px] bg-white/90 border border-black/5 shadow-[0_10px_22px_rgba(0,0,0,0.16)] overflow-hidden ${className}`}
  >
    <div className="px-5 py-4 text-[clamp(15px,2vw,28px)] font-black leading-[0.92] tracking-[-0.06em] text-black">
      {children}
    </div>
    <div className="h-[10px] bg-black/25 border-y border-black/5" />
    <div className="h-14 bg-white/70" />
  </div>
);

import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="relative min-h-[520px] overflow-hidden bg-[#f4f4f4] font-['Inter',sans-serif] md:min-h-[475px]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_30%,rgba(255,255,255,0.9),transparent_37%),linear-gradient(90deg,#f7f7f7_0%,#f3f3f3_34%,#eeeeee_100%)]" />

    <div className="relative z-20 flex min-h-[520px] flex-col px-6 py-12 md:min-h-[475px] md:px-[8.25%] md:py-[86px]">
      <div className="max-w-[360px] text-[#020202]">
        <p className="text-[clamp(25px,2.3vw,31px)] font-normal leading-[0.95] tracking-[-0.055em]">Pareshey</p>
        <h1 className="mt-[-2px] text-[clamp(42px,3.9vw,53px)] font-black leading-[0.86] tracking-[-0.085em]">
          Organic.
        </h1>
        <h2 className="mt-[18px] text-[clamp(28px,3vw,36px)] font-black leading-[1.1] tracking-[-0.045em] text-[#071b2d]">
          Clean rituals,
          <br />
          rooted in nature.
        </h2>
        <p className="mt-[27px] text-[16px] font-normal leading-[1.4] tracking-[-0.03em] text-[#111827] md:text-[17px]">
          Hand-blended organic skincare — dermatologist-tested, cruelty-free, delivered fresh across Pakistan.
        </p>
      </div>

      <Link to="/category/best-sellers" className="mt-auto w-fit rounded-full border border-black px-[31px] py-[11px] text-[16px] font-semibold tracking-[-0.04em] text-[#050b18] transition-colors hover:bg-black hover:text-white md:mt-[108px]">
        Shop the rituals
      </Link>
    </div>

    <div className="pointer-events-none absolute bottom-[-54px] right-[-18px] z-10 h-[390px] w-[72vw] min-w-[610px] max-w-[980px] md:bottom-[-72px] md:right-[2.5%] md:h-[560px] md:w-[72vw] lg:right-[5.4%]">
      <div className="absolute left-[18%] top-[-24%] h-[390px] w-[390px] rounded-full bg-[#9b5a25] shadow-[inset_25px_10px_45px_rgba(255,255,255,0.22),inset_-35px_-20px_42px_rgba(0,0,0,0.28),0_12px_18px_rgba(0,0,0,0.15)] md:h-[520px] md:w-[520px]">
        <div className="absolute inset-[5%] rounded-full border-[2px] border-[#6a3d1f]/35" />
        <div className="absolute inset-0 rounded-full opacity-45 [background:repeating-radial-gradient(ellipse_at_center,transparent_0_12px,rgba(45,25,12,0.22)_13px_15px)]" />
      </div>
      <div className="absolute right-[4%] top-[-19%] h-[360px] w-[250px] rotate-[8deg] rounded-[52%_48%_45%_55%/62%_62%_38%_38%] bg-[#315d2f] shadow-[inset_24px_12px_34px_rgba(255,255,255,0.25),inset_-25px_-20px_30px_rgba(0,0,0,0.25),0_12px_20px_rgba(0,0,0,0.12)] md:h-[492px] md:w-[342px]">
        <div className="absolute inset-0 rounded-[inherit] opacity-45 [background:radial-gradient(circle_at_32%_24%,#d8e0b4_0_2px,transparent_3px),radial-gradient(circle_at_72%_52%,#d7e0b0_0_2px,transparent_3px)] [background-size:18px_18px,22px_22px]" />
        <div className="absolute left-1/2 top-[-4px] h-7 w-10 -translate-x-1/2 rounded-full bg-[#8a673d]" />
      </div>
      <div className="absolute bottom-[19%] left-[3%] h-[84px] w-[88%] -rotate-[5deg] rounded-[999px] bg-[#f6ce38] shadow-[inset_8px_22px_24px_rgba(255,255,255,0.32),inset_-18px_-18px_25px_rgba(163,110,6,0.24),0_12px_18px_rgba(0,0,0,0.16)] md:h-[118px]">
        <div className="absolute left-[-2%] top-[14%] h-[48px] w-[82px] rotate-[38deg] rounded-full bg-[#d4d453]" />
      </div>

      <ProductLabel className="left-[26%] top-[3%] w-[300px] -rotate-[8deg] md:w-[382px]">
        Cold-pressed
        <br />
        Turmeric & Honey
      </ProductLabel>
      <ProductLabel className="right-[2%] top-[17%] w-[250px] -rotate-[8deg] md:w-[288px]">
        Damask Rose
        <br />
        Hydrating
        <br />
        Toner
      </ProductLabel>
      <ProductLabel className="bottom-[1%] left-[47%] w-[244px] rotate-[10deg] md:w-[300px]">
        Saffron & Almond
        <br />
        Night Cream
      </ProductLabel>
    </div>

    <button
      aria-label="Next slide"
      className="absolute right-[25px] top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-transform hover:scale-105 md:h-11 md:w-11"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </section>
);

export default HeroSection;
