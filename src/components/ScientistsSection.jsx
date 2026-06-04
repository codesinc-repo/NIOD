import { useApi } from '../lib/hooks';

const ScientistsSection = () => {
  const { data: scientists = [] } = useApi('/api/home/scientists');
  const marqueeScientists = [...(scientists || []), ...(scientists || [])];

  return (
    <section className="bg-white font-['Inter',sans-serif] text-[#111827]">
      <div className="px-5 pb-[58px] pt-[40px] md:px-[80px] md:pb-[60px] md:pt-[38px]">
        <div className="max-w-[720px]">
          <h2 className="text-[34px] font-black leading-[1.22] tracking-[-0.07em] md:text-[37px] lg:text-[38px]">
            Meet Our Scientists.
            <br />
            Grounded in Science. Driven by Purpose.
          </h2>
          <p className="mt-[22px] max-w-[432px] text-[16px] leading-[1.5] tracking-[-0.052em] md:text-[17px]">
            Our aim is to empower our community with transparent information about the science behind our products, offering effective and accessible skincare solutions&mdash;without compromise on quality.
          </p>
          <button className="mt-[34px] rounded-full border border-black px-[33px] py-[11px] text-[15px] font-bold tracking-[-0.045em] transition-colors hover:bg-black hover:text-white">
            Look Inside Our Lab
          </button>
        </div>
      </div>

      <div className="overflow-hidden pb-[38px]">
        <div className="marquee-track marquee-track-slow flex w-max gap-[39px] will-change-transform md:gap-[39px]">
          {marqueeScientists.map((scientist, index) => (
            <article key={`${scientist.name}-${index}`} className="relative h-[464px] w-[238px] shrink-0 bg-[#d5d5d5] md:w-[291px]">
              <img className="h-full w-full object-cover object-top" src={scientist.image} alt={scientist.name} />
              <div className="absolute inset-x-0 bottom-0 px-4 pb-[18px] text-white md:px-4 md:pb-[19px]">
                <span className="mb-[10px] block h-[2px] w-[26px] bg-white" />
                <h3 className="text-[20px] font-black leading-[1.12] tracking-[-0.065em] md:text-[20px]">{scientist.name}</h3>
                <p className="mt-[5px] max-w-[250px] text-[19px] font-medium leading-[1.35] tracking-[-0.07em] md:text-[20px]">
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
