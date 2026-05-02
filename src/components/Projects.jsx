export default function Projects() {
  return (
    <section id="projects" className="container py-24">
      <h2 className="text-3xl font-semibold mb-10">Projects</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold">LunaBot</h3>
          <p className="text-gray-400 mt-2">
            Autonomous robotics system using YOLOv8 and SLAM.
          </p>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold">ZeroTouch</h3>
          <p className="text-gray-400 mt-2">
            Gesture-based medical interface using computer vision.
          </p>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold">MediStream AI</h3>
          <p className="text-gray-400 mt-2">
            AI-powered hospital triage platform.
          </p>
        </div>
      </div>
    </section>
  );
}