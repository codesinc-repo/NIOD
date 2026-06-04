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

        <div className="mt-[44px] flex gap-10 overflow-x-auto md:grid md:grid-cols-6 md:overflow-visible">
          {(concerns || []).map((concern) => (
            <a key={concern.id} href="#" className="group min-w-[165px]">
              <img className="aspect-square w-full object-cover" src={concern.image} alt={concern.name} />
              <div className="mt-[20px] flex items-center gap-3 text-[20px] font-semibold leading-none tracking-[-0.06em] text-[#111827]">
                {concern.name}
                <span className="text-[28px] font-normal leading-none transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonConcernsSection;
