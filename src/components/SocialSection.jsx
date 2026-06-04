import { useRef } from 'react';
import { useApi } from '../lib/hooks';

const SocialSection = ({ cards }) => {
  const { data: apiCards = [] } = useApi(cards ? null : '/api/home/social-cards');
  cards = cards || apiCards || [];
  const carouselRef = useRef(null);

  const scrollSocialCards = (direction) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const card = carousel.querySelector('article');
    const gap = 40;
    const distance = card ? card.offsetWidth + gap : carousel.clientWidth;

    carousel.scrollBy({
      left: direction * distance,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-[#f8f8f8] pb-[57px] pt-[54px] font-['Inter',sans-serif] text-[#111827]">
      <div className="mx-auto max-w-[1200px] overflow-hidden px-5 md:px-9">
        <h2 className="text-[30px] font-black leading-none tracking-[-0.065em]">As Seen on Social</h2>

        <div ref={carouselRef} className="no-scrollbar mt-[36px] sm:mt-[49px] flex gap-5 sm:gap-10 overflow-x-auto scroll-smooth pb-2 -mx-5 px-5 md:mx-0 md:px-0">
          {cards.map((card) => (
            <article key={card.id || card.title} className="w-[min(320px,85vw)] sm:w-[min(380px,82vw)] md:w-[400px] shrink-0 border border-[#d7d7d7] bg-white">
              <div className="relative h-[342px] overflow-hidden bg-[#e8e8e8] md:h-[355px]">
                <img className="h-full w-full object-cover" src={card.image} alt={card.title} />
                <button
                  aria-label="Mute video"
                  className="absolute bottom-2 right-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-black text-white"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4 9v6h4l5 4V5L8 9H4Z" />
                    <path d="m17 9 4 6m0-6-4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="flex min-h-[84px] items-center gap-4 px-6 py-3">
                <img className="h-[52px] w-[52px] object-contain" src={card.product_image || card.productImage} alt="" aria-hidden="true" />
                <div>
                  <h3 className="text-[14px] font-semibold leading-[1.2] tracking-[-0.04em] text-black">{card.title}</h3>
                  <a href="#" className="mt-[18px] inline-block text-[14px] font-bold tracking-[-0.04em] text-black underline underline-offset-2">
                    Shop Now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-[78px] flex items-center justify-center gap-8 text-[28px] font-semibold leading-none">
          <button aria-label="Previous social posts" onClick={() => scrollSocialCards(-1)} type="button">
            &larr;
          </button>
          <button aria-label="Next social posts" onClick={() => scrollSocialCards(1)} type="button">
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
