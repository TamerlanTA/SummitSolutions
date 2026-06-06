"use client";

import { ArrowDownRight, WhatsappLogo } from "@phosphor-icons/react";

export function FinalCTA() {
  return (
    <section id="contact" className="relative py-24 md:py-40 bg-bg overflow-hidden">
      <div className="absolute inset-0 grid-editorial opacity-[0.4] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-ink rounded-[2.25rem] md:rounded-[4rem] p-7 sm:p-8 md:p-24 relative overflow-hidden shadow-2xl">
          {/* Background Text Decor */}
          <div className="absolute top-0 right-0 font-display text-[30vw] font-black text-bg/[0.04] select-none pointer-events-none uppercase leading-none">
            Vysota
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-safety mb-8 block">
                Direct Contact
              </span>
              <h2 className="font-display text-[clamp(3rem,12vw,6rem)] md:text-8xl font-black tracking-normal uppercase leading-[0.9] md:leading-[0.85] text-bg mb-10 md:mb-12">
                Обсудим <br /> ваш <span className="text-safety italic">объект?</span>
              </h2>
              <p className="text-bg/65 text-lg md:text-xl leading-relaxed max-w-md mb-12">
                Мы подготовим предварительный расчёт и план работ в день обращения. Никакого ожидания в пустоту.
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                <a href="#quiz" className="group inline-flex items-center justify-center gap-6 bg-safety text-bg px-8 sm:px-10 py-5 rounded-full font-display font-black uppercase text-sm tracking-widest hover:bg-bg hover:text-ink transition-all transform hover:scale-[1.02] min-h-14">
                  <span>Получить расчёт</span>
                  <ArrowDownRight size={24} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                </a>
                <a href="https://wa.me/77071234567" className="inline-flex items-center justify-center gap-4 border border-bg/20 text-bg px-8 sm:px-10 py-5 rounded-full font-display font-black uppercase text-sm tracking-widest hover:bg-bg/10 transition-all min-h-14">
                  <WhatsappLogo size={24} weight="fill" className="text-[#25D366]" />
                  <span>Написать в WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="text-right">
                <div className="mb-12">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-bg/35 mb-2 block">Central Office</span>
                  <address className="not-italic font-display text-2xl font-black text-bg uppercase tracking-normal">
                    Алматы, Казахстан <br /> пр. Аль-Фараби
                  </address>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-bg/35 mb-2 block">Call Center</span>
                  <a href="tel:+77071234567" className="font-display text-4xl font-black text-bg hover:text-safety transition-colors">
                    +7 707 123 45 67
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
