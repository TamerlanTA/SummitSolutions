"use client";

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
    <section className="py-20 sm:py-24 lg:py-32 bg-bg overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-6 block">
              Оценка рисков
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-normal uppercase leading-[1.06] text-ink mb-8 sm:mb-10">
              На высоте <br /> ошибка стоит <br /> <span className="text-safety italic">дороже</span> <br /> чем кажется
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed max-w-md">
              Выбор случайного подрядчика — это лотерея, где на кону безопасность здания и ваша репутация.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {risks.map((risk) => (
              <div
                key={risk.title}
                className="bg-surface p-6 sm:p-8 lg:p-10 rounded-[14px] border border-line shadow-sm hover:border-safety transition-editorial"
              >
                <div className="w-12 h-12 rounded-[10px] bg-soft-orange flex items-center justify-center text-safety mb-7">
                  <risk.icon size={28} weight="duotone" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase tracking-normal text-ink mb-4">
                  {risk.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {risk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
