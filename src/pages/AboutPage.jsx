import { Link } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import AnimatedSection from '../components/AnimatedSection';

export default function AboutPage() {
  return (
    <StoreShell>
      <AnimatedSection direction="up">
        <header className="bg-[#f6f4f0]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <p className="text-xs uppercase tracking-widest text-neutral-500">About Pareshey Organic</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-light max-w-3xl">Clean rituals, rooted in nature — formulated in Pakistan.</h1>
            <p className="mt-5 text-neutral-700 max-w-2xl text-lg">We started Pareshey Organic to bring honest, plant-based skincare back to the everyday — without the markup of imported brands and without the fillers most labels would rather you didn’t notice.</p>
          </div>
        </header>
      </AnimatedSection>

      <section id="story" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-neutral-800 leading-relaxed">
        <AnimatedSection direction="left">
          <div>
            <h2 className="text-2xl font-light mb-3">Our story</h2>
            <p>Pareshey Organic was born in a small home kitchen in Lahore. What began as turmeric face packs for friends and family slowly grew into a full line of cold-pressed oils, plant-based serums and traditional Pakistani rituals — now formulated by certified cosmetic chemists and produced in dermatologist-approved facilities.</p>
            <p className="mt-3">We still source most of our key ingredients — turmeric, neem, saffron, bhringraj — directly from small farms across South Asia. Same recipes our grandmothers swore by. Modern science. Honest pricing.</p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right">
          <div>
            <h2 className="text-2xl font-light mb-3">What we stand for</h2>
            <ul className="space-y-3">
              <li><strong className="font-medium">Clean formulations.</strong> No parabens, no sulfates, no synthetic fragrance, no needless fillers.</li>
              <li><strong className="font-medium">Tested, not tested on animals.</strong> Every batch is dermatologically reviewed before it leaves the lab — and never tested on animals.</li>
              <li><strong className="font-medium">Fairly sourced.</strong> Direct relationships with growers across Pakistan and India, with fair price guarantees.</li>
              <li><strong className="font-medium">Fresh, not stockpiled.</strong> We make in small batches so what reaches you is potent, not sitting in a warehouse.</li>
            </ul>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up">
          <div className="bg-[#f6f4f0] rounded-2xl p-8 text-center">
            <h3 className="text-xl font-light">Build a routine with us.</h3>
            <p className="mt-2 text-sm text-neutral-600">Not sure where to start? Our team can recommend a routine based on your skin concerns.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link to="/category/best-sellers" className="px-5 py-2.5 bg-black text-white rounded-full text-sm">Shop bestsellers</Link>
              <Link to="/contact" className="px-5 py-2.5 border border-black rounded-full text-sm hover:bg-black hover:text-white">Get a recommendation</Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </StoreShell>
  );
}
