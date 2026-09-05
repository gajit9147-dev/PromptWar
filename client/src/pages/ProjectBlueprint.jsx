import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BrainCircuit,
  Sparkles,
  Rocket,
  Target,
  Clock3,
  Layers3,
  ChevronRight,
  ShieldCheck,
  Code2,
} from 'lucide-react';

import ProjectDNA from '../components/ProjectDNA';
import Roadmap from '../components/Roadmap';
import MentorActions from '../components/MentorActions';

function getScore(project) {
  const dna = project?.scoreData || project?.dna || {};

  return Number(
    dna?.overallScore ??
      dna?.overall ??
      dna?.score ??
      0
  );
}

function getFirstAvailable(...values) {
  return values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ''
  );
}

export default function ProjectBlueprint({
  project,
  mentors = [],
  mentorFeedback = null,
  aiLoading = false,
  onScoreProject = () => {},
  onConsultMentor = () => {},
  onAdaptProject = () => {},
  onBack = () => {},
}) {
  if (!project) return null;

  const dna = project.scoreData || project.dna || {};
  const overallScore = Math.min(
    100,
    Math.max(0, Math.round(getScore(project)))
  );

  const projectSummary = getFirstAvailable(
    project.summary,
    project.description,
    project.problem,
    project.tagline,
    'A practical project concept generated around your skills, interests, and goals.'
  );

  const problem = getFirstAvailable(
    project.problem,
    project.problemStatement
  );

  const solution = getFirstAvailable(
    project.solution,
    project.solutionOverview
  );

  const features = Array.isArray(project.features)
    ? project.features
    : [];

  const techStack = project.techStack || project.technologies;

  const domain = getFirstAvailable(project.domain, 'Technology');

  const difficulty = getFirstAvailable(
    project.difficulty,
    project.level,
    'Intermediate'
  );

  const timeline = getFirstAvailable(
    project.timeline,
    project.duration,
    project.timeEstimate
  );

  const phases =
    project.roadmap ||
    project.phases || [
      {
        phase: 1,
        title: 'Architecture & Core Foundations',
        duration: 'Sprint 1',
        tasks: [
          'Establish application architecture',
          'Configure secure API layer',
          'Set up AI schema validation',
        ],
      },
      {
        phase: 2,
        title: 'MVP Feature Development',
        duration: 'Sprint 2',
        tasks: [
          'Implement core project workflows',
          'Integrate adaptive mentor loop',
          'Connect AI generation pipeline',
        ],
      },
      {
        phase: 3,
        title: 'Testing & Deployment',
        duration: 'Sprint 3',
        tasks: [
          'Run functional and security checks',
          'Optimize the user experience',
          'Prepare production deployment',
        ],
      },
    ];

  return (
    <main className="relative min-h-full pb-12">
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[70%] -translate-x-1/2 rounded-full bg-cyan-500/[0.045] blur-3xl" />

      <div className="space-y-7">
        {/* =====================================================
            TOP BAR
        ====================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="
              group inline-flex items-center gap-2
              rounded-xl border border-white/10
              bg-white/[0.025] px-3.5 py-2
              text-xs font-medium text-slate-400
              transition-all duration-200
              hover:border-cyan-400/20
              hover:bg-cyan-400/[0.05]
              hover:text-cyan-300
              focus:outline-none focus:ring-2
              focus:ring-cyan-400/40
            "
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Studio
          </button>

          <div className="flex items-center gap-2">
            <span
              className="
                inline-flex items-center gap-1.5
                rounded-full border border-emerald-400/15
                bg-emerald-400/[0.06]
                px-3 py-1.5
                text-[10px] font-semibold uppercase
                tracking-wider text-emerald-300
              "
            >
              <ShieldCheck size={11} />
              AI Blueprint Ready
            </span>

            {project.id && (
              <span
                className="
                  hidden sm:inline-flex items-center
                  rounded-full border border-white/10
                  bg-white/[0.025]
                  px-3 py-1.5
                  text-[10px] font-mono
                  text-slate-500
                "
              >
                {project.id}
              </span>
            )}
          </div>
        </div>

        {/* =====================================================
            PROJECT HERO
        ====================================================== */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-white/[0.045] via-white/[0.025] to-cyan-400/[0.02] p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10"
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/[0.09] blur-[90px]" />
          <div className="pointer-events-none absolute bottom-[-100px] left-[25%] h-64 w-64 rounded-full bg-cyan-400/[0.06] blur-[90px]" />

          {/* subtle grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          <div className="relative">
            {/* Top metadata */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                  <Sparkles size={11} />
                  AI Selected
                </span>

                <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.06] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-violet-300">
                  {domain}
                </span>

                <span className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[9px] font-medium text-slate-400">
                  {difficulty}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                  <ShieldCheck size={11} />
                  Blueprint Ready
                </span>

                {project.id && (
                  <span className="hidden rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 font-mono text-[9px] text-slate-600 sm:inline-flex">
                    {project.id}
                  </span>
                )}
              </div>
            </div>

            {/* Main hero */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-4xl">
                <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400/80">
                  <BrainCircuit size={12} />
                  Recommended build direction
                </p>

                <h1 className="text-3xl font-black leading-tight tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl">
                  {project.title || 'Untitled Project'}
                </h1>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                  {projectSummary}
                </p>

                {/* Project signals */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {timeline && (
                    <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/10 px-3 py-2">
                      <Clock3 size={13} className="text-amber-400" />
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-slate-600">
                          Timeline
                        </p>
                        <p className="text-[11px] font-semibold text-slate-300">
                          {timeline}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/10 px-3 py-2">
                    <Target size={13} className="text-cyan-400" />
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Direction
                      </p>
                      <p className="text-[11px] font-semibold text-slate-300">
                        {domain}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/10 px-3 py-2">
                    <Rocket size={13} className="text-violet-400" />
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Readiness
                      </p>
                      <p className="text-[11px] font-semibold text-slate-300">
                        {overallScore >= 85
                          ? 'Strong'
                          : overallScore >= 70
                          ? 'Promising'
                          : 'Needs refinement'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DNA score card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="relative mx-auto w-full max-w-[250px] lg:mx-0"
              >
                <div className="absolute inset-0 rounded-[28px] bg-cyan-400/[0.07] blur-2xl" />

                <div className="relative overflow-hidden rounded-[28px] border border-cyan-400/15 bg-slate-950/60 p-6 text-center shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
                  <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-600">
                    Project DNA
                  </div>

                  <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
                    {/* Rings */}
                    <div className="absolute inset-0 rounded-full border border-cyan-400/10" />
                    <div className="absolute inset-2 rounded-full border border-violet-400/10" />
                    <div className="absolute inset-4 rounded-full border border-cyan-400/10" />

                    <div className="relative">
                      <div className="text-5xl font-black tracking-[-0.05em] text-white">
                        {overallScore}
                      </div>

                      <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                        out of 100
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="text-sm font-bold text-white">
                      {overallScore >= 85
                        ? 'Strong build signal'
                        : overallScore >= 70
                        ? 'Promising build signal'
                        : 'Refinement recommended'}
                    </div>

                    <p className="mt-1 text-[10px] leading-4 text-slate-600">
                      Based on feasibility, skill match, innovation and portfolio
                      potential.
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-400">
                      AI analysis complete
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* =====================================================
            QUICK PROJECT INTELLIGENCE
        ====================================================== */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              <Target size={13} className="text-cyan-400" />
              Direction
            </div>
            <p className="mt-2 text-sm font-bold text-white">
              {domain}
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              <Layers3 size={13} className="text-violet-400" />
              Complexity
            </div>
            <p className="mt-2 text-sm font-bold text-white">
              {difficulty}
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              <Clock3 size={13} className="text-amber-400" />
              Timeline
            </div>
            <p className="mt-2 text-sm font-bold text-white">
              {timeline || 'AI estimated'}
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              <Sparkles size={13} className="text-emerald-400" />
              AI Confidence
            </div>
            <p className="mt-2 text-sm font-bold text-white">
              {overallScore >= 85
                ? 'High'
                : overallScore >= 70
                ? 'Good'
                : 'Refine'}
            </p>
          </div>
        </div>

        {/* =====================================================
            PROBLEM → AI INSIGHT → SOLUTION
        ====================================================== */}
        {(problem || solution) && (
          <section>
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400/70">
                  VentureMind reasoning
                </p>

                <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                  Why this project makes sense
                </h2>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[9px] font-medium uppercase tracking-wider text-slate-500">
                <BrainCircuit size={11} className="text-cyan-400" />
                AI analyzed
              </div>
            </div>

            <div className="relative grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
              {/* PROBLEM */}
              {problem && (
                <motion.article
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group relative overflow-hidden rounded-3xl border border-amber-400/10 bg-gradient-to-br from-amber-400/[0.045] to-white/[0.02] p-6"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-amber-400/[0.05] blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/15 bg-amber-400/[0.08]">
                          <Target size={17} className="text-amber-400" />
                        </div>

                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-amber-400/70">
                            Signal 01
                          </p>

                          <h3 className="mt-0.5 text-sm font-bold text-white">
                            The Problem
                          </h3>
                        </div>
                      </div>

                      <span className="font-mono text-[9px] text-amber-400/40">
                        PAIN
                      </span>
                    </div>

                    <p className="mt-6 text-sm leading-7 text-slate-400">
                      {problem}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-wider text-amber-400/60">
                      <span className="h-px w-6 bg-amber-400/30" />
                      User need identified
                    </div>
                  </div>
                </motion.article>
              )}

              {/* AI CONNECTION */}
              {problem && solution && (
                <div className="relative flex items-center justify-center py-1 lg:px-1 lg:py-0">
                  <div className="hidden h-full w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent lg:block" />

                  <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
                    <div className="absolute inset-0 animate-pulse rounded-2xl bg-cyan-400/5" />

                    <BrainCircuit
                      size={17}
                      className="relative text-cyan-400"
                    />
                  </div>

                  <div className="absolute hidden lg:block">
                    <div className="h-px w-6 bg-gradient-to-r from-amber-400/20 to-cyan-400/30" />
                  </div>
                </div>
              )}

              {/* SOLUTION */}
              {solution && (
                <motion.article
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08, duration: 0.4 }}
                  className="group relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.045] to-violet-400/[0.025] p-6"
                >
                  <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-cyan-400/[0.05] blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.08]">
                          <Rocket size={17} className="text-cyan-400" />
                        </div>

                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-400/70">
                            Signal 02
                          </p>

                          <h3 className="mt-0.5 text-sm font-bold text-white">
                            The Solution
                          </h3>
                        </div>
                      </div>

                      <span className="font-mono text-[9px] text-cyan-400/40">
                        BUILD
                      </span>
                    </div>

                    <p className="mt-6 text-sm leading-7 text-slate-400">
                      {solution}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-wider text-cyan-400/60">
                      <span className="h-px w-6 bg-cyan-400/30" />
                      Build direction identified
                    </div>
                  </div>
                </motion.article>
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            PRODUCT FEATURE ARCHITECTURE
        ====================================================== */}
        {features.length > 0 && (
          <section>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400/70">
                  Product architecture
                </p>

                <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                  What you will actually build
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  VentureMind turns the concept into a focused feature set so you
                  know what belongs inside the MVP.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5">
                <Layers3 size={11} className="text-violet-400" />
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  {features.length} Core Modules
                </span>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {features.map((feature, index) => {
                const title =
                  typeof feature === 'string'
                    ? feature
                    : feature?.title ||
                      feature?.name ||
                      `Feature ${index + 1}`;

                const description =
                  typeof feature === 'object'
                    ? feature?.description
                    : null;

                const priority =
                  typeof feature === 'object'
                    ? feature?.priority || feature?.importance
                    : null;

                const isPrimary =
                  index === 0 ||
                  priority === 'high' ||
                  priority === 'High' ||
                  priority === 'core';

                return (
                  <motion.article
                    key={`${title}-${index}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.045,
                      duration: 0.35,
                    }}
                    className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                      isPrimary
                        ? 'border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.045] to-white/[0.02] hover:border-cyan-400/30'
                        : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.035]'
                    }`}
                  >
                    {/* Hover glow */}
                    <div
                      className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition-opacity duration-300 ${
                        isPrimary
                          ? 'bg-cyan-400/10 opacity-60 group-hover:opacity-100'
                          : 'bg-violet-400/5 opacity-0 group-hover:opacity-100'
                      }`}
                    />

                    <div className="relative flex gap-4">
                      {/* Number */}
                      <div className="shrink-0">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl border font-mono text-xs font-bold ${
                            isPrimary
                              ? 'border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300'
                              : 'border-white/[0.07] bg-white/[0.025] text-slate-600'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="text-sm font-bold text-white">
                            {title}
                          </h3>

                          {isPrimary && (
                            <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-cyan-300">
                              MVP Core
                            </span>
                          )}
                        </div>

                        {description ? (
                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            {description}
                          </p>
                        ) : (
                          <p className="mt-2 text-xs leading-5 text-slate-600">
                            Core capability identified by the VentureMind reasoning
                            engine.
                          </p>
                        )}

                        <div className="mt-4 flex items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isPrimary
                                ? 'bg-cyan-400'
                                : 'bg-violet-400/50'
                            }`}
                          />

                          <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-700">
                            {isPrimary ? 'Build first' : 'Supporting capability'}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="hidden shrink-0 self-center sm:block">
                        <ChevronRight
                          size={16}
                          className="text-slate-700 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-400"
                        />
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div
                      className={`absolute bottom-0 left-0 h-px transition-all duration-500 ${
                        isPrimary
                          ? 'w-0 bg-gradient-to-r from-cyan-400 to-violet-400 group-hover:w-full'
                          : 'w-0 bg-white/20 group-hover:w-1/2'
                      }`}
                    />
                  </motion.article>
                );
              })}
            </div>
          </section>
        )}

        {/* =====================================================
            PROJECT DNA
        ====================================================== */}
        <section>
          <ProjectDNA
            dna={dna}
            badges={
              project.badges ||
              project.scoreData?.badges ||
              []
            }
            percentile={
              project.percentile ||
              project.scoreData?.percentile
            }
          />
        </section>

        {/* =====================================================
            RECOMMENDED ARCHITECTURE
        ====================================================== */}
        {techStack && (
          <section>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400/70">
                  Technical architecture
                </p>

                <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                  Recommended technology stack
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  A practical stack selected around your project's complexity,
                  timeline and build requirements.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/10 bg-violet-400/[0.04] px-3 py-1.5">
                <BrainCircuit size={11} className="text-violet-400" />
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  AI Recommended
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] shadow-2xl backdrop-blur-xl">
              {/* Architecture header */}
              <div className="border-b border-white/[0.06] bg-white/[0.015] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.07]">
                    <Layers3 size={16} className="text-violet-400" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white">
                      Build architecture
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-600">
                      Technologies mapped to the recommended implementation
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                {Array.isArray(techStack) ? (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {techStack.map((tech, index) => {
                      const name =
                        typeof tech === 'string'
                          ? tech
                          : tech?.name ||
                            tech?.technology ||
                            'Technology';

                      return (
                        <TechnologyCard
                          key={`${name}-${index}`}
                          name={name}
                          index={index}
                        />
                      );
                    })}
                  </div>
                ) : typeof techStack === 'object' ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(techStack).map(
                      ([category, technologies], categoryIndex) => {
                        const items = Array.isArray(technologies)
                          ? technologies
                          : [technologies];

                        return (
                          <div
                            key={category}
                            className="rounded-2xl border border-white/[0.07] bg-slate-950/30 p-4"
                          >
                            <div className="mb-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-400/[0.07] font-mono text-[9px] font-bold text-violet-400">
                                  {String(categoryIndex + 1).padStart(2, '0')}
                                </span>

                                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                  {category}
                                </span>
                              </div>

                              <span className="text-[9px] text-slate-700">
                                {items.length} item
                                {items.length !== 1 ? 's' : ''}
                              </span>
                            </div>

                            <div className="space-y-2">
                              {items.map((tech, index) => {
                                const name =
                                  typeof tech === 'string'
                                    ? tech
                                    : tech?.name ||
                                      tech?.technology ||
                                      'Technology';

                                return (
                                  <TechnologyRow
                                    key={`${category}-${index}`}
                                    name={name}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {String(techStack)
                      .split(',')
                      .map((tech, index) => tech.trim())
                      .filter(Boolean)
                      .map((tech, index) => (
                        <TechnologyCard
                          key={`${tech}-${index}`}
                          name={tech}
                          index={index}
                        />
                      ))}
                  </div>
                )}
              </div>

              {/* Architecture footer */}
              <div className="border-t border-white/[0.06] bg-black/10 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={13} className="text-emerald-400" />

                    <span className="text-[10px] text-slate-500">
                      Stack optimized for project feasibility
                    </span>
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-wider text-slate-700">
                    venturemind / architecture
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            ROADMAP + MENTOR
        ====================================================== */}
        <section>
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400/70">
              From idea to execution
            </p>

            <h2 className="mt-1 text-xl font-bold text-white">
              Your build workspace
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Follow the roadmap and use the AI mentor to adapt
              the project as you build.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Roadmap phases={phases} />
            </div>

            <div>
              <MentorActions
                mentors={mentors}
                activeFeedback={mentorFeedback}
                onRequestGuidance={(mentorId) =>
                  onConsultMentor(mentorId, project.id)
                }
                onAdaptProject={onAdaptProject}
                loading={aiLoading}
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL ACTION
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="
            flex flex-col gap-4
            rounded-2xl border border-cyan-400/10
            bg-cyan-400/[0.025]
            p-5 sm:flex-row sm:items-center
            sm:justify-between sm:p-6
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <Rocket size={16} className="text-cyan-300" />

              <h2 className="text-sm font-bold text-white">
                Ready to pressure-test your idea?
              </h2>
            </div>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Re-score the project whenever you change its scope,
              features, or execution strategy.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onScoreProject(project.id)}
            disabled={aiLoading}
            className="
              inline-flex shrink-0 items-center
              justify-center gap-2
              rounded-xl
              border border-cyan-400/20
              bg-cyan-400/10
              px-4 py-2.5
              text-xs font-semibold
              text-cyan-200
              transition-all duration-200
              hover:bg-cyan-400/15
              hover:border-cyan-400/30
              disabled:cursor-not-allowed
              disabled:opacity-50
              focus:outline-none
              focus:ring-2 focus:ring-cyan-400/40
            "
          >
            <BrainCircuit size={15} />

            {aiLoading
              ? 'Re-evaluating...'
              : 'Re-evaluate Project'}
          </button>
        </motion.div>
      </div>
    </main>
  );
}

function TechnologyCard({ name, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group relative overflow-hidden rounded-2xl border border-violet-400/10 bg-violet-400/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/25 hover:bg-violet-400/[0.05]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.07]">
          <Code2 size={15} className="text-violet-300" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-bold text-slate-200">
            {name}
          </p>

          <p className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-700">
            Recommended
          </p>
        </div>
      </div>

      <ChevronRight
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-400"
      />

      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

function TechnologyRow({ name }) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] px-3 py-2.5 transition hover:border-violet-400/15 hover:bg-violet-400/[0.025]">
      <span className="h-1.5 w-1.5 rounded-full bg-violet-400/60 transition group-hover:bg-violet-400" />

      <span className="flex-1 text-xs font-medium text-slate-400 transition group-hover:text-slate-200">
        {typeof name === 'string' ? name : String(name)}
      </span>

      <span className="text-[8px] font-bold uppercase tracking-wider text-slate-700">
        selected
      </span>
    </div>
  );
}
