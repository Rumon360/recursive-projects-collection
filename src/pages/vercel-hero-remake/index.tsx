import Heading from "./components/heading";
import Logo from "./components/logo";
import Background from "./components/background";

function VercelHeroRemake() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black text-white flex justify-center items-center px-4">
      <section
        id="-vercel-hero-wrapper"
        className="flex items-center justify-center w-full"
      >
        <div className="w-full max-w-270 relative border grid grid-cols-8 grid-rows-8 md:grid-cols-12">
          <Background />
          <Heading />
          <Logo />
          {/* Grid Blocks */}
          <div className="relative col-span-full row-span-full grid grid-cols-subgrid grid-rows-subgrid">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="aspect-square border border-white" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default VercelHeroRemake;
