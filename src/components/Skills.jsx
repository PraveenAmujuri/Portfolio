export default function Skills() {
  const skills = ["PyTorch", "TensorFlow", "React", "Node.js", "MongoDB"];

  return (
    <section id="skills" className="container py-24">
      <h2 className="text-3xl font-semibold mb-10">Skills</h2>

      <div className="flex flex-wrap gap-3">
        {skills.map((s, i) => (
          <span key={i} className="px-4 py-2 border border-white/10 rounded-lg">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}