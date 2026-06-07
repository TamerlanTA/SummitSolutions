"use client";

import { ShieldCheck, HardHat, FileText, Camera, Handshake, Building } from "@phosphor-icons/react";

const pillars = [
  {
    icon: HardHat,
    title: "Снаряжение",
    body: "Профессиональное альпинистское снаряжение с ежедневной проверкой перед каждым подъёмом.",
  },
  {
    icon: Building,
    title: "Оценка доступа",
    body: "Тщательная оценка доступа к крыше и надёжности точек крепления до начала любых работ.",
  },
  {
    icon: FileText,
    title: "Согласование",
    body: "Полное юридическое согласование с УК, КСК и администрацией. Подготовка всех разрешений.",
  },
  {
    icon: ShieldCheck,
    title: "Договор",
    body: "Работа строго по договору с чётко прописанной ответственностью и гарантией качества.",
  },
  {
    icon: Camera,
    title: "Фотоотчёт",
    body: "Прозрачность на каждом этапе. Подробная фотофиксация процесса и результата для заказчика.",
  },
  {
    icon: Handshake,
    title: "Аккуратность",
    body: "Бережное отношение к фасаду и покрытию. Гарантируем отсутствие повреждений при работе.",
  },
];

export function Safety() {
  return (
    <section id="safety" className="py-20 sm:py-24 lg:py-32 bg-bg overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-6 block">
              Стандарт безопасности
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-normal uppercase leading-[1.04] text-ink mb-8 sm:mb-10">
              Сначала <br /> безопасность <br /> Потом <br /> <span className="text-sky">скорость</span>
            </h2>
            <div className="space-y-8">
              <p className="text-muted text-base sm:text-lg leading-relaxed max-w-md">
                Мы не просто работаем на высоте — мы управляем рисками. Нулевой уровень инцидентов — наш базовый показатель качества.
              </p>
              <div className="p-6 sm:p-8 rounded-[14px] border border-line bg-surface shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-[8px] bg-soft-blue flex items-center justify-center text-sky shrink-0">
                    <ShieldCheck size={24} weight="bold" />
                  </div>
                  <span className="font-display font-black uppercase text-sm tracking-widest text-ink">
                    Проверенный регламент
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed">
                  Полный пакет документов передается заказчику до первого выхода бригады на фасад.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group p-6 sm:p-8 lg:p-10 rounded-[14px] border border-line bg-surface hover:bg-ink hover:text-white transition-editorial"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[10px] bg-bg flex items-center justify-center text-ink group-hover:bg-safety group-hover:text-white transition-colors duration-500 mb-7">
                  <pillar.icon size={32} weight="duotone" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase tracking-normal mb-4">
                  {pillar.title}
                </h3>
                <p className="text-muted group-hover:text-white/60 text-sm leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
