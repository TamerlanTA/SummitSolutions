"use client";

import {
  Drop,
  Wrench,
  PaintBrush,
  Snowflake,
  HardHat,
  Hammer,
  ArrowUpRight,
  ShieldWarning,
  Camera,
  Building,
  ArrowsOutCardinal,
  Fan,
} from "@phosphor-icons/react";
import { services } from "@/content/site";

const icons = {
  drop: Drop,
  wrench: Wrench,
  paint: PaintBrush,
  snow: Snowflake,
  hardHat: HardHat,
  hammer: Hammer,
  shield: ShieldWarning,
  camera: Camera,
  building: Building,
  arrows: ArrowsOutCardinal,
  wind: Fan,
};

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 lg:py-32 bg-surface overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 lg:mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-4 block">
              Услуги
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-normal uppercase leading-[0.9] text-ink">
              Все работы <br /> на высоте
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Собираем услуги в один понятный список: от регулярной мойки фасадов до аварийных выездов и высотного монтажа.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-bg p-6 sm:p-8 lg:p-10 rounded-[14px] border border-line hover:border-safety transition-editorial overflow-hidden min-h-[280px]"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[10px] bg-surface flex items-center justify-center text-ink group-hover:bg-safety group-hover:text-white transition-colors duration-500 mb-8">
                  {(() => {
                    const Icon = icons[service.icon as keyof typeof icons] ?? Hammer;
                    return <Icon size={28} weight="duotone" />;
                  })()}
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-normal text-ink mb-4 leading-none">
                  {service.title}
                </h3>
                
                <p className="text-muted text-sm sm:text-base leading-relaxed mb-8 flex-1">
                  {service.desc}
                </p>
                
                <div className="flex items-center justify-between gap-4 pt-5 border-t border-line/70">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                    Смета после уточнения
                  </span>
                  <ArrowUpRight size={20} className="text-line group-hover:text-safety group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>

              <div className="absolute -bottom-7 -right-4 font-display text-[8rem] sm:text-[10rem] font-black text-ink/[0.025] select-none pointer-events-none leading-none">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
