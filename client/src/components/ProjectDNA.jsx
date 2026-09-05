import React from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Sparkles,
  ShieldCheck,
  Rocket,
  Target,
  Clock3,
  Lightbulb,
  BriefcaseBusiness,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

const METRIC_CONFIG = {
  innovation: {
    label: 'Innovation',
    icon: Lightbulb,
    description: 'How differentiated the concept is',
  },
  skillMatch: {
    label: 'Skill Match',
    icon: Target,
    description: 'Alignment with your current skills',
  },
  feasibility: {
    label: 'Feasibility',
    icon: ShieldCheck,
    description: 'Realistic to build with available resources',
  },
  timeFit: {
    label: 'Time Fit',
    icon: Clock3,
    description: 'Fit for your available timeline',
  },
  portfolioValue: {
    label: 'Portfolio Value',
    icon: BriefcaseBusiness,
    description: 'Strength as a portfolio project',
  },
  interestMatch: {
    label: 'Interest Match',
    icon: Sparkles,
    description: 'Alignment with your interests',
  },
  marketFit: {
    label: 'Market Fit',
    icon: TrendingUp,
    description: 'Potential real-world usefulness',
  },
  execution: {
    label: 'Execution',
    icon: Rocket,
    description: 'Practical execution potential',
  },
  clarity: {
    label: 'Clarity',
    icon: BrainCircuit,
    description: 'How clearly the problem and solution are defined',
  },
};

function normalizeMetricName(metric) {
  return metric
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase());
}

function getMetricConfig(metric) {
  return (
    METRIC_CONFIG[metric] || {
      label: normalizeMetricName(metric),
      icon: BrainCircuit,
      description: 'AI-evaluated project dimension',
    }
  );
}

function getScoreColor(score) {
  if (score >= 85) return 'text-emerald-400';
  if (score >= 70) return 'text-cyan-400';
  if (score >= 50) return 'text-amber-400';
  return 'text-rose-400';
}

function getScoreLabel(score) {
  if (score >= 90) return 'Exceptional';
  if (score >= 80) return 'Strong';
  if (score >= 70) return 'Promising';
  if (score >= 50) return 'Needs refinement';
  return 'Needs work';
}

function clampScore(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) return 0;

  return Math.min(100, Math.max(0, Math.round(numericValue)));
}

