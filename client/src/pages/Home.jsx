import React from 'react';
import ProjectCard from '../components/ProjectCard';

/**
 * @page Home
 * @description Landing page featuring Hero CTA, dynamic leaderboard showcase, and project gallery.
 * @param {Object} props
 * @param {Array<Object>} [props.projects] - Array of featured project candidates.
 * @param {Array<Object>} [props.leaderboard] - Array of top scored project entities.
 * @param {Function} props.onStart - Transition to Onboarding workflow.
 * @param {Function} props.onSelectProject - Open ProjectBlueprint view.
 */
export default function Home({
  projects = [],
  leaderboard = [],
  onStart = () => {},
  onSelectProject = () => {},
}) {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Autonomous AI Startup Intelligence Engine
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Turn Raw Ideas into{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
            Scored Project DNA
          </span>
        </h1>

        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
          VentureMind transforms your technical skills into validated startup concepts with real-time scoring, execution blueprints, and an adaptive mentor loop.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={onStart}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-mono shadow-[0_0_25px_rgba(0,242,254,0.3)] transition-all cursor-pointer"
          >
            Launch Project Studio →
          </button>
        </div>
      </section>

      {/* Leaderboard Showcase */}
      {leaderboard.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Top Rated Blueprints</h2>
            <span className="text-xs font-mono text-cyan-400">Live AI Benchmark</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaderboard.map((item) => (
              <ProjectCard key={item.id} project={item} onClick={onSelectProject} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
