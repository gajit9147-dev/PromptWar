import React from 'react';
import {
  ArrowRight,
  BrainCircuit,
  Sparkles,
  Target,
  Zap,
  ShieldCheck,
  Layers3,
  TrendingUp,
  Clock3,
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const intelligenceSteps = [
  {
    icon: Target,
    number: '01',
    title: 'Understand',
    text: 'Map your skills, interests, experience and timeline.',
  },
  {
    icon: BrainCircuit,
    number: '02',
    title: 'Reason',
    text: 'Generate and evaluate multiple project directions.',
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'Score',
    text: 'Measure feasibility, innovation and portfolio value.',
  },
  {
    icon: Zap,
    number: '04',
    title: 'Build',
    text: 'Turn the winning concept into an execution blueprint.',
  },
];

const dnaMetrics = [
  { label: 'Innovation', value: 92 },
  { label: 'Skill Match', value: 96 },
  { label: 'Feasibility', value: 88 },
  { label: 'Portfolio Value', value: 94 },
];

export default function Home({
  projects = [],
  leaderboard = [],
  onStart = () => {},
  onSelectProject = () => {},
}) {
  const featuredProjects =
    leaderboard.length > 0
      ? leaderboard.slice(0, 3)
      : projects.slice(0, 3);

  return (
    <div className="relative min-h-full w-full overflow-hidden py-6 sm:py-8 lg:py-10">
      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute right-[-120px] top-[380px] h-[380px] w-[380px] rounded-full bg-violet-600/10 blur-[110px]" />

        <div className="absolute left-[-150px] top-[700px] h-[320px] w-[320px] rounded-full bg-pink-500/5 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <div className="relative w-full space-y-24">

        {/* =======================================================
            HERO
        ======================================================= */}
        <section className="mx-auto w-full max-w-[1800px] px-4 pt-8 text-center sm:px-6 md:pt-12 lg:px-10 xl:px-12 2xl:px-16">
          {/* Status */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-medium tracking-wide text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>

            VENTUREMIND INTELLIGENCE ENGINE

            <span className="ml-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[9px] font-bold text-cyan-300">
              ONLINE
            </span>
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-[1200px] text-5xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[82px] xl:text-[92px]">
            Your skills are the{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                starting point.
              </span>
            </span>
            <br />
            Not the finish line.
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-400 md:text-lg lg:text-xl">
            VentureMind turns your skills and interests into a{' '}
            <span className="font-medium text-slate-200">
              scored, practical project blueprint
            </span>{' '}
            — then helps you improve it until it is worth building.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onStart}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-7 py-4 text-sm font-bold text-slate-950 shadow-[0_15px_50px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(34,211,238,0.2)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <Sparkles className="relative h-4 w-4 text-violet-600" />

              <span className="relative">
                Build My Project
              </span>

              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2 px-4 py-3 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              No API key required
            </div>
          </div>

          {/* Trust stats */}
          <div className="mx-auto mt-12 flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[11px] uppercase tracking-[0.16em] text-slate-600">
            <span>AI Evaluated</span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span>Feasibility Scored</span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span>Build Ready</span>
          </div>
        </section>

        {/* =======================================================
            PRODUCT PREVIEW
        ======================================================= */}
        <section className="mx-auto w-full max-w-[1800px] px-3 sm:px-5 lg:px-8 xl:px-10 2xl:px-14">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-slate-950/70 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 md:px-7">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                </div>

                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 sm:block">
                  VentureMind / Project Intelligence
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                ANALYSIS COMPLETE
              </div>
            </div>

            {/* Preview body */}
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Project identity */}
              <div className="p-6 md:p-9 lg:border-r lg:border-white/[0.06] lg:p-10 xl:p-12">
                <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  <Layers3 className="h-3.5 w-3.5" />
                  Selected Project
                </div>

                <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-white md:text-3xl xl:text-4xl">
                  AI Career Copilot for Final-Year Students
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
                  A personalized platform that analyzes student skills,
                  projects and goals to generate realistic career paths and
                  portfolio-building recommendations.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Gemini AI', 'PostgreSQL'].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-slate-400"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                {/* Score */}
                <div className="mt-9 flex items-end gap-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                      Project DNA
                    </div>

                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-5xl font-black tracking-tight text-white">
                        93
                      </span>

                      <span className="text-sm font-semibold text-cyan-400">
                        / 100
                      </span>
                    </div>
                  </div>

                  <div className="mb-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Strong Build
                  </div>
                </div>
              </div>

              {/* DNA */}
              <div className="bg-white/[0.015] p-6 md:p-9 lg:p-10 xl:p-12">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">
                      Project DNA
                    </div>

                    <div className="mt-1 text-[11px] text-slate-600">
                      AI feasibility analysis
                    </div>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10">
                    <BrainCircuit className="h-5 w-5 text-violet-400" />
                  </div>
                </div>

                <div className="space-y-5">
                  {dnaMetrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="mb-2 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">
                          {metric.label}
                        </span>

                        <span className="font-bold text-slate-300">
                          {metric.value}
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-3">
                  <Clock3 className="h-4 w-4 shrink-0 text-cyan-400" />

                  <div>
                    <div className="text-[10px] font-semibold text-slate-300">
                      Timeline fit
                    </div>

                    <div className="text-[10px] text-slate-600">
                      Optimized for an 8-week build
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            INTELLIGENCE PIPELINE
        ======================================================= */}
        <section className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mb-10 max-w-3xl">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400">
              Intelligence pipeline
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl xl:text-5xl">
              From profile to{' '}
              <span className="text-slate-500">
                build plan.
              </span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">
              VentureMind doesn't stop at generating an idea. It reasons about
              whether the idea is actually worth building.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {intelligenceSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] transition-colors group-hover:border-cyan-400/20 group-hover:bg-cyan-400/10">
                      <Icon className="h-4 w-4 text-cyan-400" />
                    </div>

                    <span className="font-mono text-[10px] text-slate-700">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-sm font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {step.text}
                  </p>

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </section>

        {/* =======================================================
            DIFFERENTIATOR
        ======================================================= */}
        <section className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          <div className="relative overflow-hidden rounded-[28px] border border-violet-400/10 bg-gradient-to-br from-violet-500/[0.07] via-white/[0.025] to-cyan-500/[0.05] p-7 md:p-10 xl:p-12">
            <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-violet-500/10 blur-[90px]" />

            <div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  Why VentureMind
                </div>

                <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-white md:text-3xl xl:text-4xl">
                  Don't ask AI for an idea.
                  <br />
                  <span className="text-slate-500">
                    Ask it whether the idea deserves your time.
                  </span>
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
                  Every concept is evaluated across multiple dimensions before
                  becoming your recommended project. Then your mentor loop
                  lets you reshape it without starting over.
                </p>
              </div>

              <button
                type="button"
                onClick={onStart}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-bold text-white transition-all hover:border-cyan-400/20 hover:bg-cyan-400/10"
              >
                Explore the Studio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* =======================================================
            LEADERBOARD
        ======================================================= */}
        {featuredProjects.length > 0 && (
          <section className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Intelligence benchmark
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl xl:text-4xl">
                  Top Rated Blueprints
                </h2>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-slate-500 sm:self-auto">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live AI Benchmark
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featuredProjects.map((item) => (
                <ProjectCard
                  key={item.id}
                  project={item}
                  onClick={onSelectProject}
                />
              ))}
            </div>
          </section>
        )}

        {/* =======================================================
            FINAL CTA
        ======================================================= */}
        <section className="mx-auto w-full max-w-[1800px] px-4 pb-10 text-center sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto max-w-4xl">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
              <BrainCircuit className="h-5 w-5 text-cyan-400" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl xl:text-5xl">
              Ready to find your{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                buildable project?
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
              Give VentureMind your skills. We'll handle the reasoning.
            </p>

            <button
              type="button"
              onClick={onStart}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_45px_rgba(34,211,238,0.18)]"
            >
              Start Building
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}