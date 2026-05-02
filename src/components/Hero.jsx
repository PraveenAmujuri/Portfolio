import profile from "../assets/profile.png";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f5f5f2] px-6">
      <div className="h-[100px]" />

      <div className="w-full max-w-6xl flex items-center justify-between gap-16">

        {/* LEFT */}
        <div className="max-w-xl">
          <p className="text-sm text-gray-600 mb-4">
            Hello, I’m Praveen,
          </p>

          <h1 className="text-6xl md:text-7xl font-extrabold text-[#0b0f3b] leading-tight">
            Applied AI <br /> Engineer
          </h1>

          <p className="mt-4 text-gray-600">
            building intelligent systems & full-stack applications
          </p>

          <button className="mt-6 px-5 py-2 bg-yellow-400 text-black rounded-md hover:scale-105 transition">
            Resume
          </button>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center">

          {/* OUTER RING */}
          <div className="absolute w-72 h-72 rounded-full border border-[#d8d3a8]" />

          {/* IMAGE */}
          <div className="w-64 h-64 rounded-full overflow-hidden bg-white border border-[#e3dec0]">
            <img
              src={profile}
              alt="Praveen"
              className="w-full h-full object-cover"
            />
          </div>

          {/* DECORATIONS */}
          <div className="absolute top-6 right-6 text-[#0b0f3b] text-lg">
            + +
          </div>

          <div className="absolute bottom-8 left-6 text-[#0b0f3b] text-lg">
            //// 
          </div>

        </div>

      </div>
    </section>
  );
}