
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-800">
      <header className="text-center py-10 bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md">
        <motion.h1
          className="text-4xl font-extrabold"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ⚖️ NyayBuddy
        </motion.h1>
        <motion.p
          className="mt-2 text-lg opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Law Made Simple — Know Your Rights, Empower Your Future
        </motion.p>
      </header>

      <main className="max-w-3xl mx-auto p-6 text-center">
        <motion.button
          onClick={() => setShow(!show)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          whileTap={{ scale: 0.95 }}
        >
          {show ? "Hide Info" : "Show Important Laws"}
        </motion.button>

        {show && (
          <motion.div
            className="mt-8 text-left bg-white p-6 rounded-2xl shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold mb-3">Key Indian Laws Everyone Should Know</h2>
            <ul className="space-y-2 text-sm">
              <li>📘 Indian Penal Code (IPC)</li>
              <li>📜 Right to Information Act (RTI)</li>
              <li>💻 Information Technology Act (Cyber Laws)</li>
              <li>🛍️ Consumer Protection Act</li>
              <li>🚗 Motor Vehicles Act</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              These summaries are for public awareness — not legal advice.
            </p>
          </motion.div>
        )}
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm pb-6">
        © 2025 NyayBuddy — Created with ❤️ by Madhu Kumari
      </footer>
    </div>
  );
}
