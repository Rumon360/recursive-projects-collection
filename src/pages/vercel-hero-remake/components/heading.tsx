const buttonStyles = {
  size: "p-[0.125rem] px-[0.75rem] md:px-[0.875rem] h-[2.5rem] md:h-[3rem]",
  transition: "transition-colors ease-in-out",
  common:
    "rounded-full text-sm md:text-base font-medium flex justify-center items-center",
};

function Heading() {
  return (
    <div className="relative z-10 p-8 flex flex-col items-center justify-center gap-6 md:col-start-2 col-span-full md:col-span-10 row-span-4 md:row-start-2">
      <h1 className="text-[clamp(1.5rem_,3.75vw,_3rem)] font-semibold text-center tracking-tighter">
        Build and deploy on the AI Cloud.
      </h1>
      <p className="text-[#a1a1a1] text-base md:text-xl text-center max-w-xl text-pretty font-normal tracking-tight leading-relaxed">
        Vercel provides the developer tools and cloud infrastructure to build,
        scale, and secure a faster, more personalized web.
      </p>
      <div className="flex gap-3 md:gap-6 mt-2">
        <a
          href="#"
          className={`bg-[#ededed] hover:bg-[#ededed]/90 text-black ${buttonStyles.size} ${buttonStyles.transition} ${buttonStyles.common}`}
        >
          <span className="min-w-[1.25rem] flex justify-center items-center">
            <svg
              aria-label="Vercel logomark"
              height="14"
              role="img"
              viewBox="0 0 74 64"
              className="w-auto overflow-visible mr-0.5 flex shrink-0"
            >
              <path
                d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
                fill="var(--ds-background-200)"
              ></path>
            </svg>
          </span>
          <span className="px-1.5">
            <span className="hidden md:block">Start Deploying</span>
            <span className="md:hidden">Deploy</span>
          </span>
        </a>
        <a
          href="#"
          style={{
            boxShadow:
              "0 0 0 1px #ffffff25, 0px 1px 2px #00000029, 0 0 0 1px hsla(0,0%,0%,1)",
          }}
          className={`md:min-w-[11.313rem] bg-black hover:bg-zinc-900 text-[#ededed] hover:border-[#2e2e2e] ${buttonStyles.size} ${buttonStyles.transition} ${buttonStyles.common}`}
        >
          <span className="px-1.5">Get a Demo</span>
        </a>
      </div>
    </div>
  );
}

export default Heading;
