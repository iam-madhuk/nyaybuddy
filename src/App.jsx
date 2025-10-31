import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const lawsData = [
  { id:1, slug:'ipc', title:'Indian Penal Code (IPC)', category:'Criminal', summary:'Defines crimes...', details:'Detailed IPC text here.' },
  { id:2, slug:'crpc', title:'Code of Criminal Procedure (CrPC)', category:'Criminal', summary:'Procedure for arrests...', details:'Detailed CrPC text here.' },
  { id:3, slug:'rti', title:'Right to Information Act (RTI)', category:'Civic', summary:'Obtain information...', details:'Detailed RTI text here.' },
  { id:4, slug:'it-act', title:'Information Technology Act (IT Act)', category:'Cyber', summary:'Covers cybercrime...', details:'Detailed IT Act text here.' },
  { id:5, slug:'consumer', title:'Consumer Protection Act', category:'Consumer', summary:'Protects buyers...', details:'Detailed Consumer Protection text here.' },
  { id:6, slug:'dv-act', title:'Protection of Women from Domestic Violence Act (DV Act)', category:'Family', summary:'Civil remedy...', details:'Detailed DV Act text here.' },
  { id:7, slug:'posh', title:'Sexual Harassment of Women at Workplace (POSH Act)', category:'Workplace', summary:'Workplace harassment law...', details:'Detailed POSH Act text here.' },
  { id:8, slug:'motor', title:'Motor Vehicles Act', category:'Everyday', summary:'Driving rules...', details:'Detailed Motor Vehicles Act text here.' },
  { id:9, slug:'tax', title:'Income Tax Basics', category:'Finance', summary:'Tax obligations...', details:'Detailed Income Tax text here.' },
  { id:10, slug:'contract', title:'Indian Contract Act', category:'Civic', summary:'Contracts law...', details:'Detailed Contract Act text here.' },
];

function Header(){ return (<header className="bg-indigo-600 text-white p-4"><div className="max-w-6xl mx-auto flex justify-between"><Link to='/' className='font-bold'>NyayBuddy</Link><nav><Link to='/' className='mr-4'>Home</Link><Link to='/laws'>Laws</Link></nav></div></header>); }

function Home(){ const navigate = useNavigate(); let q=''; const go = ()=>{ const key = document.getElementById('search').value.trim().toLowerCase(); if(!key) return; const match = lawsData.find(l=> l.slug===key || l.title.toLowerCase().includes(key)); if(match) navigate('/law/'+match.slug); else alert('No law found'); }; return (<main className='p-6 max-w-6xl mx-auto'><div className='grid md:grid-cols-2 gap-6'><div><h1 className='text-3xl font-bold'>Legal awareness — made friendly</h1><p className='mt-2'>Search a short name (e.g. ipc) or browse laws.</p><div className='mt-4 flex gap-2'><input id='search' className='flex-1 p-2 border' placeholder='Try: ipc, rti...'/><button onClick={go} className='bg-indigo-600 text-white px-4 rounded'>Go</button></div></div><div className='bg-white p-4 rounded shadow'>Quick actions: Dial 112</div></div><section className='mt-6'><h2 className='text-2xl mb-3'>All Laws</h2><div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>{lawsData.map(l=>(<div key={l.slug} className='bg-white p-4 rounded shadow cursor-pointer' onClick={()=> window.location.href='/law/'+l.slug}><div className='font-semibold text-indigo-700'>{l.title}</div><div className='text-sm text-gray-600 mt-2'>{l.summary}</div></div>))}</div></section></main>); }

function Laws(){ return (<main className='p-6 max-w-6xl mx-auto'><h2 className='text-2xl mb-4'>All Laws</h2><div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>{lawsData.map(l=> (<Link key={l.slug} to={'/law/'+l.slug} className='block bg-white p-4 rounded shadow'><div className='font-semibold'>{l.title}</div><div className='text-sm text-gray-600 mt-1'>{l.summary}</div></Link>))}</div></main>); }

function LawDetail(){ const {slug} = useParams(); const navigate = useNavigate(); const law = lawsData.find(l=> l.slug===slug); if(!law) return (<main className='p-6 max-w-4xl mx-auto text-center'><h2>Law not found</h2><button onClick={()=> navigate(-1)} className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded'>Go back</button></main>); return (<main className='p-6 max-w-4xl mx-auto'><div className='flex items-start'><div><h1 className='text-2xl font-bold text-indigo-700'>{law.title}</h1><div className='text-sm text-gray-500 mt-1'>Category: {law.category}</div></div><div className='ml-auto'><button onClick={()=> navigate(-1)} className='px-3 py-2 border rounded'>Back</button></div></div><article className='mt-6 bg-white p-6 rounded shadow'><p className='whitespace-pre-line text-gray-700'>{law.details}</p></article></main>); }

export default function NyayBuddyApp(){ return (<BrowserRouter><div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'><Header /><AnimatePresence mode='wait'><Routes><Route path='/' element={<Home/>} /><Route path='/laws' element={<Laws/>} /><Route path='/law/:slug' element={<LawDetail/>} /><Route path='*' element={<Home/>} /></Routes></AnimatePresence><footer className='text-center p-6 text-gray-600'>© 2025 NyayBuddy — Madhu Kumari</footer></div></BrowserRouter>); }
