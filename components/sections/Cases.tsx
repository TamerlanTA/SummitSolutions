"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import { projects } from "@/content/site";

function PortfolioItem({ project, index }: { project: typeof projects[0], index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -36 : 36]);

  return (
    <motion.div 
      ref={itemRef}
      style={{ y: index !== 1 ? y : 0 }}
      className={`relative mb-10 sm:mb-16 lg:mb-28 ${index === 1 ? 'lg:ml-auto' : ''} max-w-5xl`}
    >
      <div data-case-card className="group relative overflow-hidden rounded-[16px] border border-line bg-surface p-3 sm:p-5 shadow-sm transition-editorial hover:shadow-card">
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-[10px] sm:rounded-[12px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
          />
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <div className="bg-white/85 backdrop-blur-md px-4 sm:px-5 py-2 rounded-[999px] border border-white/50">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink">{project.tag}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 p-2 sm:p-3">
          <div className="md:col-span-7">
            <h3 className="font-display text-3xl sm:text-4xl md:text-6xl font-black tracking-normal uppercase text-ink mb-5 leading-none">
              {project.title}
            </h3>
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-6">
              {project.task}
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-bg px-4 py-2 rounded-[8px] font-mono text-[9px] uppercase tracking-widest text-muted border border-line leading-relaxed">
                Результат: {project.result}
              </span>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-end">
            <div className="space-y-4 border-t border-line pt-8">
              <div data-case-meta-row className="grid grid-cols-[86px_1fr] sm:grid-cols-[110px_1fr] gap-4 items-start">
                <span data-case-meta-label className="font-mono text-[9px] uppercase tracking-widest text-muted pt-1">Срок</span>
                <span data-case-meta-value className="font-display font-black text-lg sm:text-xl uppercase text-ink text-right leading-tight break-words">
                  {project.timeline}
                </span>
              </div>
              <div data-case-meta-row className="grid grid-cols-[86px_1fr] sm:grid-cols-[110px_1fr] gap-4 items-start">
                <span data-case-meta-label className="font-mono text-[9px] uppercase tracking-widest text-muted pt-1">Бригада</span>
                <span data-case-meta-value className="font-display font-black text-lg sm:text-xl uppercase text-ink text-right leading-tight break-words">
                  {project.team}
                </span>
              </div>
              <div data-case-meta-row className="grid grid-cols-[86px_1fr] sm:grid-cols-[110px_1fr] gap-4 items-start">
                <span data-case-meta-label className="font-mono text-[9px] uppercase tracking-widest text-muted pt-1">Локация</span>
                <span data-case-meta-value className="font-display font-black text-lg sm:text-xl uppercase text-ink text-right leading-tight break-words">
                  {project.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Cases() {
  return (
    <section id="cases" className="py-20 sm:py-24 lg:py-32 bg-bg overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 sm:mb-16 lg:mb-24 gap-8 lg:gap-12">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-4 block">
              Выполненные работы
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-[9vw] font-black tracking-normal uppercase leading-[0.85] text-ink">
              Объекты <br /> <span className="text-safety italic">на высоте</span>
            </h2>
          </div>
          <div className="md:pt-8 max-w-sm">
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Архив завершенных объектов в Алматы. Прозрачная отчетность и соблюдение регламентов на каждой высоте.
            </p>
          </div>
        </div>

        <div className="relative">
          {projects.map((project, index) => (
            <PortfolioItem key={index} project={project} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <a href="#quiz" className="group flex items-center gap-5 bg-ink text-white px-8 sm:px-10 py-4 sm:py-5 rounded-[6px] font-display font-black uppercase text-xs sm:text-sm tracking-[0.2em] hover:bg-safety transition-all active:scale-95">
            <span>Рассчитать похожий объект</span>
            <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
