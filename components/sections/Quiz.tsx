"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { heightOptions, objectOptions, services, urgencyOptions, type LeadPayload } from "@/content/site";

type Answers = {
  objectType?: string;
  workType?: string;
  height?: string;
  urgency?: string;
  name?: string;
  phone?: string;
  address?: string;
  area?: string;
  preferredTime?: string;
  comment?: string;
  website?: string;
};

const stepLabels = ["Объект", "Услуга", "Высота", "Срочность", "Контакт"];
const workOptions = services.map((service) => service.title);

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState("");
  const [startedAt] = useState(() => Date.now());

  const canNext = useMemo(() => {
    if (step === 0) return !!answers.objectType;
    if (step === 1) return !!answers.workType;
    if (step === 2) return !!answers.height;
    if (step === 3) return !!answers.urgency;
    if (step === 4) return !!answers.name && (answers.phone?.length ?? 0) >= 10;
    return false;
  }, [step, answers]);

  const handleNext = () => {
    setError("");
    if (step < stepLabels.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    const payload: LeadPayload = {
      objectType: answers.objectType ?? "",
      workType: answers.workType ?? "",
      height: answers.height ?? "",
      urgency: answers.urgency ?? "",
      name: answers.name?.trim() ?? "",
      phone: answers.phone?.trim() ?? "",
      address: answers.address?.trim(),
      area: answers.area?.trim(),
      preferredTime: answers.preferredTime?.trim(),
      comment: answers.comment?.trim(),
      website: answers.website?.trim(),
      startedAt,
      source: "site_quiz",
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        throw new Error("request_failed");
      }

      setIsDone(true);
    } catch {
      setError("Не удалось отправить заявку. Проверьте соединение или напишите нам напрямую.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quiz" className="py-20 sm:py-24 lg:py-32 bg-surface overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 sm:mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-safety mb-4 block">
                Быстрая заявка
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-normal uppercase leading-[0.92] text-ink">
                Займёт меньше <br /> <span className="text-sky italic">минуты.</span>
              </h2>
            </div>
            {!isDone && (
              <div className="flex items-center gap-4 sm:gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted w-full md:w-auto">
                <span>Шаг {step + 1} из {stepLabels.length}</span>
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

          <div data-quiz-card className="bg-bg rounded-[16px] sm:rounded-[24px] border border-line p-5 sm:p-8 md:p-10 lg:p-12 h-[860px] sm:h-[800px] lg:h-[735px] relative overflow-hidden shadow-sm flex flex-col">
            <div data-quiz-scroll className="flex-1">
              <AnimatePresence mode="wait">
                {isDone ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-full flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-soft-blue flex items-center justify-center text-sky mb-8 sm:mb-10">
                      <CheckCircle size={48} weight="bold" />
                    </div>
                    <h3 className="font-display text-4xl md:text-6xl font-black tracking-normal uppercase text-ink mb-6">
                      Заявка принята.
                    </h3>
                    <p className="text-muted text-lg max-w-xl leading-relaxed mb-12">
                      Мы получили данные и скоро свяжемся с вами.
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
                    transition={{ duration: 0.35, ease: "circOut" }}
                    className="pb-2"
                  >
                    <div className="mb-6 sm:mb-8">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-2 block">
                        {stepLabels[step]}
                      </span>
                      <h3 className="font-display text-3xl md:text-5xl font-black tracking-normal uppercase text-ink leading-tight">
                        {step === 0 && "Какой у вас объект?"}
                        {step === 1 && "Что нужно сделать?"}
                        {step === 2 && "Какая высота?"}
                        {step === 3 && "Насколько срочно?"}
                        {step === 4 && "Как с вами связаться?"}
                      </h3>
                      <p className="mt-4 text-muted text-sm sm:text-base">
                        Можно указать примерные данные
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {step === 0 && objectOptions.map(opt => (
                        <Option key={opt} label={opt} active={answers.objectType === opt} onClick={() => setAnswers({...answers, objectType: opt})} />
                      ))}
                      {step === 1 && (
                        <div className="md:col-span-2 lg:col-span-3 max-w-2xl">
                          <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-3 block">
                            Выберите услугу
                          </label>
                          <select
                            data-work-select
                            value={answers.workType || ""}
                            onChange={(e) => setAnswers({...answers, workType: e.target.value})}
                            className="w-full appearance-none rounded-[10px] border border-line bg-surface px-5 sm:px-6 py-5 sm:py-6 font-display text-xl sm:text-2xl font-black uppercase tracking-normal text-ink outline-none transition-colors focus:border-safety"
                          >
                            <option value="" disabled>Выбрать из списка</option>
                            {workOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          {answers.workType && (
                            <p className="mt-5 rounded-[10px] border border-line bg-bg px-5 py-4 text-sm sm:text-base text-muted">
                              Выбрано: <span className="font-semibold text-ink">{answers.workType}</span>
                            </p>
                          )}
                        </div>
                      )}
                      {step === 2 && heightOptions.map(opt => (
                        <Option key={opt} label={opt} active={answers.height === opt} onClick={() => setAnswers({...answers, height: opt})} />
                      ))}
                      {step === 3 && urgencyOptions.map(opt => (
                        <Option key={opt} label={opt} active={answers.urgency === opt} onClick={() => setAnswers({...answers, urgency: opt})} />
                      ))}
                      {step === 4 && (
                        <div className="md:col-span-2 lg:col-span-3 max-w-3xl">
                          <div className="group relative">
                            <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-2 block transition-colors group-focus-within:text-safety">Имя</label>
                            <input 
                              type="text" 
                              autoComplete="name"
                              placeholder="Константин"
                              value={answers.name || ""}
                              onChange={(e) => setAnswers({...answers, name: e.target.value})}
                              className="w-full bg-transparent border-b border-line py-3 text-xl sm:text-2xl font-display font-black uppercase tracking-normal text-ink focus:outline-none focus:border-safety transition-colors"
                            />
                          </div>
                          <div className="group relative mt-5 sm:mt-6">
                            <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-2 block transition-colors group-focus-within:text-safety">Телефон</label>
                            <input 
                              type="tel" 
                              autoComplete="tel"
                              inputMode="tel"
                              placeholder="+7 (___) ___ __ __"
                              value={answers.phone || ""}
                              onChange={(e) => setAnswers({...answers, phone: e.target.value})}
                              className="w-full bg-transparent border-b border-line py-3 text-xl sm:text-2xl font-display font-black uppercase tracking-normal text-ink focus:outline-none focus:border-safety transition-colors"
                            />
                          </div>
                          <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                            <div className="group relative">
                              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-2 block transition-colors group-focus-within:text-safety">Адрес</label>
                              <input
                                type="text"
                                autoComplete="street-address"
                                placeholder="Район или улица"
                                value={answers.address || ""}
                                onChange={(e) => setAnswers({...answers, address: e.target.value})}
                                className="w-full bg-transparent border-b border-line py-3 text-base sm:text-lg text-ink focus:outline-none focus:border-safety transition-colors"
                              />
                            </div>
                            <div className="group relative">
                              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-2 block transition-colors group-focus-within:text-safety">Площадь</label>
                              <input
                                type="text"
                                inputMode="text"
                                placeholder="Напр. 300 м²"
                                value={answers.area || ""}
                                onChange={(e) => setAnswers({...answers, area: e.target.value})}
                                className="w-full bg-transparent border-b border-line py-3 text-base sm:text-lg text-ink focus:outline-none focus:border-safety transition-colors"
                              />
                            </div>
                            <div className="group relative">
                              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-2 block transition-colors group-focus-within:text-safety">Время</label>
                              <input
                                type="text"
                                placeholder="Когда удобно"
                                value={answers.preferredTime || ""}
                                onChange={(e) => setAnswers({...answers, preferredTime: e.target.value})}
                                className="w-full bg-transparent border-b border-line py-3 text-base sm:text-lg text-ink focus:outline-none focus:border-safety transition-colors"
                              />
                            </div>
                          </div>
                          <div className="group relative mt-5 sm:mt-6">
                            <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-2 block transition-colors group-focus-within:text-safety">Комментарий</label>
                            <textarea
                              placeholder="Дополнительные детали по объекту"
                              value={answers.comment || ""}
                              onChange={(e) => setAnswers({...answers, comment: e.target.value})}
                              rows={2}
                              className="w-full resize-none bg-transparent border-b border-line py-3 text-base sm:text-lg text-ink focus:outline-none focus:border-safety transition-colors"
                            />
                          </div>
                          <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                            <label htmlFor="lead-company-site">Сайт компании</label>
                            <input
                              id="lead-company-site"
                              type="text"
                              tabIndex={-1}
                              autoComplete="off"
                              value={answers.website || ""}
                              onChange={(e) => setAnswers({...answers, website: e.target.value})}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!isDone && (
              <div className="mt-6 sm:mt-8 shrink-0 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                {error && (
                  <div className="sm:absolute sm:left-8 sm:bottom-8 flex items-start gap-2 text-sm text-safety max-w-md">
                    <WarningCircle size={18} weight="bold" className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <button 
                  data-quiz-back
                  type="button"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="order-2 sm:order-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted hover:text-ink disabled:opacity-0 transition-all"
                >
                  <ArrowLeft size={16} />
                  <span>Назад</span>
                </button>
                <button 
                  data-quiz-next
                  type="button"
                  onClick={handleNext}
                  disabled={!canNext || isSubmitting}
                  className="order-1 sm:order-2 flex w-full sm:w-auto items-center justify-center gap-4 sm:gap-6 bg-ink text-white px-7 sm:px-10 py-4 sm:py-5 rounded-[6px] font-display font-black uppercase text-xs sm:text-sm tracking-widest hover:bg-safety disabled:bg-line disabled:text-muted transition-all active:scale-95"
                >
                  <span>{isSubmitting ? "Отправляем..." : step === stepLabels.length - 1 ? "Отправить заявку" : "Дальше"}</span>
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
      type="button"
      onClick={onClick}
      className={`group px-5 sm:px-7 py-5 sm:py-6 rounded-[10px] border text-left transition-editorial min-h-[96px] ${active ? 'bg-ink border-ink text-white shadow-xl' : 'bg-surface border-line text-ink hover:border-safety'}`}
    >
      <span className="font-display font-black text-xl md:text-2xl uppercase tracking-normal leading-tight block">{label}</span>
      <div className={`mt-4 w-6 h-px ${active ? 'bg-safety' : 'bg-line'} group-hover:w-12 transition-all`} />
    </button>
  );
}
