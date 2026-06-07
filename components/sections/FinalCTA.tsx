"use client";

import { ArrowDownRight, WhatsappLogo } from "@phosphor-icons/react";
import { brand } from "@/content/site";

export function FinalCTA() {
  return (
    <section id="contact" className="relative py-20 sm:py-24 md:py-32 bg-bg overflow-hidden">
      <div className="absolute inset-0 grid-editorial opacity-[0.4] pointer-events-none" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="bg-ink rounded-[18px] md:rounded-[28px] p-6 sm:p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 font-display text-[30vw] font-black text-bg/[0.04] select-none pointer-events-none uppercase leading-none">
            Vysota
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative z-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-6 sm:mb-8 block">
                Прямой контакт
              </span>
              <h2 className="font-display text-[clamp(2.7rem,11vw,6rem)] md:text-8xl font-black tracking-normal uppercase leading-[0.92] md:leading-[0.86] text-bg mb-8 md:mb-10">
                Обсудим <br /> ваш <span className="text-safety italic">объект?</span>
              </h2>
              <p className="text-bg/65 text-base sm:text-lg md:text-xl leading-relaxed max-w-md mb-8 sm:mb-10">
                Мы подготовим предварительный расчёт и план работ в день обращения. Никакого ожидания в пустоту.
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                <a href="#quiz" className="group inline-flex items-center justify-center gap-5 bg-safety text-bg px-7 sm:px-9 py-4 sm:py-5 rounded-[6px] font-display font-black uppercase text-xs sm:text-sm tracking-widest hover:bg-bg hover:text-ink transition-all min-h-[52px]">
                  <span>Получить расчёт</span>
                  <ArrowDownRight size={24} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                </a>
                <a href={brand.whatsappHref} className="inline-flex items-center justify-center gap-4 border border-bg/20 text-bg px-7 sm:px-9 py-4 sm:py-5 rounded-[6px] font-display font-black uppercase text-xs sm:text-sm tracking-widest hover:bg-bg/10 transition-all min-h-[52px]">
                  <WhatsappLogo size={24} weight="fill" className="text-[#25D366]" />
                  <span>Написать в мессенджер</span>
                </a>
              </div>
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="text-right">
                <div className="mb-12">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-bg/35 mb-2 block">Город работы</span>
                  <address className="not-italic font-display text-2xl font-black text-bg uppercase tracking-normal">
                    {brand.address} <br /> выезд на объект
                  </address>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-bg/35 mb-2 block">Телефон</span>
                  <a href={brand.phoneHref} className="font-display text-4xl font-black text-bg hover:text-safety transition-colors">
                    {brand.phone}
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
