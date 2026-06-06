"use client";

import { motion } from "framer-motion";
import { PaperPlaneTilt, MagnifyingGlass, ChartLineUp, Calculator, Truck } from "@phosphor-icons/react";

const steps = [
  {
    icon: PaperPlaneTilt,
    title: "Заявка",
    desc: "Ваши данные мгновенно попадают к дежурному специалисту.",
  },
  {
    icon: MagnifyingGlass,
    title: "Уточнение деталей",
    desc: "Мы связываемся, чтобы задать 2-3 уточняющих вопроса об объекте.",
  },
  {
    icon: ChartLineUp,
    title: "Оценка сложности",
    desc: "Анализируем доступ к точкам крепления и тип покрытия фасада.",
  },
  {
    icon: Calculator,
    title: "Предварительный расчёт",
    desc: "Формируем коммерческое предложение с точными сроками.",
  },
  {
    icon: Truck,
    title: "Выезд / Договор",
    desc: "Финальный осмотр объекта и подписание договора на работы.",
  },
];

export function AfterRequest() {
  return (
    <section className="py-32 bg-bg overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-6 block">
            Process Transparency
          </span>
          <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-ink mb-12">
            После заявки вы <br /> <span className="text-safety italic">не ждёте</span> <br /> в пустоту.
          </h2>
          <p className="text-muted text-lg lg:text-xl leading-relaxed max-w-2xl">
            Мы быстро уточняем детали объекта, оцениваем сложность работ и возвращаемся с понятным следующим шагом — предварительным расчётом, выездом или консультацией.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-line border border-line rounded-[3rem] overflow-hidden shadow-sm">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface p-10 hover:bg-soft-orange transition-colors duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-bg flex items-center justify-center text-ink group-hover:bg-safety group-hover:text-white transition-colors duration-500 mb-8">
                <step.icon size={28} weight="duotone" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted mb-4 block">Step 0{index + 1}</span>
              <h3 className="font-display text-xl font-black uppercase tracking-tight text-ink mb-4">
                {step.title}
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
