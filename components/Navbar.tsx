"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownRight, List, X } from "@phosphor-icons/react";
import { brand, navItems } from "@/content/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-[100] px-4 py-3 md:px-6 md:py-5 pointer-events-none transition-editorial">
      <div className="container mx-auto pointer-events-auto">
        <div className="flex items-center justify-between rounded-[12px] border border-line/80 bg-bg/88 px-3 py-3 shadow-sm backdrop-blur-xl md:bg-bg/78 md:px-4">
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-ink flex items-center justify-center rounded-sm overflow-hidden relative">
            <div className="w-full h-full bg-safety absolute top-0 left-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 text-bg font-display font-black text-lg md:text-xl tracking-tighter">V.</span>
          </div>
          <div className="hidden sm:block">
            <span className="block font-display font-black text-lg md:text-xl tracking-tighter leading-none uppercase">Vysota.</span>
            <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-zinc-500">Высотные стандарты</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navItems.map((item) => (
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
            href={brand.phoneHref}
            className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-ink transition-colors"
          >
            {brand.phone}
          </a>
          <a href="#quiz" className="hidden sm:flex items-center gap-2 bg-ink text-bg px-4 md:px-6 py-2.5 md:py-3 rounded-[6px] font-display font-bold uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-safety transition-colors group min-h-11">
            <span>Расчёт</span>
            <ArrowDownRight size={14} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-[6px] border border-line bg-surface text-ink"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-2 rounded-[12px] border border-line bg-bg/96 p-3 shadow-card backdrop-blur-xl">
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-[8px] px-4 py-4 font-display text-lg font-black uppercase text-ink hover:bg-surface"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 grid grid-cols-1 gap-2 border-t border-line pt-3 sm:grid-cols-2">
              <a href={brand.phoneHref} className="rounded-[8px] bg-surface px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-ink">
                {brand.phone}
              </a>
              <a href="#quiz" onClick={() => setIsOpen(false)} className="rounded-[8px] bg-ink px-4 py-3 text-center font-display text-xs font-black uppercase tracking-widest text-bg">
                Получить расчёт
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
