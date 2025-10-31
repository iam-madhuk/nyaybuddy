import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, Gavel } from "lucide-react";

const lawsData = [
  { id: 1, slug: "ipc", title: "Indian Penal Code (IPC)", category: "Criminal", summary: "Defines crimes and punishments.", details: "Detailed IPC text here." },
  { id: 2, slug: "crpc", title: "Code of Criminal Procedure (CrPC)", category: "Criminal", summary: "Procedure for arrests and trials.", details: "Detailed CrPC text here." },
  { id: 3, slug: "rti", title: "Right to Information Act (RTI)", category: "Civic", summary: "Empowers citizens to seek information.", details: "Detailed RTI text here." },
  { id: 4, slug: "it-act", title: "Information Technology Act (IT Act)", category: "Cyber", summary: "Covers cybercrime and digital signatures.", details: "Detailed IT Act text here." },
  { id: 5, slug: "consumer", title: "Consumer Protection Act", category: "Consumer", summary: "Protects buyers from unfair trade.", details: "Detailed Consumer Protection text here." },
  { id: 6, slug: "dv-act", title: "Protection of Women from Domestic Violence Act (DV Act)", category: "Family", summary: "Civil remedy for domestic violence.", details: "Detailed DV Act text here." },
  { id: 7, slug: "posh", title: "Sexual Harassment of Women at Workplace (POSH Act)", category: "Workplace", summary: "Ensures safe workplaces for women.", details: "Detailed POSH Act text here." },
  { id: 8, slug: "motor", title: "Motor Vehicles Act", category: "Everyday", summary: "Regulates road transport and driving rules.", details: "Detailed Motor Vehicles Act text here." },
  { id: 9, slug: "tax", title: "Income Tax Basics", category: "Finance", summary: "Covers basic tax obligations.", details: "Detailed Income Tax text here." },
  { id: 10, slug: "contract", title: "Indian Contract Act", category: "Civic", summary: "Governs contracts and agreements.", details: "Detailed Contract Act text here." },
];

// ---------------- Header ----------------
function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-lg flex items-center gap-2">
          <Gavel className="w-5 h-5" /> NyayBuddy
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/laws" className="hover:underline">Laws</Link>
        </nav>
      </div>
    </header>
  );
}

// ---------------- Home Page ----------------
function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    const match = lawsData.find(
      (l) =>
        l.slug === query.toLowerCase() ||
        l.title.toLowerCase().includes(query.toLowerCase())
    );
    if (match) navigate(`/law/${match.slug}`);
    else alert("No law found");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const filtered = lawsData.filter((l) =>
    l.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.main
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">
            Legal Awareness — Made Friendly ⚖️
          </h1>
          <p className="mt-2 text-gray-700">
            Search by law name or browse through simplified summaries.
          </p>
          <div className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 text-gray-400 w-5 h-5" />
              <input
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKey}
                className="w-full p-2 pl-9 border rounded focus:ring-2 focus:ring-indigo-500"
                placeholder="Try: ipc, rti, consumer..."
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded"
            >
              Go
            </button>
          </div>
          {query && (
            <div className="mt-3 bg-white border rounded shadow-sm">
              {filtered.length > 0 ? (
                filtered.slice(0, 5).map((law) => (
                  <div
                    key={law.slug}
                    className="p-2 hover:bg-indigo-50 cursor-pointer"
                    onClick={() => navigate(`/law/${law.slug}`)}
                  >
                    {law.title}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No matches found</div>
              )}
            </div>
          )}
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded shadow-md flex flex-col justify-center"
        >
          <h3 className="text-lg font-semibold text-indigo-700">
            Quick Emergency Action 🚨
          </h3>
          <p className="text-gray-600 mt-2">Dial 112 for police or medical help</p>
        </motion.div>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-3 text-indigo-700">All Laws</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lawsData.map((l) => (
            <motion.div
              key={l.slug}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
              onClick={() => navigate(`/law/${l.slug}`)}
            >
              <div className="font-semibold text-indigo-700">{l.title}</div>
              <div className="text-sm text-gray-600 mt-2">{l.summary}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.main>
  );
}

// ---------------- All Laws Page ----------------
function Laws() {
  return (
    <motion.main
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">All Laws</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lawsData.map((l) => (
          <Link
            key={l.slug}
            to={`/law/${l.slug}`}
            className="block bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <div className="font-semibold text-indigo-700">{l.title}</div>
            <div className="text-sm text-gray-600 mt-1">{l.summary}</div>
          </Link>
        ))}
      </div>
    </motion.main>
  );
}

// ---------------- Law Detail Page ----------------
function LawDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const law = lawsData.find((l) => l.slug === slug);

  if (!law)
    return (
      <main className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-xl font-semibold">Law not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Go back
        </button>
      </main>
    );

  return (
    <motion.main
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-start flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-indigo-700">{law.title}</h1>
          <div className="text-sm text-gray-500 mt-1">
            Category: {law.category}
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="ml-auto flex items-center gap-1 text-indigo-600 border px-3 py-1 rounded hover:bg-indigo-50"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <article className="mt-6 bg-white p-6 rounded shadow text-gray-700 leading-relaxed">
        {law.details}
      </article>
    </motion.main>
  );
}

// ---------------- Main App ----------------
export default function NyayBuddyApp() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/laws" element={<Laws />} />
            <Route path="/law/:slug" element={<LawDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
        <footer className="text-center p-6 text-gray-600 mt-auto bg-gray-100">
          © 2025 NyayBuddy — Madhu Kumari
        </footer>
      </div>
    </BrowserRouter>
  );
}

