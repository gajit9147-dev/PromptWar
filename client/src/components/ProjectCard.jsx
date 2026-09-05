import React from 'react';

/**
 * @component ProjectCard
 * @description Glassmorphic summary card representing an AI candidate project in leaderboards and galleries.
 * @param {Object} props
 * @param {Object} props.project - The project entity data.
 * @param {Function} [props.onClick] - Click event handler.
 */
export default function ProjectCard({ project, onClick = () => {} }) {
  if (!project) return null;

  return (
    <div
      onClick={() => onClick(project)}
      className="group relative p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer backdrop-blur-md"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h4>
        <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Score: {project.score || project.dna?.overallScore || 'N/A'}
        </span>
      </div>

      <p className="text-sm text-slate-400 line-clamp-2 mb-4">
        {project.summary || project.tagline || 'No summary available.'}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/5 text-xs text-slate-500 font-mono">
        <span>Domain: {project.domain || 'General'}</span>
        <span>Difficulty: {project.difficulty || 'Intermediate'}</span>
      </div>
    </div>
  );
}
