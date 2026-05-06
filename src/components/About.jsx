import sketchRoom from "../assets/sketch-room.webp";

export default function About({ macbookProgress = 0 }) {
  return (
    <section
      id="about"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#ecebe7]
        mt-[220px]
      "
    >
        <div
    id="path-end"
    className="absolute left-[32%] top-[38%] w-2 h-2 opcity-0 pointer-events-none z-[50]"
  />
      {/* TOP THIN BORDER */}
      {/* matches hero grid lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-black/20 z-30" />

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={sketchRoom}
          alt="workspace"
          className="
            w-full
            h-full
            object-cover 
            opacity-[0.92]
          "
        />

        {/* SOFT IMAGE BLEND */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#ecebe7]/30
            via-[#ecebe7]/10
            to-black/30
          "
        />
      </div>

      {/* SIDE BORDERS */}
      <div className="absolute left-0 top-0 w-[1px] h-full bg-black/20 z-30" />
      <div className="absolute right-0 top-0 w-[1px] h-full bg-black/20 z-30" />

      {/* EMPTY BREATHING SPACE */}
      <div className="relative z-10 min-h-screen" />

      {/* MACBOOK LANDING AREA */}
      <div
        className="absolute z-20"
        style={{
          right: "18%",
          top: "55%",

          transform: `
            translateY(${120 - macbookProgress * 120}px)
            rotate(${8 - macbookProgress * 8}deg)
            scale(${0.8 + macbookProgress * 0.2})
          `,

          opacity: macbookProgress,

          transition: "transform 0.1s linear",
        }}
      >
        {/* helper placement */}
        <div className="w-[420px] h-[220px]" />

      </div>
    </section>
  );
}