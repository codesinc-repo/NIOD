const ConsultationsSection = () => (
  <section
    className="relative min-h-[500px] bg-white bg-cover bg-center font-['Inter',sans-serif] md:aspect-[3/1] md:min-h-0"
    style={{
      backgroundImage:
        "url('https://theordinary.com/on/demandware.static/-/Library-Sites-DeciemSharedLibrary/default/dwa0399ec8/theordinary/scheduler/scheduler_callout_desktop.jpg')",
    }}
  >
    <div className="mx-auto flex min-h-[500px] max-w-[1366px] items-center justify-center px-5 text-center md:aspect-[3/1] md:min-h-0">
      <div className="mx-auto max-w-[540px] pt-4">
        <h2 className="text-[34px] font-black leading-[1.2] tracking-[-0.075em] text-black md:text-[38px]">
          Discover In-Store
          <br />
          Consultations
        </h2>
        <p className="mx-auto mt-[27px] max-w-[530px] text-[20px] leading-[1.35] tracking-[-0.06em] text-black">
          One-on-one consultations have arrived. Book an appointment for expert guidance and personalized recommendations tailored to your skin's needs.
        </p>
        <div className="mt-[34px] flex flex-col items-stretch sm:flex-row sm:flex-wrap sm:justify-center gap-3 sm:gap-[30px] md:gap-[50px]">
          <button className="w-full sm:w-auto rounded-full border border-black px-8 py-[11px] text-[15px] font-bold tracking-[-0.045em] transition-colors hover:bg-black hover:text-white">
            Learn More
          </button>
          <button className="w-full sm:w-auto rounded-full border border-black px-8 py-[11px] text-[15px] font-bold tracking-[-0.045em] transition-colors hover:bg-black hover:text-white">
            Book Now
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default ConsultationsSection;
