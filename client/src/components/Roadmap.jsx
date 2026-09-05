import React from 'react';

/**
 * @component Roadmap
 * @description Interactive execution roadmap rendering multi-phase implementation milestones.
 * @param {Object} props
 * @param {Array<Object>} props.phases - Phase milestones (phase, title, tasks, duration).
 */
export default function Roadmap({ phases = [] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="w-2 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500" />
        Strategic Execution Roadmap
      </h3>

      <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-violet-500 before:to-slate-800">
        {phases.length === 0 ? (
          <p className="text-sm text-slate-500 italic">No execution milestones generated.</p>
        ) : (
          phases.map((phase, idx) => (
            <div key={idx} className="relative group">
              {/* Dot node */}
              <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors" />

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-all">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h4 className="font-semibold text-white">
                    {phase.title || `Phase ${idx + 1}`}
                  </h4>
                  {phase.duration && (
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                      {phase.duration}
                    </span>
                  )}
                </div>

                {phase.tasks && (
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-400 font-mono">
                    {phase.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-center gap-2">
                        <span className="text-violet-400">▹</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
