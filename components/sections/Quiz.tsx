"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Wrench, ArrowRight, ArrowLeft, CheckCircle, Sparkle, HardHat, ChartBarHorizontal } from "@phosphor-icons/react";

type ObjectType = "ЖК" | "БЦ" | "ТРЦ" | "Частный дом" | "Промышленный объект";
type WorkType =
  | "Мытьё фасадов"
  | "Герметизация швов"
  | "Покраска фасадов"
  | "Очистка крыш"
  | "Высотный монтаж"
  | "Ремонт фасадов";

type Answers = {
  objectType?: ObjectType;
  workType?: WorkType;
  height?: string;
  urgency?: string;
  name?: string;
  phone?: string;
};

const objectOptions: ObjectType[] = ["ЖК", "БЦ", "ТРЦ", "Частный дом", "Промышленный объект"];
const workOptions: WorkType[] = [
  "Мытьё фасадов",
  "Герметизация швов",
  "Покраска фасадов",
  "Очистка крыш",
  "Высотный монтаж",
  "Ремонт фасадов",
];

const heightOptions = ["До 5 этажей", "5–9 этажей", "10–16 этажей", "Выше 16 этажей"];
const urgencyOptions = ["В течение недели", "В течение 2–3 дней", "Срочно — 24 часа"];

const stepLabels = ["Объект", "Услуга", "Высота", "Срочность", "Контакт"];

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const canNext = useMemo(() => {
    if (step === 0) return !!answers.objectType;
    if (step === 1) return !!answers.workType;
    if (step === 2) return !!answers.height;
    if (step === 3) return !!answers.urgency;
    if (step === 4) return !!answers.name && (answers.phone?.length ?? 0) >= 10;
    return false;
  }, [step, answers]);

  const handleNext = () => {
    if (step < stepLabels.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsDone(true);
  };

  return (
    <section id="quiz" className="py-32 bg-surface overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-4 block">
                Pre-Calculation
              </span>
              <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-ink">
                Займёт меньше <br /> <span className="text-sky italic">минуты.</span>
              </h2>
            </div>
            {!isDone && (
              <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <span>Step {step + 1} of {stepLabels.length}</span>
                <div className="w-32 h-px bg-line relative">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: (step + 1) / stepLabels.length }}
                    className="absolute inset-0 bg-safety origin-left"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-bg rounded-[3rem] border border-line p-8 md:p-16 min-h-[500px] relative overflow-hidden shadow-sm">
            <AnimatePresence mode="wait">
              {isDone ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12"
                >
                  <div className="w-24 h-24 rounded-full bg-soft-blue flex items-center justify-center text-sky mb-10">
                    <CheckCircle size={48} weight="bold" />
                  </div>
                  <h3 className="font-display text-4xl md:text-6xl font-black tracking-tighter uppercase text-ink mb-6">
                    Заявка принята.
                  </h3>
                  <p className="text-muted text-lg max-w-xl leading-relaxed mb-12">
                    Мы уже передаём данные ответственному. Если объект срочный, мы уточним детали быстрее, чтобы подготовить следующий шаг.
                  </p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="font-mono text-[10px] uppercase tracking-[0.3em] text-safety border-b border-safety/30 pb-1"
                  >
                    Вернуться на главную
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                >
                  <div className="mb-12">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-2 block">
                      {stepLabels[step]}
                    </span>
                    <h3 className="font-display text-3xl md:text-5xl font-black tracking-tighter uppercase text-ink">
                      {step === 0 && "Какой у вас объект?"}
                      {step === 1 && "Что нужно сделать?"}
                      {step === 2 && "Какая высота?"}
                      {step === 3 && "Насколько срочно?"}
                      {step === 4 && "Как с вами связаться?"}
                    </h3>
                    <p className="mt-4 text-muted text-sm font-mono uppercase tracking-widest">
                      Можно указать примерные данные
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {step === 0 && objectOptions.map(opt => (
                      <Option key={opt} label={opt} active={answers.objectType === opt} onClick={() => setAnswers({...answers, objectType: opt})} />
                    ))}
                    {step === 1 && workOptions.map(opt => (
                      <Option key={opt} label={opt} active={answers.workType === opt} onClick={() => setAnswers({...answers, workType: opt})} />
                    ))}
                    {step === 2 && heightOptions.map(opt => (
                      <Option key={opt} label={opt} active={answers.height === opt} onClick={() => setAnswers({...answers, height: opt})} />
                    ))}
                    {step === 3 && urgencyOptions.map(opt => (
                      <Option key={opt} label={opt} active={answers.urgency === opt} onClick={() => setAnswers({...answers, urgency: opt})} />
                    ))}
                    {step === 4 && (
                      <div className="md:col-span-2 lg:col-span-3 space-y-8 max-w-2xl">
                        <div className="group relative">
                          <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-2 block transition-colors group-focus-within:text-safety">Full Name</label>
                          <input 
                            type="text" 
                            placeholder="Константин"
                            value={answers.name || ""}
                            onChange={(e) => setAnswers({...answers, name: e.target.value})}
                            className="w-full bg-transparent border-b border-line py-4 text-2xl font-display font-black uppercase tracking-tighter text-ink focus:outline-none focus:border-safety transition-colors"
                          />
                        </div>
                        <div className="group relative">
                          <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted mb-2 block transition-colors group-focus-within:text-safety">Phone Number</label>
                          <input 
                            type="tel" 
                            placeholder="+7 (___) ___ __ __"
                            value={answers.phone || ""}
                            onChange={(e) => setAnswers({...answers, phone: e.target.value})}
                            className="w-full bg-transparent border-b border-line py-4 text-2xl font-display font-black uppercase tracking-tighter text-ink focus:outline-none focus:border-safety transition-colors"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isDone && (
              <div className="mt-24 flex items-center justify-between">
                <button 
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted hover:text-ink disabled:opacity-0 transition-all"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!canNext || isSubmitting}
                  className="flex items-center gap-6 bg-ink text-white px-10 py-5 rounded-full font-display font-black uppercase text-sm tracking-widest hover:bg-safety disabled:bg-line disabled:text-muted transition-all transform hover:scale-105 active:scale-95"
                >
                  <span>{isSubmitting ? "Processing..." : step === stepLabels.length - 1 ? "Submit Request" : "Next Step"}</span>
                  {!isSubmitting && <ArrowRight size={18} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Option({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-8 py-6 rounded-2xl border text-left transition-editorial ${active ? 'bg-ink border-ink text-white shadow-xl' : 'bg-surface border-line text-ink hover:border-safety'}`}
    >
      <span className="font-display font-black text-xl md:text-2xl uppercase tracking-tighter block">{label}</span>
      <div className={`mt-4 w-6 h-px ${active ? 'bg-safety' : 'bg-line'} group-hover:w-12 transition-all`} />
    </button>
  );
}
