"use client";

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
    <section className="py-20 sm:py-24 lg:py-32 bg-bg overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-4xl mb-12 sm:mb-16 lg:mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-6 block">
            После обращения
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-8xl font-black tracking-normal uppercase leading-[1.04] text-ink mb-8 sm:mb-10">
            После заявки вы <br /> <span className="text-safety italic">не ждёте</span> <br /> в пустоту
          </h2>
          <p className="text-muted text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
            Мы быстро уточняем детали объекта, оцениваем сложность работ и возвращаемся с понятным следующим шагом — предварительным расчётом, выездом или консультацией.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-line border border-line rounded-[16px] overflow-hidden shadow-sm">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="bg-surface p-6 sm:p-8 lg:p-10 hover:bg-soft-orange transition-colors duration-500 group"
            >
              <div className="w-12 h-12 rounded-[10px] bg-bg flex items-center justify-center text-ink group-hover:bg-safety group-hover:text-white transition-colors duration-500 mb-7">
                <step.icon size={28} weight="duotone" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted mb-4 block">Шаг 0{index + 1}</span>
              <h3 className="font-display text-xl font-black uppercase tracking-normal text-ink mb-4">
                {step.title}
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
