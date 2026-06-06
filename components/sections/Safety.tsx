"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HardHat, FileText, Camera, Handshake, Building } from "@phosphor-icons/react";

const pillars = [
  {
    icon: HardHat,
    title: "Снаряжение",
    body: "Профессиональное альпинистское снаряжение Petzl и CAMP. Ежедневная проверка перед каждым подъёмом.",
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
    <section id="safety" className="py-32 bg-bg overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEFT: System Header */}
          <div className="lg:col-span-5 sticky top-32">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-6 block">
              Safety First Standards
            </span>
            <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-ink mb-12">
              Сначала <br /> безопасность. <br /> Потом <br /> <span className="text-sky">скорость.</span>
            </h2>
            <div className="space-y-8">
              <p className="text-muted text-lg leading-relaxed max-w-sm">
                Мы не просто работаем на высоте — мы управляем рисками. Нулевой уровень инцидентов — это наш базовый KPI.
              </p>
              <div className="p-8 rounded-[2rem] border border-line bg-surface shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-soft-blue flex items-center justify-center text-sky">
                    <ShieldCheck size={24} weight="bold" />
                  </div>
                  <span className="font-display font-black uppercase text-sm tracking-widest text-ink">
                    Certified Protocol
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed">
                  Полный пакет документов передается заказчику до первого выхода бригады на фасад.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Spec Sheet Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-10 rounded-[2.5rem] border border-line bg-surface hover:bg-ink hover:text-white transition-editorial"
              >
                <div className="w-14 h-14 rounded-2xl bg-bg flex items-center justify-center text-ink group-hover:bg-safety group-hover:text-white transition-colors duration-500 mb-8">
                  <pillar.icon size={32} weight="duotone" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase tracking-tight mb-4">
                  {pillar.title}
                </h3>
                <p className="text-muted group-hover:text-white/60 text-sm leading-relaxed">
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
