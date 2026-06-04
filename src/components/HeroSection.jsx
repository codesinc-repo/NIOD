import { Link } from 'react-router-dom';
import logoUrl from '../assets/logops.png';

const ProductLabel = ({ className = '', children }) => (
  <div
    className={`absolute rounded-[9px] bg-white/95 border border-black/5 shadow-[0_10px_22px_rgba(0,0,0,0.16)] overflow-hidden ${className}`}
  >
    <div className="px-4 py-3 text-[clamp(13px,1.8vw,22px)] font-black leading-[1] tracking-[-0.04em] text-black">
      {children}
    </div>
    <div className="h-[8px] bg-[#2e7d32]/15 border-y border-black/5" />
    <div className="h-10 bg-white/70" />
  </div>
);

const HeroSection = () => (
  <section className="relative overflow-hidden bg-[#fefaf3] font-['Inter',sans-serif] min-h-[560px] md:min-h-[520px]">
    {/* Decorative background gradient */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(214,86,76,0.06),transparent_45%),radial-gradient(circle_at_15%_85%,rgba(46,125,50,0.08),transparent_45%)]" />

    <div className="relative z-20 mx-auto max-w-[1366px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-6 md:px-[5%] py-12 md:py-20">
      {/* Left: logo + tagline + CTA */}
      <div className="text-[#222] max-w-[560px]">
        <img
          src={logoUrl}
          alt="Pareshey Organics"
          width={400}
          height={230}
          style={{ height: 'clamp(120px, 18vw, 180px)', width: 'auto', maxHeight: 200 }}
          className="object-contain"
        />
        <h1 className="mt-4 text-[clamp(26px,3.4vw,40px)] font-black leading-[1.1] tracking-[-0.04em] text-[#1a3823]">
          Clean rituals,
          <br />
          rooted in nature.
        </h1>
        <p className="mt-5 text-[15px] md:text-[17px] font-normal leading-[1.5] tracking-[-0.02em] text-[#444] max-w-[480px]">
          Hand-blended organic skincare — dermatologist-tested, cruelty-free, delivered fresh across Pakistan.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            to="/category/best-sellers"
            className="inline-flex items-center justify-center rounded-full bg-[#1a3823] text-white px-7 py-3 text-[15px] font-semibold tracking-tight hover:bg-[#0f2415] transition-colors"
          >
            Shop the rituals →
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-full border border-[#1a3823] text-[#1a3823] px-7 py-3 text-[15px] font-semibold tracking-tight hover:bg-[#1a3823] hover:text-white transition-colors"
          >
            Our story
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-1 text-[12px] uppercase tracking-widest text-[#5a7c5a] font-semibold">
          <li>· 100% Organic actives</li>
          <li>· Cruelty-free</li>
          <li>· COD across Pakistan</li>
        </ul>
      </div>

      {/* Right: abstract product shapes */}
      <div className="relative hidden md:block h-[480px]">
        {/* Brown circle (turmeric) */}
        <div className="absolute left-[10%] top-[5%] h-[300px] w-[300px] lg:h-[360px] lg:w-[360px] rounded-full bg-[#9b5a25] shadow-[inset_25px_10px_45px_rgba(255,255,255,0.22),inset_-35px_-20px_42px_rgba(0,0,0,0.28),0_12px_18px_rgba(0,0,0,0.15)]">
          <div className="absolute inset-[5%] rounded-full border-[2px] border-[#6a3d1f]/35" />
          <div className="absolute inset-0 rounded-full opacity-45 [background:repeating-radial-gradient(ellipse_at_center,transparent_0_12px,rgba(45,25,12,0.22)_13px_15px)]" />
        </div>

        {/* Green leaf (botanical) */}
        <div className="absolute right-[5%] top-[2%] h-[280px] w-[200px] lg:h-[340px] lg:w-[240px] rotate-[8deg] rounded-[52%_48%_45%_55%/62%_62%_38%_38%] bg-[#2e7d32] shadow-[inset_24px_12px_34px_rgba(255,255,255,0.25),inset_-25px_-20px_30px_rgba(0,0,0,0.25),0_12px_20px_rgba(0,0,0,0.12)]">
          <div className="absolute inset-0 rounded-[inherit] opacity-45 [background:radial-gradient(circle_at_32%_24%,#d8e0b4_0_2px,transparent_3px),radial-gradient(circle_at_72%_52%,#d7e0b0_0_2px,transparent_3px)] [background-size:18px_18px,22px_22px]" />
          <div className="absolute left-1/2 top-[-4px] h-7 w-10 -translate-x-1/2 rounded-full bg-[#8a673d]" />
        </div>

        {/* Yellow honey bar */}
        <div className="absolute bottom-[8%] left-0 right-0 mx-auto h-[70px] w-[80%] -rotate-[5deg] rounded-[999px] bg-[#f6ce38] shadow-[inset_8px_22px_24px_rgba(255,255,255,0.32),inset_-18px_-18px_25px_rgba(163,110,6,0.24),0_12px_18px_rgba(0,0,0,0.16)]">
          <div className="absolute left-[-2%] top-[14%] h-[40px] w-[68px] rotate-[38deg] rounded-full bg-[#d4d453]" />
        </div>

        {/* Product labels */}
        <ProductLabel className="left-[8%] top-[18%] w-[200px] lg:w-[230px] -rotate-[6deg]">
          Cold-pressed<br />Turmeric & Honey
        </ProductLabel>
        <ProductLabel className="right-[2%] top-[35%] w-[170px] lg:w-[200px] rotate-[5deg]">
          Damask Rose<br />Toner
        </ProductLabel>
        <ProductLabel className="bottom-[20%] left-[35%] w-[180px] lg:w-[210px] rotate-[8deg]">
          Saffron Night<br />Cream
        </ProductLabel>
      </div>
    </div>
  </section>
);

export default HeroSection;
