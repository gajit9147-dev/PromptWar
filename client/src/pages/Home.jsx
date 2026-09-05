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
    text: 'Map your skills, interests, experience, and available timeline.',
  },
  {
    icon: BrainCircuit,
    number: '02',
    title: 'Reason',
    text: 'Generate and critically evaluate multi-vector project hypotheses.',
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'Score',
    text: 'Benchmark feasibility, technical innovation, and portfolio value.',
  },
  {
    icon: Zap,
    number: '04',
    title: 'Build',
    text: 'Convert the winning thesis into an actionable execution blueprint.',
  },
];

const dnaMetrics = [
  { label: 'Innovation Index', value: 92 },
  { label: 'Technical Match', value: 96 },
  { label: 'Build Feasibility', value: 88 },
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
    <div className="relative min-h-full w-full overflow-hidden py-8 sm:py-12 lg:py-16">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 -top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute -right-20 top-80 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[130px]" />
        <div className="absolute -left-20 top-[900px] h-[350px] w-[350px] rounded-full bg-pink-500/5 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative flex w-full flex-col gap-20 sm:gap-24 lg:gap-28">
        {/* =======================================================
            HERO SECTION
        ======================================================= */}
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center">
          {/* Status Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] px-4 py-2 text-xs font-medium tracking-wide text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span>VENTUREMIND INTELLIGENCE ENGINE</span>
            <span className="ml-1 rounded-full border border-cyan-400/30 bg-cyan-400/15 px-2 py-0.5 text-[9px] font-bold text-cyan-200">
              ONLINE
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl font-black leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Your skills are the{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              starting point.
            </span>
            <br />
            Not the finish line.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            VentureMind turns your skills and interests into a{' '}
            <span className="font-semibold text-slate-200">
              scored, practical project blueprint
            </span>{' '}
            — then helps you improve it until it is truly worth building.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onStart}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-sm font-bold text-slate-950 shadow-[0_15px_45px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(34,211,238,0.25)] cursor-pointer"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Sparkles className="relative h-4 w-4 text-violet-600" />
              <span className="relative">Build My Project</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2 px-4 py-3 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>No API key required</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
            <span>AI Evaluated</span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span>Feasibility Scored</span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span>Build Ready</span>
          </div>
        </section>

        {/* =======================================================
            PRODUCT PREVIEW CARD
        ======================================================= */}
        <section className="mx-auto w-full">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-slate-950/80 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            {/* Top window bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                </div>
                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:block">
                  VentureMind / Live Project Intelligence
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                ANALYSIS COMPLETE
              </div>
            </div>

            {/* Preview Body */}
            <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
              {/* Left Column: Project Identity */}
              <div className="p-6 md:p-9 lg:border-r lg:border-white/[0.06] lg:p-10">
                <div className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  <Layers3 className="h-3.5 w-3.5" />
                  Featured Blueprint
                </div>

                <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-white md:text-3xl">
                  AI Career Copilot for Final-Year Students
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
                  A personalized platform that analyzes student skills, projects, and goals to generate realistic career paths and portfolio-building milestones.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Gemini AI', 'PostgreSQL'].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Score */}
                <div className="mt-8 flex items-end gap-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
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

              {/* Right Column: DNA Breakdown */}
              <div className="bg-white/[0.015] p-6 md:p-9 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">
                        Project DNA
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-500">
                        AI feasibility analysis
                      </div>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10">
                      <BrainCircuit className="h-5 w-5 text-violet-400" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {dnaMetrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="mb-1.5 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">{metric.label}</span>
                          <span className="font-bold text-slate-200">{metric.value}%</span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400"
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.04] p-3.5">
                  <Clock3 className="h-4 w-4 shrink-0 text-cyan-400" />
                  <div>
                    <div className="text-[11px] font-semibold text-slate-200">
                      Timeline fit
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Optimized for an 8-week build
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            INTELLIGENCE PIPELINE (HOW IT WORKS)
        ======================================================= */}
        <section className="mx-auto w-full">
          <div className="mb-8 max-w-2xl">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400">
              Intelligence Pipeline
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              From profile to{' '}
              <span className="text-slate-500">build plan.</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              VentureMind doesn't just produce an idea. It reasons about whether that concept deserves your time and effort.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {intelligenceSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-colors group-hover:border-cyan-400/25 group-hover:bg-cyan-400/10">
                      <Icon className="h-4 w-4 text-cyan-400" />
                    </div>

                    <span className="font-mono text-xs font-semibold text-slate-600">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {step.text}
                  </p>

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </section>

        {/* =======================================================
            WHY VENTUREMIND
        ======================================================= */}
        <section className="mx-auto w-full">
          <div className="relative overflow-hidden rounded-[28px] border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] via-white/[0.025] to-cyan-500/[0.05] p-8 md:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-[90px]" />

            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  Why VentureMind
                </div>

                <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Don't ask AI for an idea.
                  <br />
                  <span className="text-slate-400">
                    Ask it whether the idea deserves your time.
                  </span>
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
                  Every concept is evaluated across multi-dimensional criteria before becoming your recommended project. Then your mentor loop lets you reshape it dynamically.
                </p>
              </div>

              <button
                type="button"
                onClick={onStart}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3.5 text-xs font-bold text-white transition-all hover:border-cyan-400/25 hover:bg-cyan-400/10 cursor-pointer"
              >
                Explore the Studio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* =======================================================
            LEADERBOARD SHOWCASE
        ======================================================= */}
        {featuredProjects.length > 0 && (
          <section className="mx-auto w-full">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Intelligence benchmark
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Top Rated Blueprints
                </h2>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium text-slate-400 sm:self-auto">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live AI Benchmark
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
            FINAL CALL TO ACTION
        ======================================================= */}
        <section className="mx-auto w-full max-w-3xl pb-10 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <BrainCircuit className="h-5 w-5 text-cyan-400" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to find your{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              buildable project?
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-400">
            Give VentureMind your skills. We'll handle the reasoning.
          </p>

          <button
            type="button"
            onClick={onStart}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-[0_15px_40px_rgba(34,211,238,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(34,211,238,0.3)] cursor-pointer"
          >
            Start Building
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </div>
    </div>
  );
}