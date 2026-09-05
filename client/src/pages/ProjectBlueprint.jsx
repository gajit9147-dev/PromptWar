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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            relative overflow-hidden
            rounded-3xl
            border border-white/10
            bg-white/[0.035]
            p-6 sm:p-8
            backdrop-blur-xl
          "
        >
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/[0.07] blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-cyan-500/[0.05] blur-3xl" />

          <div className="relative">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="
                  rounded-lg border border-cyan-400/20
                  bg-cyan-400/[0.07]
                  px-2.5 py-1
                  text-[10px] font-semibold uppercase
                  tracking-wider text-cyan-300
                "
              >
                {domain}
              </span>

              <span
                className="
                  rounded-lg border border-violet-400/20
                  bg-violet-400/[0.07]
                  px-2.5 py-1
                  text-[10px] font-semibold uppercase
                  tracking-wider text-violet-300
                "
              >
                {difficulty}
              </span>

              {timeline && (
                <span
                  className="
                    inline-flex items-center gap-1.5
                    rounded-lg border border-white/10
                    bg-white/[0.025]
                    px-2.5 py-1
                    text-[10px] font-medium
                    text-slate-400
                  "
                >
                  <Clock3 size={11} />
                  {timeline}
                </span>
              )}
            </div>

            {/* Title */}
            <div className="mt-5 max-w-4xl">
              <p
                className="
                  mb-2 inline-flex items-center gap-1.5
                  text-[10px] font-semibold uppercase
                  tracking-[0.2em] text-cyan-400/80
                "
              >
                <Sparkles size={11} />
                Your recommended build
              </p>

              <h1
                className="
                  text-3xl font-black tracking-tight
                  text-white sm:text-4xl lg:text-5xl
                "
              >
                {project.title || 'Untitled Project'}
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                {projectSummary}
              </p>
            </div>

            {/* Hero score */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div
                className="
                  inline-flex items-center gap-3
                  rounded-2xl border border-cyan-400/15
                  bg-black/20 px-4 py-3
                "
              >
                <div
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-xl bg-cyan-400/10
                    text-cyan-300
                  "
                >
                  <BrainCircuit size={18} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                    Project DNA
                  </p>

                  <p className="mt-0.5 text-sm font-bold text-white">
                    {overallScore}/100
                  </p>
                </div>
              </div>

              <div
                className="
                  inline-flex items-center gap-2
                  rounded-2xl border border-white/10
                  bg-white/[0.025]
                  px-4 py-3
                  text-xs text-slate-400
                "
              >
                <Rocket size={15} className="text-violet-300" />
                AI-generated execution blueprint
              </div>
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
            PROBLEM → SOLUTION
        ====================================================== */}
        {(problem || solution) && (
          <section className="grid gap-4 lg:grid-cols-2">
            {problem && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  rounded-2xl border border-white/8
                  bg-white/[0.025] p-5 sm:p-6
                "
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <h2 className="text-sm font-bold text-white">
                    The problem
                  </h2>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {problem}
                </p>
              </motion.div>
            )}

            {solution && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="
                  rounded-2xl border border-white/8
                  bg-white/[0.025] p-5 sm:p-6
                "
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-400" />
                  <h2 className="text-sm font-bold text-white">
                    The solution
                  </h2>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {solution}
                </p>
              </motion.div>
            )}
          </section>
        )}

        {/* =====================================================
            FEATURES
        ====================================================== */}
        {features.length > 0 && (
          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400/70">
                  Build scope
                </p>

                <h2 className="mt-1 text-xl font-bold text-white">
                  Core features
                </h2>
              </div>

              <span className="text-[10px] font-mono text-slate-600">
                {features.length} FEATURES
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

                return (
                  <motion.div
                    key={`${title}-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="
                      group rounded-2xl
                      border border-white/8
                      bg-white/[0.025]
                      p-4
                      transition-all duration-200
                      hover:border-cyan-400/15
                      hover:bg-white/[0.04]
                    "
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="
                          flex h-8 w-8 shrink-0
                          items-center justify-center
                          rounded-xl
                          bg-cyan-400/[0.07]
                          text-cyan-300
                        "
                      >
                        <ChevronRight size={15} />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-200">
                          {title}
                        </h3>

                        {description && (
                          <p className="mt-1.5 text-xs leading-5 text-slate-500">
                            {description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
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
            TECH STACK
        ====================================================== */}
        {techStack && (
          <section
            className="
              rounded-2xl border border-white/8
              bg-white/[0.025] p-5 sm:p-6
            "
          >
            <div className="flex items-center gap-2">
              <Layers3 size={17} className="text-violet-300" />
              <h2 className="text-sm font-bold text-white">
                Recommended technology stack
              </h2>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {Array.isArray(techStack)
                ? techStack.map((tech, index) => (
                    <span
                      key={`${tech}-${index}`}
                      className="
                        rounded-xl border border-violet-400/15
                        bg-violet-400/[0.06]
                        px-3 py-1.5
                        text-xs font-medium
                        text-violet-200
                      "
                    >
                      {typeof tech === 'string'
                        ? tech
                        : tech?.name || tech?.technology || 'Technology'}
                    </span>
                  ))
                : typeof techStack === 'object'
                ? Object.entries(techStack).map(
                    ([category, technologies]) => (
                      <div
                        key={category}
                        className="w-full"
                      >
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                          {category}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(technologies)
                            ? technologies
                            : [technologies]
                          ).map((tech, index) => (
                            <span
                              key={`${category}-${index}`}
                              className="
                                rounded-xl border border-violet-400/15
                                bg-violet-400/[0.06]
                                px-3 py-1.5
                                text-xs font-medium
                                text-violet-200
                              "
                            >
                              {String(tech)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )
                : String(techStack)
                    .split(',')
                    .map((tech, index) => (
                      <span
                        key={`${tech}-${index}`}
                        className="
                          rounded-xl border border-violet-400/15
                          bg-violet-400/[0.06]
                          px-3 py-1.5
                          text-xs font-medium
                          text-violet-200
                        "
                      >
                        {tech.trim()}
                      </span>
                    ))}
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
