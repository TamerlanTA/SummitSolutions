"use client";

import Link from "next/link";
import { brand, navItems } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white py-12 sm:py-16 border-t border-white/5">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 mb-10 sm:mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="font-display font-black text-3xl tracking-tighter uppercase mb-6 block">
              Vysota.
            </Link>
            <p className="text-zinc-500 max-w-sm font-mono text-xs uppercase tracking-widest leading-loose">
              Промышленные альпинисты в Алматы. Фасады, швы, крыши, монтаж и аварийные высотные работы по договору.
            </p>
          </div>
          
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-safety mb-6 block">
              Навигация
            </span>
            <ul className="space-y-4 font-display font-bold uppercase text-xs tracking-widest">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-safety transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-safety mb-6 block">
              Документы
            </span>
            <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              <li>Договор и гарантия</li>
              <li>Допуски к высоте</li>
              <li>Техника безопасности</li>
              <li>Фотоотчет работ</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 sm:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-600">
            © {new Date().getFullYear()} Vysota. {brand.address}.
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-600">
              {brand.phone}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-safety" />
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white">Прием заявок открыт</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