export default function ProjectDNA({
  dna,
  badges = [],
  percentile,
}) {
  const breakdown =
    dna?.scores ||
    dna?.breakdown ||
    (dna &&
    typeof dna === 'object' &&
    !dna.overallScore &&
    !dna.overall
      ? dna
      : null);

  const overallScore = clampScore(
    dna?.overallScore ??
      dna?.overall ??
      dna?.score ??
      0
  );

  const metrics = breakdown
    ? Object.entries(breakdown)
        .filter(([, value]) => Number.isFinite(Number(value)))
        .map(([metric, value]) => ({
          metric,
          score: clampScore(value),
        }))
    : [];

  const sortedMetrics = [...metrics].sort(
    (a, b) => b.score - a.score
  );

  const strongestMetric = sortedMetrics[0];
  const weakestMetric =
    sortedMetrics.length > 1
      ? sortedMetrics[sortedMetrics.length - 1]
      : null;

  return (
    <section
      className="
        relative overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.035]
        backdrop-blur-2xl
        shadow-2xl shadow-black/20
      "
    >
      {/* Ambient background */}
      <div
        className="
          pointer-events-none absolute -top-32 -right-32
          h-72 w-72 rounded-full
          bg-cyan-500/10 blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute -bottom-40 -left-32
          h-80 w-80 rounded-full
          bg-violet-500/10 blur-3xl
        "
      />

      <div className="relative p-5 sm:p-7">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-2xl
                border border-cyan-400/20
                bg-cyan-400/10
                text-cyan-300
              "
            >
              <BrainCircuit size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Project DNA
                </h3>

                <span
                  className="
                    hidden sm:inline-flex
                    items-center gap-1
                    rounded-full
                    border border-violet-400/20
                    bg-violet-400/10
                    px-2 py-1
                    text-[10px] font-semibold uppercase tracking-wider
                    text-violet-300
                  "
                >
                  <Sparkles size={10} />
                  AI Intelligence
                </span>
              </div>

              <p className="mt-1 max-w-xl text-xs sm:text-sm text-slate-400">
                A multi-dimensional assessment of how strong,
                practical, and portfolio-ready your project is.
              </p>
            </div>
          </div>

          {percentile !== undefined && percentile !== null && (
            <div
              className="
                inline-flex w-fit items-center gap-2
                rounded-full
                border border-cyan-400/20
                bg-cyan-400/10
                px-3 py-1.5
                text-xs font-semibold
                text-cyan-300
              "
            >
              <TrendingUp size={13} />
              Top {percentile}%
            </div>
          )}
        </div>

        {/* Overall Score */}
        <div className="mt-7 grid gap-4 lg:grid-cols-[190px_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="
              relative flex min-h-[190px]
              flex-col items-center justify-center
              overflow-hidden
              rounded-3xl
              border border-white/10
              bg-black/20
            "
          >
            <div
              className="
                absolute inset-5 rounded-full
                border border-cyan-400/10
              "
            />

            <div
              className="
                absolute inset-8 rounded-full
                border border-violet-400/10
              "
            />

            <div className="relative text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Overall DNA
              </p>

              <div className="mt-1 flex items-baseline justify-center">
                <span
                  className={`text-5xl font-black tracking-tight ${getScoreColor(
                    overallScore
                  )}`}
                >
                  {overallScore}
                </span>

                <span className="ml-1 text-sm text-slate-500">
                  /100
                </span>
              </div>

              <div
                className={`mt-1 text-xs font-semibold ${getScoreColor(
                  overallScore
                )}`}
              >
                {getScoreLabel(overallScore)}
              </div>
            </div>
          </motion.div>

          {/* Intelligence summary */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div
              className="
                rounded-2xl
                border border-white/8
                bg-white/[0.025]
                p-4
              "
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2
                  size={15}
                  className="text-emerald-400"
                />
                Strongest dimension
              </div>

              <p className="mt-3 text-base font-bold text-white">
                {strongestMetric
                  ? getMetricConfig(strongestMetric.metric).label
                  : 'Analyzing...'}
              </p>

              {strongestMetric && (
                <p
                  className={`mt-1 text-sm font-semibold ${getScoreColor(
                    strongestMetric.score
                  )}`}
                >
                  {strongestMetric.score}/100
                </p>
              )}
            </div>

            <div
              className="
                rounded-2xl
                border border-white/8
                bg-white/[0.025]
                p-4
              "
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Rocket
                  size={15}
                  className="text-cyan-400"
                />
                Improvement opportunity
              </div>

              <p className="mt-3 text-base font-bold text-white">
                {weakestMetric
                  ? getMetricConfig(weakestMetric.metric).label
                  : 'Analyzing...'}
              </p>

              {weakestMetric && (
                <p className="mt-1 text-sm text-slate-400">
                  {weakestMetric.score}/100 · can be improved
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <div
                className="
                  rounded-2xl
                  border border-cyan-400/10
                  bg-cyan-400/[0.035]
                  p-4
                "
              >
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={15}
                    className="text-cyan-300"
                  />

                  <span className="text-xs font-semibold text-cyan-200">
                    Mentor insight
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {overallScore >= 85
                    ? 'This concept has a strong balance of originality, execution potential, and portfolio value.'
                    : overallScore >= 70
                    ? 'This is a promising direction. Strengthen the weakest dimension to make the project more competitive.'
                    : 'The concept has potential. Use the mentor actions below to improve its feasibility and differentiation.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white">
                Intelligence Breakdown
              </h4>

              <p className="mt-0.5 text-xs text-slate-500">
                Every dimension is scored independently.
              </p>
            </div>

            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600">
              {metrics.length} dimensions
            </span>
          </div>

          {metrics.length === 0 ? (
            <div
              className="
                rounded-2xl
                border border-dashed border-white/10
                bg-white/[0.02]
                p-8 text-center
              "
            >
              <BrainCircuit
                className="mx-auto text-slate-600"
                size={26}
              />

              <p className="mt-3 text-sm text-slate-500">
                Intelligence metrics are synthesizing...
              </p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {metrics.map(({ metric, score }, index) => {
                const config = getMetricConfig(metric);
                const Icon = config.icon;

                return (
                  <motion.div
                    key={metric}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.3,
                    }}
                    className="
                      group
                      rounded-2xl
                      border border-white/8
                      bg-white/[0.02]
                      p-4
                      transition-all duration-200
                      hover:border-white/15
                      hover:bg-white/[0.04]
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          rounded-xl
                          bg-white/[0.05]
                          text-slate-300
                          transition-colors
                          group-hover:text-cyan-300
                        "
                      >
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-slate-200">
                            {config.label}
                          </span>

                          <span
                            className={`text-sm font-bold ${getScoreColor(
                              score
                            )}`}
                          >
                            {score}
                          </span>
                        </div>

                        <p className="mt-0.5 truncate text-[10px] text-slate-500">
                          {config.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800/80">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{
                          delay: 0.15 + index * 0.06,
                          duration: 0.65,
                          ease: 'easeOut',
                        }}
                        className="
                          h-full rounded-full
                          bg-gradient-to-r
                          from-cyan-400
                          via-sky-400
                          to-violet-400
                        "
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="mt-7 border-t border-white/8 pt-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                Achievement Signals
              </span>

              <span className="rounded-full bg-violet-400/10 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                {badges.length}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <motion.span
                  key={`${badge}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="
                    inline-flex items-center gap-1.5
                    rounded-xl
                    border border-violet-400/15
                    bg-violet-400/[0.07]
                    px-3 py-1.5
                    text-xs font-medium
                    text-violet-200
                  "
                >
                  <Sparkles size={12} />
                  {badge}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}