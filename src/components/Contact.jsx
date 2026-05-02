export default function Contact() {
  return (
    <section id="contact" className="container py-24">
      <h2 className="text-3xl font-semibold mb-6">Contact</h2>

      <form className="flex flex-col gap-4 max-w-md">
        <input placeholder="Name" className="p-3 bg-[#1e293b] rounded" />
        <input placeholder="Email" className="p-3 bg-[#1e293b] rounded" />
        <textarea placeholder="Message" className="p-3 bg-[#1e293b] rounded" />

        <button className="bg-blue-400 text-black py-3 rounded">
          Send Message
        </button>
      </form>
    </section>
  );
}