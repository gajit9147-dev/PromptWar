import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit,
  Sparkles,
  ShieldAlert,
  Rocket,
  Target,
  Lightbulb,
  MessageSquareText,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

const PERSONA_CONFIG = {
  innovation: {
    icon: Lightbulb,
    accent: 'text-amber-300',
    bg: 'bg-amber-400/[0.06]',
    border: 'border-amber-400/15',
    label: 'Innovation',
    fallbackDescription:
      'Finds ways to make your project more original and memorable.',
  },
  critic: {
    icon: ShieldAlert,
    accent: 'text-rose-300',
    bg: 'bg-rose-400/[0.06]',
    border: 'border-rose-400/15',
    label: 'Critical Review',
    fallbackDescription:
      'Challenges weak assumptions, risks, and unrealistic scope.',
  },
  execution: {
    icon: Rocket,
    accent: 'text-cyan-300',
    bg: 'bg-cyan-400/[0.06]',
    border: 'border-cyan-400/15',
    label: 'Execution',
    fallbackDescription:
      'Turns the concept into a practical development strategy.',
  },
  product: {
    icon: Target,
    accent: 'text-violet-300',
    bg: 'bg-violet-400/[0.06]',
    border: 'border-violet-400/15',
    label: 'Product',
    fallbackDescription:
      'Improves usefulness, user value, and real-world relevance.',
  },
};

function getPersonaConfig(mentor = {}) {
  const raw = `${mentor.id || ''} ${mentor.role || ''} ${
    mentor.name || ''
  }`.toLowerCase();

  if (
    raw.includes('innovation') ||
    raw.includes('creative')
  ) {
    return PERSONA_CONFIG.innovation;
  }

  if (
    raw.includes('critic') ||
    raw.includes('review') ||
    raw.includes('risk')
  ) {
    return PERSONA_CONFIG.critic;
  }

  if (
    raw.includes('execution') ||
    raw.includes('engineer') ||
    raw.includes('technical')
  ) {
    return PERSONA_CONFIG.execution;
  }

  if (
    raw.includes('product') ||
    raw.includes('market') ||
    raw.includes('business')
  ) {
    return PERSONA_CONFIG.product;
  }

  return {
    icon: BrainCircuit,
    accent: 'text-violet-300',
    bg: 'bg-violet-400/[0.06]',
    border: 'border-violet-400/15',
    label: mentor.role || 'AI Mentor',
    fallbackDescription:
      'Analyze your project and provide context-aware guidance.',
  };
}

function getFeedbackText(feedback) {
  if (!feedback) return '';

  if (typeof feedback === 'string') {
    return feedback;
  }

  return (
    feedback.guidance ||
    feedback.feedback ||
    feedback.message ||
    feedback.advice ||
    feedback.content ||
    feedback.response?.directAnswer ||
    (feedback.response?.actionableSteps ? feedback.response.actionableSteps.join('\n') : '') ||
    ''
  );
}

