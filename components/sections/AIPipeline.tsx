"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Workflow,
  PhoneCall,
  Database,
  Send,
  MessagesSquare,
} from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { StatusDot } from "@/components/ui/StatusDot";

const nodes = [
  { icon: Globe, title: "Сайт", subtitle: "Lead capture", status: "ON" },
  { icon: Workflow, title: "n8n", subtitle: "Webhook · Scoring", status: "OK" },
  { icon: PhoneCall, title: "AI Call", subtitle: "Vapi · 15–60s", status: "OK" },
  { icon: Database, title: "CRM", subtitle: "Airtable Card", status: "OK" },
  { icon: Send, title: "Telegram", subtitle: "Brigade Alert", status: "OK" },
  { icon: MessagesSquare, title: "WhatsApp", subtitle: "Drip · 24h", status: "QUEUED" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export function AIPipeline() {
  return (
    <SectionShell
      id="pipeline"
      index="08"
      eyebrow="Automation"
      title="Технологическая вертикаль"
      subtitle="Никакой ручной возни. Лид проходит через систему за минуты. Бригада получает уведомление мгновенно."
    >
      <div className="relative rounded-lg border border-line-strong bg-bg shadow-card overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between border-b border-line bg-bg-deep/5 px-6 md:px-8 py-5">
          <StatusDot tone="cyan" label="Pipeline · Operational" />
          <span className="mono text-[10px] uppercase tracking-[0.25em] text-ink-muted font-bold">
            Avg latency · 2m 17s
          </span>
        </div>

        {/* pipeline */}
        <div className="relative px-6 md:px-10 py-12 md:py-16">
          {/* connecting line — desktop */}
          <div className="hidden md:block absolute left-12 right-12 top-[92px] h-px bg-line-strong opacity-40">
            <motion.div
              className="absolute -top-px h-px bg-gradient-to-r from-transparent via-cyan to-transparent w-1/4"
              initial={{ x: "-25%" }}
              animate={{ x: "400%" }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <motion.ol 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative grid gap-6 md:grid-cols-6"
          >
            {nodes.map(({ icon: Icon, title, subtitle, status }, i) => (
              <motion.li
                key={title}
                variants={item}
                className="relative flex md:flex-col items-center md:items-stretch gap-4 md:gap-0"
              >
                <div className="relative md:mx-auto h-16 w-16 grid place-items-center rounded-lg bg-bg-elev border border-line text-cyan shrink-0 group hover:border-ink/20 transition-all">
                  <Icon size={24} strokeWidth={1.5} />
                  <span className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full bg-cyan shadow-sm border-2 border-bg">
                    <span className="absolute inset-0 rounded-full bg-cyan animate-ping opacity-40" />
                  </span>
                </div>
                <div className="md:mt-8 md:text-center">
                  <div className="mono text-[10px] uppercase tracking-[0.2em] text-ink-muted font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-sm font-bold text-ink mt-1 tracking-tight">{title}</div>
                  <div className="text-[11px] text-ink-dim mt-0.5 tracking-tight font-medium uppercase opacity-80">{subtitle}</div>
                  <div className="mt-3 inline-flex mono text-[9px] font-bold uppercase tracking-[0.2em] text-cyan border border-cyan/20 rounded-sm px-2 py-0.5 bg-cyan/5">
                    {status}
                  </div>
                </div>

                {/* arrow on mobile */}
                {i < nodes.length - 1 && (
                  <span className="md:hidden absolute left-8 top-16 bottom-[-24px] w-px bg-line-strong opacity-40" />
                )}
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* metrics row */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border-t border-line"
        >
          {[
            { v: "< 60s", l: "Initial Touch" },
            { v: "9 / 10", l: "AI Precision" },
            { v: "100%", l: "CRM Sync" },
            { v: "24h", l: "Follow-up Cycle" },
          ].map((m) => (
            <div key={m.l} className="bg-bg-elev px-6 py-6">
              <div className="text-2xl font-bold text-ink tracking-tighter mono">{m.v}</div>
              <div className="mt-1 mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink-muted">
                {m.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
