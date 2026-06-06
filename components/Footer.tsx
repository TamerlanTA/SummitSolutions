"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-white py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="font-display font-black text-3xl tracking-tighter uppercase mb-6 block">
              Vysota.
            </Link>
            <p className="text-zinc-500 max-w-sm font-mono text-xs uppercase tracking-widest leading-loose">
              Setting the standard for vertical axis operations in Kazakhstan. Professional rope access, architectural maintenance, and high-altitude technical solutions.
            </p>
          </div>
          
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-safety mb-6 block">
              Navigation
            </span>
            <ul className="space-y-4 font-display font-bold uppercase text-xs tracking-widest">
              <li><a href="#services" className="hover:text-safety transition-colors">Expertise</a></li>
              <li><a href="#safety" className="hover:text-safety transition-colors">Safety Standard</a></li>
              <li><a href="#cases" className="hover:text-safety transition-colors">Project Archive</a></li>
              <li><a href="#contact" className="hover:text-safety transition-colors">Inquiry</a></li>
            </ul>
          </div>
          
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-safety mb-6 block">
              Legal & Safety
            </span>
            <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              <li>Liability Insurance</li>
              <li>Rope Access Permits</li>
              <li>IRATA Compliance</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-600">
            © {new Date().getFullYear()} Vysota Industrial. Almaty, Kazakhstan.
          </span>
          <div className="flex items-center gap-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-600">
              Developed for Premium Standard
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-safety" />
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white">System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