export default function MentorActions({
  mentors = [],
  activeFeedback = null,
  onRequestGuidance = () => {},
  loading = false,
}) {
  const feedbackText = getFeedbackText(activeFeedback);

  const activeMentorId =
    activeFeedback?.mentorId ||
    activeFeedback?.mentor?.id ||
    activeFeedback?.mentorType ||
    null;

  return (
    <section
      className="
        relative overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.025]
        p-5 sm:p-6
        backdrop-blur-xl
      "
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/[0.08] blur-3xl" />

      <div className="relative">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="flex items-start gap-3">
          <div
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-2xl
              border border-violet-400/20
              bg-violet-400/[0.08]
              text-violet-300
            "
          >
            <BrainCircuit size={21} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-white">
                Adaptive AI Mentor
              </h3>

              <span
                className="
                  inline-flex items-center gap-1
                  rounded-full
                  border border-violet-400/15
                  bg-violet-400/[0.06]
                  px-2 py-1
                  text-[9px] font-semibold uppercase
                  tracking-wider text-violet-300
                "
              >
                <Sparkles size={9} />
                Context aware
              </span>
            </div>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Pressure-test the project from different expert
              perspectives before you build it.
            </p>
          </div>
        </div>

        {/* =====================================================
            MENTOR CARDS
        ====================================================== */}
        {mentors.length > 0 ? (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Choose a perspective
              </p>

              <span className="text-[10px] font-mono text-slate-700">
                {mentors.length} AVAILABLE
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {mentors.map((mentor, index) => {
                const config = getPersonaConfig(mentor);
                const Icon = config.icon;

                const isActive =
                  activeMentorId === mentor.id;

                const isLoading =
                  loading && isActive;

                return (
                  <motion.button
                    key={mentor.id || index}
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      onRequestGuidance(mentor.id)
                    }
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.3,
                    }}
                    className={`
                      group relative w-full overflow-hidden
                      rounded-2xl border
                      p-4 text-left
                      transition-all duration-200
                      focus:outline-none
                      focus:ring-2
                      focus:ring-violet-400/40
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      ${
                        isActive
                          ? 'border-violet-400/30 bg-violet-400/[0.08]'
                          : 'border-white/8 bg-white/[0.02] hover:border-violet-400/20 hover:bg-white/[0.04]'
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute inset-y-0 left-0 w-0.5 bg-violet-400" />
                    )}

                    <div className="flex items-start gap-3">
                      <div
                        className={`
                          flex h-10 w-10 shrink-0
                          items-center justify-center
                          rounded-xl
                          ${config.bg}
                          ${config.accent}
                        `}
                      >
                        {mentor.avatar ? (
                          <span className="text-lg">
                            {mentor.avatar}
                          </span>
                        ) : (
                          <Icon size={18} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-white">
                              {mentor.name ||
                                'AI Mentor'}
                            </h4>

                            <p
                              className={`mt-0.5 text-[10px] font-semibold uppercase tracking-wider ${config.accent}`}
                            >
                              {mentor.role ||
                                config.label}
                            </p>
                          </div>

                          <ArrowRight
                            size={15}
                            className="
                              shrink-0
                              text-slate-600
                              transition-all
                              group-hover:translate-x-0.5
                              group-hover:text-violet-300
                            "
                          />
                        </div>

                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                          {mentor.description ||
                            config.fallbackDescription}
                        </p>

                        <div className="mt-3 flex items-center gap-1.5">
                          {isLoading ? (
                            <>
                              <Loader2
                                size={12}
                                className="animate-spin text-violet-300"
                              />
                              <span className="text-[10px] font-semibold text-violet-300">
                                Consulting mentor...
                              </span>
                            </>
                          ) : isActive && feedbackText ? (
                            <>
                              <CheckCircle2
                                size={12}
                                className="text-emerald-400"
                              />
                              <span className="text-[10px] font-semibold text-emerald-300">
                                Consultation complete
                              </span>
                            </>
                          ) : (
                            <>
                              <MessageSquareText
                                size={12}
                                className="text-slate-600"
                              />
                              <span className="text-[10px] font-semibold text-slate-500 transition-colors group-hover:text-violet-300">
                                Consult this mentor
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            className="
              mt-6 rounded-2xl
              border border-dashed border-white/10
              bg-white/[0.015]
              p-6 text-center
            "
          >
            <BrainCircuit
              size={24}
              className="mx-auto text-slate-700"
            />

            <p className="mt-3 text-sm font-medium text-slate-400">
              Mentor council is preparing
            </p>

            <p className="mt-1 text-xs text-slate-600">
              AI mentor personas will appear here.
            </p>
          </div>
        )}

        {/* =====================================================
            ACTIVE FEEDBACK
        ====================================================== */}
        <AnimatePresence mode="wait">
          {activeFeedback && feedbackText && (
            <motion.div
              key={
                activeFeedback.id ||
                activeFeedback.mentorId ||
                feedbackText.slice(0, 30)
              }
              initial={{
                opacity: 0,
                height: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                height: 'auto',
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div
                className="
                  mt-5 rounded-2xl
                  border border-violet-400/15
                  bg-violet-400/[0.045]
                  p-5
                "
              >
                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex h-9 w-9 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-violet-400/10
                      text-violet-300
                    "
                  >
                    <MessageSquareText size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-white">
                        {activeFeedback.mentorName ||
                          activeFeedback.mentor?.name ||
                          'Mentor insight'}
                      </h4>

                      <span className="rounded-full bg-emerald-400/[0.08] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-300">
                        AI analysis
                      </span>
                    </div>

                    <div
                      className="
                        mt-3 whitespace-pre-line
                        text-xs leading-6 text-slate-300
                      "
                    >
                      {feedbackText}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <div
          className="
            mt-5 flex items-start gap-2
            border-t border-white/6
            pt-4
          "
        >
          <ShieldAlert
            size={13}
            className="mt-0.5 shrink-0 text-slate-600"
          />

          <p className="text-[10px] leading-4 text-slate-600">
            Mentor feedback is generated from your current
            project context. Use it to refine scope, risks,
            differentiation, and execution decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
