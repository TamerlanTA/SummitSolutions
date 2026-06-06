"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui/SectionShell";
import {
  Send,
  PhoneCall,
  Clock,
  MapPin,
  Building2,
  Wrench,
  Flame,
} from "lucide-react";

export function CRMPreview() {
  return (
    <SectionShell
      id="crm"
      index="09"
      eyebrow="Integration"
      title="Контроль в реальном времени"
      subtitle="Карточка в CRM + мгновенный Telegram-алёрт. Все параметры объекта доступны бригадиру через минуту после заявки."
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        {/* CRM card */}
        <motion.article 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative rounded-lg border border-line-strong bg-bg shadow-card overflow-hidden"
        >
          <header className="flex items-center justify-between border-b border-line bg-bg-deep/5 px-6 py-4">
            <div className="flex items-center gap-4">
              <span className="mono text-[9px] font-bold uppercase tracking-[0.25em] text-ink-muted">
                Airtable · Leads
              </span>
              <span className="mono text-[10px] text-ink-dim tracking-tight font-bold border-l border-line pl-4">#2451</span>
            </div>
            <span className="mono text-[9px] font-bold uppercase tracking-[0.2em] text-cyan border border-cyan/20 rounded-sm px-2 py-0.5 bg-cyan/5">
              New
            </span>
          </header>

          <div className="px-6 md:px-10 py-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="max-w-md">
                <div className="mono text-[9px] font-bold uppercase tracking-[0.25em] text-ink-muted mb-2">
                  Object Details
                </div>
                <h3 className="text-2xl font-bold text-ink tracking-tighter leading-[1.1]">
                  ЖК · 12 этажей · Герметизация швов
                </h3>
                <div className="mt-4 text-sm text-ink-dim flex items-center gap-2 font-medium tracking-tight">
                  <MapPin size={16} className="text-ink-muted" />
                  Алматы, мкр. Самал
                </div>
              </div>

              {/* AI score gauge */}
              <div className="shrink-0 rounded-lg border border-line-strong bg-bg-elev p-6 shadow-soft min-w-[160px]">
                <div className="mono text-[9px] font-bold uppercase tracking-[0.2em] text-cyan mb-2">
                  AI score
                </div>
                <div className="text-3xl font-bold text-ink tracking-tighter mono">9 / 10</div>
                <div className="mt-4 h-1 w-full rounded-full bg-line overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="h-full bg-cyan" 
                  />
                </div>
              </div>
            </div>

            <dl className="mt-12 grid sm:grid-cols-2 gap-px bg-line border border-line rounded-lg overflow-hidden">
              <Cell
                icon={<Building2 size={16} />}
                k="Тип объекта"
                v="Жилой комплекс"
              />
              <Cell
                icon={<Wrench size={16} />}
                k="Тип работ"
                v="Герметизация швов"
              />
              <Cell
                icon={<Clock size={16} />}
                k="Срочность"
                v="Высокая · 24 часа"
                accent="safety"
              />
              <Cell
                icon={<Flame size={16} />}
                k="Стадия"
                v="AI Call · active"
                accent="cyan"
              />
            </dl>

            <div className="mt-10 grid gap-3 rounded-lg border border-line bg-bg-elev p-6 shadow-soft">
              <div className="mono text-[9px] font-bold uppercase tracking-[0.25em] text-ink-muted">
                AI Call Summary
              </div>
              <p className="text-sm text-ink font-medium leading-relaxed tracking-tight">
                «Объект — 12-этажный ЖК, нужно загерметизировать ~600 п. м. швов
                до конца недели. УК готова к согласованию, доступ через служебный вход.»
              </p>
            </div>
          </div>

          <footer className="flex items-center justify-between border-t border-line bg-bg-deep/5 px-6 py-4">
            <div className="flex items-center gap-3 mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-safety animate-pulse" />
              Next Step: Measurement
            </div>
            <span className="mono text-[10px] text-ink-muted font-bold">
              16:42 · 2m ago
            </span>
          </footer>
        </motion.article>

        {/* Telegram bubble */}
        <motion.aside 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative rounded-lg border border-line-strong bg-bg-elev shadow-card overflow-hidden lg:mt-12"
        >
          <header className="flex items-center gap-4 border-b border-line bg-bg px-6 py-4">
            <span className="grid place-items-center h-10 w-10 rounded-lg bg-bg-deep border border-line text-cyan shadow-sm">
              <Send size={18} strokeWidth={1.5} />
            </span>
            <div>
              <div className="text-sm font-bold text-ink tracking-tight">Brigade Alerts</div>
              <div className="mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink-muted">
                Telegram Bot · Live
              </div>
            </div>
          </header>

          <div className="px-6 py-8 space-y-6">
            <Bubble time="16:41">
              <div className="font-bold text-ink tracking-tighter mb-2">🚨 Новый лид · #2451</div>
              <div className="text-[13px] text-ink-dim font-medium tracking-tight">
                ЖК, 12 этажей · Герметизация · <b className="text-safety font-bold">СРОЧНО</b>
              </div>
              <div className="mt-3 text-[13px] text-ink-muted font-medium tracking-tight">
                Contact: <span className="text-ink font-bold mono">Aidos, +7 707 *** ** 12</span>
              </div>
              <div className="mt-2 text-[13px] text-ink-muted font-medium tracking-tight">
                Precision: <span className="text-cyan font-bold mono">9/10</span>
              </div>
            </Bubble>

            <Bubble time="16:42">
              <div className="text-[13px] text-ink-dim font-medium tracking-tight leading-relaxed">
                Lead summary successfully exported to CRM. Review and accept:
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-[4px] bg-ink text-bg px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] cursor-default shadow-soft">
                  <PhoneCall size={12} /> Call now
                </span>
                <span className="inline-flex items-center gap-2 rounded-[4px] border border-line-strong bg-bg text-ink-dim px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] cursor-default hover:text-ink hover:bg-bg-deep transition-all">
                  Open Card
                </span>
              </div>
            </Bubble>
          </div>
        </motion.aside>
      </div>
    </SectionShell>
  );
}

function Cell({
  icon,
  k,
  v,
  accent,
}: {
  icon: React.ReactNode;
  k: string;
  v: string;
  accent?: "safety" | "cyan";
}) {
  const accentText =
    accent === "safety"
      ? "text-safety"
      : accent === "cyan"
        ? "text-cyan"
        : "text-ink";
  return (
    <div className={`bg-bg-elev px-6 py-5`}>
      <div className="flex items-center gap-3 mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink-muted mb-2">
        {icon}
        {k}
      </div>
      <div className={`text-sm font-bold tracking-tight ${accentText}`}>{v}</div>
    </div>
  );
}

function Bubble({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="relative rounded-lg rounded-tl-sm border border-line bg-bg px-6 py-5 text-sm shadow-soft"
    >
      {children}
      <div className="mt-4 text-right mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink-muted opacity-60">
        {time}
      </div>
    </motion.div>
  );
}
