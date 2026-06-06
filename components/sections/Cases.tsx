"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";

const projects = [
  {
    tag: "LCD",
    title: "Жилой комплекс",
    location: "Алматы, 16 этажей",
    task: "Герметизация межпанельных швов фасада.",
    timeline: "11 рабочих дней",
    team: "4 специалиста",
    result: "Закрыто 1 240 п. м. швов, гарантия 3 года.",
    image: "https://picsum.photos/seed/project1/800/1000",
  },
  {
    tag: "BC",
    title: "Бизнес-центр",
    location: "Алматы, Класс B+",
    task: "Сезонная мойка стеклянного фасада.",
    timeline: "4 рабочих дня",
    team: "3 специалиста",
    result: "1 800 м² фасада без остановки офисов.",
    image: "https://picsum.photos/seed/project2/1000/800",
  },
  {
    tag: "RES",
    title: "Частный дом",
    location: "Предгорье Алматы",
    task: "Покраска фасада и ремонт штукатурки.",
    timeline: "6 рабочих дней",
    team: "2 специалиста",
    result: "Цвет по образцу, полная защита участка.",
    image: "https://picsum.photos/seed/project3/800/1200",
  },
];

function PortfolioItem({ project, index }: { project: typeof projects[0], index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -100 : 100]);

  return (
    <motion.div 
      ref={itemRef}
      style={{ y: index !== 1 ? y : 0 }}
      className={`relative mb-32 md:mb-64 ${index === 1 ? 'md:ml-auto' : ''} max-w-4xl`}
    >
      <div className="group relative overflow-hidden rounded-[3rem] border border-line bg-surface p-6 shadow-sm transition-editorial hover:shadow-xl">
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[2rem]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
          />
          <div className="absolute top-8 right-8">
            <div className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/50">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink">{project.tag}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <h3 className="font-display text-4xl md:text-6xl font-black tracking-tighter uppercase text-ink mb-6">
              {project.title}
            </h3>
            <p className="text-muted text-lg leading-relaxed mb-8">
              {project.task}
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-bg px-4 py-2 rounded-lg font-mono text-[9px] uppercase tracking-widest text-muted border border-line">
                Result: {project.result}
              </span>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-end">
            <div className="space-y-4 border-t border-line pt-8">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted">Timeline</span>
                <span className="font-display font-black text-xl uppercase text-ink">{project.timeline}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted">Team Size</span>
                <span className="font-display font-black text-xl uppercase text-ink">{project.team}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted">Location</span>
                <span className="font-display font-black text-xl uppercase text-ink">{project.location}</span>
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
    <section id="cases" className="py-32 bg-bg overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-32 gap-12">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-4 block">
              Portfolio Archive
            </span>
            <h2 className="font-display text-6xl md:text-[10vw] font-black tracking-tighter uppercase leading-[0.8] text-ink">
              Selected <br /> <span className="text-safety italic">Ascents.</span>
            </h2>
          </div>
          <div className="md:pt-12 max-w-xs">
            <p className="text-muted font-mono text-xs uppercase tracking-widest leading-relaxed">
              Архив завершенных объектов в Алматы. Прозрачная отчетность и соблюдение регламентов на каждой высоте.
            </p>
          </div>
        </div>

        <div className="relative">
          {projects.map((project, index) => (
            <PortfolioItem key={index} project={project} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="group flex items-center gap-6 bg-ink text-white px-12 py-6 rounded-full font-display font-black uppercase text-sm tracking-[0.2em] hover:bg-safety transition-all transform hover:scale-105">
            <span>Explore All Work</span>
            <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
