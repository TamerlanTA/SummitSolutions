"use client";

import Link from "next/link";
import { ArrowDownRight } from "@phosphor-icons/react";

const nav = [
  { label: "Expertise", href: "#services" },
  { label: "Safety", href: "#safety" },
  { label: "Archive", href: "#cases" },
  { label: "Inquiry", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-[100] px-6 py-4 md:py-6 pointer-events-none transition-editorial">
      <div className="container mx-auto flex items-center justify-between pointer-events-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-ink flex items-center justify-center rounded-sm overflow-hidden relative">
            <div className="w-full h-full bg-safety absolute top-0 left-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 text-bg font-display font-black text-lg md:text-xl tracking-tighter">V.</span>
          </div>
          <div className="hidden sm:block">
            <span className="block font-display font-black text-lg md:text-xl tracking-tighter leading-none uppercase">Vysota.</span>
            <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-zinc-500">Vertical Axis Standards</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-ink hover:text-safety transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-8">
          <a
            href="tel:+77071234567"
            className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-ink transition-colors"
          >
            +7 707 123 45 67
          </a>
          <a href="#contact" className="flex items-center gap-2 bg-ink text-bg px-4 md:px-6 py-2.5 md:py-3 rounded-full font-display font-bold uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-safety transition-colors group min-h-11">
            <span>Inquiry</span>
            <ArrowDownRight size={14} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </header>
  );
}
