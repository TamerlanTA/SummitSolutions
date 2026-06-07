"use client";

import { CaretDown } from "@phosphor-icons/react";
import Image from "next/image";
import { brand, siteImages } from "@/content/site";

export function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden bg-bg pt-24 sm:pt-28 lg:pt-36 pb-14"
    >
      <div className="absolute inset-0 grid-editorial opacity-[0.4] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg via-bg/90 to-transparent pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 grid min-h-[calc(100dvh-8rem)] grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        <div className="lg:col-span-6 xl:col-span-6 min-w-0">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="w-2 h-2 rounded-full bg-safety animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.34em] text-muted text-balance">
              Высотные работы · {brand.city}
            </span>
          </div>

          <h1 className="font-display text-[clamp(2rem,8vw,2.2rem)] sm:text-[clamp(2.45rem,7vw,5.2rem)] lg:text-[clamp(3.9rem,4.35vw,5.05rem)] leading-[0.98] font-black tracking-normal uppercase text-ink max-w-full sm:max-w-[12ch] lg:max-w-[10.8ch]">
            <span className="block">Промышленные</span>
            <span className="block lg:pl-[4vw]">альпинисты</span>
            <span className="block">для сложных</span>
            <span className="block lg:pl-[6vw] text-safety">объектов</span>
          </h1>

          <div className="mt-8 sm:mt-10 max-w-2xl">
            <p className="text-muted text-base sm:text-lg lg:text-xl leading-relaxed">
              Фасады, швы, крыши и высотный монтаж в Алматы. Быстрый предварительный расчёт, аккуратное выполнение и работа по договору.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
              <a href="#quiz" className="inline-flex min-h-[52px] items-center justify-center bg-ink text-bg px-7 sm:px-9 py-4 rounded-[6px] font-display font-black uppercase text-xs sm:text-sm tracking-widest hover:bg-safety transition-all active:scale-95">
                Получить расчёт
              </a>
              <a href="#cases" className="inline-flex min-h-[52px] items-center justify-center bg-surface border border-line text-ink px-7 sm:px-9 py-4 rounded-[6px] font-display font-black uppercase text-xs sm:text-sm tracking-widest hover:bg-ink hover:text-bg transition-all">
                Смотреть работы
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:max-w-xl">
              {[
                ["24 ч", "выезд на осмотр"],
                ["0", "скрытых платежей"],
                ["3 года", "гарантия по договору"],
              ].map(([value, label]) => (
                <div key={label} className="bg-surface px-3 py-4 sm:px-5">
                  <div className="font-display text-xl sm:text-2xl font-black text-ink">{value}</div>
                  <div className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-wider text-muted leading-snug">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
          <div className="relative mt-4 lg:mt-0 overflow-hidden rounded-[18px] border border-line bg-surface p-3 shadow-card group">
            <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[3/4] overflow-hidden rounded-[12px]">
              <Image
                src={siteImages.hero}
                alt="Фрагмент высотного фасада"
                fill
                priority
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover grayscale-[0.25] group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
            </div>

            <div className="absolute top-3 right-8 h-[calc(100%-1.5rem)] w-px bg-white/35">
              <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-safety shadow-[0_0_16px_rgba(255,90,31,0.65)]" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 bg-bg/90 backdrop-blur-md p-4 rounded-[10px] border border-white/60">
              <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-widest text-ink">
                <span>Допуск к высоте</span>
                <span className="text-safety">готов</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[20%] right-[10%] hidden xl:block">
        <div className="bg-surface border border-line px-4 py-2 rounded-[999px] shadow-sm flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-sky" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-ink">Герметизация фасада</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block animate-bounce">
        <CaretDown size={24} className="text-muted" />
      </div>
    </section>
  );
}
