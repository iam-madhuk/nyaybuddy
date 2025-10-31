import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Main NyayBuddy App (single-file for simplicity)
export default function NyayBuddyApp() {
  const lawsData = [
    {
      id: 1,
      title: "Indian Penal Code (IPC) — Overview",
      category: "Criminal",
      summary: "Defines crimes and prescribes punishments — murder, theft, assault, cheating, etc.",
      details:
        "The IPC is the foundation of criminal law in India. It defines offences and their punishments, such as Section 302 (murder), Section 376 (rape), Section 379 (theft), and Section 420 (cheating). If you face criminal conduct, approach the police and consult a lawyer promptly.",
      resources: [{ label: "IPC text (govt)", url: "https://www.indiacode.nic.in" }],
    },
    {
      id: 2,
      title: "Right to Information Act (RTI)",
      category: "Civic",
      summary: "Empowers citizens to access information from public authorities, promoting transparency.",
      details:
        "The RTI Act enables you to seek information from public offices regarding decisions, spending, and service records. The government must respond within a fixed timeline.",
      resources: [{ label: "RTI Portal", url: "https://rtionline.gov.in/" }],
    },
    {
      id: 3,
      title: "Consumer Protection Act",
      category: "Consumer",
      summary: "Safeguards consumers against unfair trade practices, defective goods, and poor services.",
      details:
        "If you face issues with a product or service, file a complaint with the Consumer Commission. Keep invoices and records of communication.",
      resources: [],
    },
    {
      id: 4,
      title: "Information Technology Act (IT Act)",
      category: "Cyber",
      summary: "Covers cybercrimes, electronic records, and offences such as hacking and data theft.",
      details:
        "The IT Act punishes offences like hacking, phishing, and cyberstalking. If victimized, preserve evidence and report it to the National Cyber Crime Portal.",
      resources: [{ label: "Cybercrime Portal", url: "https://cybercrime.gov.in/" }],
    },
  ];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedLaw, setSelectedLaw] = useState(null);

  const categories = ["All", ...new Set(lawsData.map((l) => l.category))];

  const filtered = lawsData.filter((l) => {
    const matchesCategory = category === "All" || l.category === category;
    const matchesQuery =
      query.trim() === "" ||
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.summary.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">⚖️ <span>NyayBuddy</span></h1>
            <div className="text-sm opacity-90">Law Made Simple — Empowering Indians with legal awareness</div>
          </motion.div>

          <div className="flex items-center gap-3">
            <button onClick={() => window.print()} className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform">Save / Print</button>
            <a href="#footer" className="text-sm underline">Contact</a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mb-8 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-3">Legal awareness made friendly</h2>
            <p className="text-gray-700 mb-4">Quick summaries, practical tips and links — all in one place. Stay informed, stay safe.</p>
            <div className="flex gap-3">
              <a href="#app" className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:shadow-lg">Open App</a>
              <a href="#" className="px-4 py-2 border rounded-xl">Learn More</a>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="font-semibold mb-2">Quick Actions</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><strong>Emergency:</strong> Dial 112</li>
              <li><strong>Cybercrime:</strong> Report at the National Cyber Crime Portal</li>
              <li><strong>Legal Aid:</strong> Contact your State Legal Services Authority</li>
            </ul>
          </div>
        </motion.section>

        <section id="app" className="mb-6">
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search laws, e.g. 'cyber', 'consumer'..." className="flex-1 px-4 py-3 rounded-xl shadow border border-gray-200 focus:ring-2 focus:ring-indigo-400" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-3 rounded-xl border border-gray-200 shadow">
              {categories.map((c) => (<option key={c}>{c}</option>))}
            </select>
          </div>

          <motion.div layout className="grid md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filtered.map((law) => (
                <motion.div key={law.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={() => setSelectedLaw(law)} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-gray-100">
                  <h3 className="font-bold text-lg text-indigo-700">{law.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{law.summary}</p>
                  <div className="mt-3 text-xs text-gray-400">Category: {law.category}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (<p className="text-center text-gray-500 mt-8">No laws found. Try another keyword.</p>)}
        </section>

        <AnimatePresence>
          {selectedLaw && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl p-6 relative">
                <h2 className="text-2xl font-bold text-indigo-700">{selectedLaw.title}</h2>
                <p className="text-gray-700 mt-3 text-sm leading-relaxed">{selectedLaw.details}</p>

                {selectedLaw.resources.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Helpful Links:</h4>
                    <ul className="space-y-1">
                      {selectedLaw.resources.map((r, i) => (<li key={i}><a href={r.url} target="_blank" rel="noreferrer" className="text-indigo-600 underline">{r.label}</a></li>))}
                    </ul>
                  </div>
                )}

                <button onClick={() => setSelectedLaw(null)} className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center">✕</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer id="footer" className="mt-12 text-center text-gray-600" >
          <div className="mb-4">© {new Date().getFullYear()} NyayBuddy — Created by Madhu Kumari</div>
          <div className="flex items-center justify-center gap-4">
            <a href="https://github.com/your-github" target="_blank" rel="noreferrer" className="underline">GitHub</a>
            <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noreferrer" className="underline">LinkedIn</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
