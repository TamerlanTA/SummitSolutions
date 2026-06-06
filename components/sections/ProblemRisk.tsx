"use client";

import { motion } from "framer-motion";
import { Warning, Clock, ShieldWarning, HouseLine } from "@phosphor-icons/react";

const risks = [
  {
    icon: HouseLine,
    title: "Фасад",
    desc: "Неправильная химия или оборудование могут необратимо испортить дорогое покрытие здания.",
  },
  {
    icon: Clock,
    title: "Сроки",
    desc: "Случайные бригады часто срывают графики из-за отсутствия дисциплины и планирования.",
  },
  {
    icon: ShieldWarning,
    title: "Безопасность",
    desc: "Отсутствие сертифицированного снаряжения — это прямой риск инцидентов на вашем объекте.",
  },
  {
    icon: Warning,
    title: "Ответственность",
    desc: "Без официального договора вы остаетесь один на один с возможными убытками.",
  },
];

export function ProblemRisk() {
  return (
    <section className="py-32 bg-bg overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEFT: Emotional Headline */}
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-6 block">
              Risk Assessment
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-ink mb-12">
              На высоте <br /> ошибка стоит <br /> <span className="text-safety italic">дороже,</span> <br /> чем кажется.
            </h2>
            <p className="text-muted text-lg leading-relaxed max-w-sm">
              Выбор случайного подрядчика — это лотерея, где на кону безопасность здания и ваша репутация.
            </p>
          </div>

          {/* RIGHT: Risk Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {risks.map((risk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface p-10 rounded-[2rem] border border-line shadow-sm hover:border-safety transition-editorial"
              >
                <div className="w-12 h-12 rounded-2xl bg-soft-orange flex items-center justify-center text-safety mb-8">
                  <risk.icon size={28} weight="duotone" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-ink mb-4">
                  {risk.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {risk.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
