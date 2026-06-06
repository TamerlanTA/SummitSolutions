"use client";

import { motion } from "framer-motion";
import { Certificate, ShieldCheck, Camera, Truck } from "@phosphor-icons/react";

const items = [
  { icon: Certificate, text: "Допуски к высотным работам" },
  { icon: ShieldCheck, text: "Работа по договору" },
  { icon: Camera, text: "Фотоотчёт после работ" },
  { icon: Truck, text: "Выезд на объект" },
];

export function TrustBar() {
  return (
    <section className="py-12 border-y border-line bg-surface">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-soft-orange flex items-center justify-center text-safety group-hover:scale-110 transition-transform">
                <item.icon size={20} weight="bold" />
              </div>
              <span className="font-display font-black uppercase text-[10px] tracking-widest text-ink">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
