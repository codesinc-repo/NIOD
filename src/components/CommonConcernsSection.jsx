import { useApi } from '../lib/hooks';

const CommonConcernsSection = () => {
  const { data: concerns = [] } = useApi('/api/home/concerns');
  return (
    <section className="bg-white font-['Inter',sans-serif] text-[#101827]">
      <div className="mx-auto max-w-[1191px] border-t border-[#d8d8d8] px-5 pb-[72px] pt-[65px] md:px-0">
        <h2 className="text-[29px] font-black leading-none tracking-[-0.065em]">Common Concerns</h2>
        <p className="mt-[18px] text-[15px] leading-none tracking-[-0.04em]">
          Not sure where to begin? Here are some common skin concerns.
        </p>

        <div className="mt-[44px] flex gap-6 sm:gap-10 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6 no-scrollbar">
          {(concerns || []).map((concern) => (
            <a key={concern.id} href="#" className="group min-w-[140px] sm:min-w-[165px] md:min-w-0">
              <img className="aspect-square w-full object-cover" src={concern.image} alt={concern.name} />
              <div className="mt-[16px] sm:mt-[20px] flex items-center gap-2 sm:gap-3 text-[17px] sm:text-[20px] font-semibold leading-none tracking-[-0.06em] text-[#111827]">
                {concern.name}
                <span className="text-[24px] sm:text-[28px] font-normal leading-none transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonConcernsSection;
