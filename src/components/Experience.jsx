export default function Experience() {
  return (
    <section id="experience" className="container py-24">
      <h2 className="text-3xl font-semibold mb-10">Experience</h2>

      <div className="space-y-6">
        <div className="card">
          <h3 className="font-semibold">Machine Learning Intern</h3>
          <p className="text-gray-400">Achieved 92% accuracy with ML models</p>
        </div>

        <div className="card">
          <h3 className="font-semibold">Full Stack Developer Intern</h3>
          <p className="text-gray-400">Built MERN applications with JWT auth</p>
        </div>
      </div>
    </section>
  );
}