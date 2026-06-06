"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CaretDown } from "@phosphor-icons/react";
import Image from "next/image";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-reveal", {
      y: 120,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.1,
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-center pt-28 md:pt-40 pb-14 overflow-hidden bg-bg"
    >
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 grid-editorial opacity-[0.4] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-12 items-end">
        {/* LEFT: Oversized Typography */}
        <div className="lg:col-span-9 min-w-0">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 rounded-full bg-safety animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] sm:tracking-[0.4em] text-muted text-balance">
              Vertical Axis · Almaty, KZ
            </span>
          </div>

          <h1 className="font-display text-[clamp(1.85rem,8.8vw,5.5rem)] lg:text-[clamp(5.2rem,5.9vw,7.8rem)] leading-[0.92] lg:leading-[0.84] font-black tracking-normal uppercase text-ink max-w-full">
            <div className="overflow-hidden">
              <div className="hero-reveal block max-w-full">Промышленные</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-reveal md:pl-[7vw] xl:pl-[8vw]">альпинисты</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-reveal">для сложных</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-reveal md:pl-[12vw] xl:pl-[14vw] text-safety">объектов</div>
            </div>
          </h1>

          <div className="mt-10 md:mt-12 max-w-xl">
            <p className="text-muted text-lg lg:text-xl leading-relaxed hero-reveal">
              Фасады, швы, крыши и высотный монтаж в Алматы. Быстрый предварительный расчёт, аккуратное выполнение и работа по договору.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-4 hero-reveal">
              <a href="#quiz" className="inline-flex items-center justify-center bg-ink text-bg px-8 sm:px-10 py-5 rounded-full font-display font-black uppercase text-sm tracking-widest hover:bg-safety transition-all transform hover:scale-[1.02] active:scale-95 min-h-14">
                Получить расчёт
              </a>
              <a href="#cases" className="inline-flex items-center justify-center bg-surface border border-line text-ink px-8 sm:px-10 py-5 rounded-full font-display font-black uppercase text-sm tracking-widest hover:bg-ink hover:text-bg transition-all min-h-14">
                Смотреть работы
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: Visual Anchor (Small Architectural Module) */}
        <div className="lg:col-span-3 hidden lg:block">
          <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-line bg-surface p-4 shadow-sm group">
            <div className="relative h-full w-full rounded-[1.8rem] overflow-hidden">
              <Image
                src="https://picsum.photos/seed/facade/800/1200"
                alt="Фрагмент высотного фасада"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-soft-orange/10 mix-blend-multiply" />
            </div>
            
            {/* Rope Motif Overlay */}
            <div className="absolute top-0 right-12 h-full w-px bg-white/20">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-safety shadow-[0_0_10px_rgba(255,90,31,0.5)]" />
            </div>

            <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-white/50">
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-ink">
                <span>Safe Access</span>
                <span className="text-safety">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Labels */}
      <div className="absolute top-[20%] right-[10%] hidden xl:block">
        <div className="bg-surface border border-line px-4 py-2 rounded-full shadow-sm flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-sky" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-ink">Facade Sealing</span>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <CaretDown size={24} className="text-muted" />
      </div>
    </section>
  );
}
