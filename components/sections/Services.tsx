"use client";

import { motion } from "framer-motion";
import { Drop, Wrench, PaintBrush, Snowflake, HardHat, Hammer, ArrowUpRight } from "@phosphor-icons/react";

const services = [
  {
    icon: Drop,
    title: "Мытьё фасадов",
    desc: "Стекло, композит, алюкобонд. Профессиональная химия без разводов.",
  },
  {
    icon: Wrench,
    title: "Герметизация швов",
    desc: "Межпанельные и оконные швы. Полиуретановые составы, гарантия.",
  },
  {
    icon: PaintBrush,
    title: "Покраска фасадов",
    desc: "Подбор цвета по образцу, локальный ремонт или полная окраска.",
  },
  {
    icon: Snowflake,
    title: "Очистка крыш",
    desc: "Безопасное сбивание наледи, снега и сосулек с кровли.",
  },
  {
    icon: HardHat,
    title: "Высотный монтаж",
    desc: "Кондиционеры, баннеры, рекламные и ливневые конструкции.",
  },
  {
    icon: Hammer,
    title: "Ремонт фасадов",
    desc: "Замена плитки, заделка трещин и восстановление штукатурки.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 bg-surface overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-4 block">
              Our Expertise
            </span>
            <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-ink">
              Vertical <br /> Service <br /> Portfolio
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-muted text-sm leading-relaxed font-mono uppercase tracking-widest">
              Professional crews with full safety certification for Almaty.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-bg p-12 rounded-[2.5rem] border border-line hover:border-safety transition-editorial overflow-hidden"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center text-ink group-hover:bg-safety group-hover:text-white transition-colors duration-500 mb-12">
                  <service.icon size={32} weight="duotone" />
                </div>
                
                <h3 className="font-display text-3xl font-black uppercase tracking-tighter text-ink mb-6">
                  {service.title}
                </h3>
                
                <p className="text-muted text-base leading-relaxed mb-12 flex-1">
                  {service.desc}
                </p>
                
                <div className="flex items-center justify-between pt-8 border-t border-line/50">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                    Technical Spec Available
                  </span>
                  <ArrowUpRight size={20} className="text-line group-hover:text-safety group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>

              {/* Decorative background number */}
              <div className="absolute -bottom-8 -right-8 font-display text-[12rem] font-black text-ink/[0.02] select-none pointer-events-none">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
