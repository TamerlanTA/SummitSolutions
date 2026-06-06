"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";

const faqs = [
  {
    q: "Как быстро вы можете выехать на объект?",
    a: "На предварительный осмотр и замер мы выезжаем в течение 24 часов после вашей заявки. Сами работы начинаются после согласования с администрацией объекта и подписания договора.",
  },
  {
    q: "Работаете ли вы с частными лицами?",
    a: "Да, мы выполняем работы как для крупных ЖК и БЦ, так и для частных домов и коттеджей (мойка окон, покраска фасада, ремонт кровли).",
  },
  {
    q: "Какие гарантии вы предоставляете?",
    a: "На все виды работ мы даем официальную гарантию от 1 года до 3 лет, прописанную в договоре. Мы несем полную материальную ответственность за сохранность фасада.",
  },
  {
    q: "Нужно ли мне согласовывать работы с КСК / ОСИ?",
    a: "Мы берем на себя подготовку пакета технических документов для управляющей компании (протоколы аттестации, ТБ, график). Вам нужно только уведомить их о дате начала.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-surface overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-6 block">
              Common Inquiries
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-ink mb-12">
              Частые <br /> вопросы.
            </h2>
            <p className="text-muted text-lg leading-relaxed max-w-sm">
              Если у вас остались специфические вопросы по высотным работам, мы готовы обсудить их при первом звонке.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="group border border-line rounded-[2rem] bg-bg overflow-hidden transition-all duration-500 hover:border-safety"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left"
                >
                  <span className="font-display text-xl md:text-2xl font-black uppercase tracking-tighter text-ink">
                    {faq.q}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-ink text-white rotate-180' : 'bg-surface text-ink group-hover:bg-soft-orange group-hover:text-safety'}`}>
                    {openIndex === index ? <Minus size={20} weight="bold" /> : <Plus size={20} weight="bold" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                    >
                      <div className="px-8 pb-8 pt-0">
                        <p className="text-muted text-lg leading-relaxed max-w-2xl border-t border-line/30 pt-8">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
