import React from 'react';

/**
 * @component LoadingExperience
 * @description Immersive multi-stage AI neural synthesis loader with status stream.
 * @param {Object} props
 * @param {string} [props.stage] - Current phase label (e.g. "Synthesizing Project DNA", "Analyzing Market Viability").
 */
export default function LoadingExperience({ stage = 'Synthesizing Intelligence...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-6">
      {/* Glowing Orbital Ring */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
        <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-violet-500 border-b-transparent border-l-transparent animate-spin" />
        <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 backdrop-blur-sm flex items-center justify-center text-cyan-400 font-mono text-xs">
          AI
        </div>
      </div>

      <div className="space-y-2 max-w-sm">
        <h4 className="text-lg font-bold bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
          {stage}
        </h4>
        <p className="text-xs font-mono text-slate-500">
          Engine running 5-dimensional feasibility & candidate synthesis...
        </p>
      </div>
    </div>
  );
}
