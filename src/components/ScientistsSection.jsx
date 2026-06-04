import { useApi } from '../lib/hooks';

const ScientistsSection = () => {
  const { data: scientists = [] } = useApi('/api/home/scientists');
  const marqueeScientists = [...(scientists || []), ...(scientists || [])];

  return (
    <section className="bg-white font-['Inter',sans-serif] text-[#111827]">
      <div className="px-5 pb-[40px] pt-[40px] md:px-[80px] md:pb-[60px] md:pt-[38px]">
        <div className="max-w-[720px]">
          <h2 className="text-[clamp(24px,6vw,38px)] font-black leading-[1.22] tracking-[-0.07em]">
            Meet Our Scientists.
            <br />
            Grounded in Science. Driven by Purpose.
          </h2>
          <p className="mt-[18px] max-w-[432px] text-[15px] sm:text-[16px] leading-[1.5] tracking-[-0.052em] md:text-[17px]">
            Our aim is to empower our community with transparent information about the science behind our products, offering effective and accessible skincare solutions&mdash;without compromise on quality.
          </p>
          <button className="mt-[26px] rounded-full border border-black px-[28px] py-[11px] text-[14px] sm:text-[15px] font-bold tracking-[-0.045em] transition-colors hover:bg-black hover:text-white">
            Look Inside Our Lab
          </button>
        </div>
      </div>

      <div className="overflow-hidden pb-[38px]">
        <div className="marquee-track marquee-track-slow flex w-max gap-[39px] will-change-transform md:gap-[39px]">
          {marqueeScientists.map((scientist, index) => (
            <article key={`${scientist.name}-${index}`} className="relative h-[360px] w-[180px] sm:h-[420px] sm:w-[210px] md:h-[464px] md:w-[238px] lg:w-[291px] shrink-0 bg-[#d5d5d5]">
              <img className="h-full w-full object-cover object-top" src={scientist.image} alt={scientist.name} />
              <div className="absolute inset-x-0 bottom-0 px-3 pb-3 sm:px-4 sm:pb-[18px] text-white">
                <span className="mb-[8px] block h-[2px] w-[22px] sm:w-[26px] bg-white" />
                <h3 className="text-[16px] sm:text-[20px] font-black leading-[1.12] tracking-[-0.065em]">{scientist.name}</h3>
                <p className="mt-[4px] sm:mt-[5px] max-w-[220px] text-[14px] sm:text-[18px] md:text-[19px] lg:text-[20px] font-medium leading-[1.35] tracking-[-0.07em]">
                  {scientist.title}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScientistsSection;
