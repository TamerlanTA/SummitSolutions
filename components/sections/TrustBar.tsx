"use client";

import { Certificate, ShieldCheck, Camera, Truck } from "@phosphor-icons/react";

const items = [
  { icon: Certificate, text: "Допуски к высотным работам" },
  { icon: ShieldCheck, text: "Работа по договору" },
  { icon: Camera, text: "Фотоотчёт после работ" },
  { icon: Truck, text: "Выезд на объект" },
];

export function TrustBar() {
  return (
    <section className="py-8 sm:py-10 border-y border-line bg-surface">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-4 rounded-[10px] border border-line/70 bg-bg px-4 py-4 group"
            >
              <div className="w-10 h-10 rounded-[8px] bg-soft-orange flex items-center justify-center text-safety group-hover:scale-110 transition-transform shrink-0">
                <item.icon size={20} weight="bold" />
              </div>
              <span className="font-display font-black uppercase text-[11px] tracking-widest text-ink leading-snug">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
