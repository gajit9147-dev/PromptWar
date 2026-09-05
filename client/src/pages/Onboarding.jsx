import React, { useState } from 'react';
import SkillSelector from '../components/SkillSelector';

/**
 * @page Onboarding
 * @description Guided setup workflow collecting domain preference, skills, and vision to feed AI Candidate Generation.
 * @param {Object} props
 * @param {Function} props.onGenerate - Triggers AI generation with `{ skills, domain, prompt }`.
 * @param {boolean} [props.loading] - Generation loading state.
 */
export default function Onboarding({ onGenerate = () => {}, loading = false }) {
  const [skills, setSkills] = useState([]);
  const [domain, setDomain] = useState('AI & Developer Tools');
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ skills, domain, prompt });
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-white mb-2">Configure Project Genesis</h2>
        <p className="text-sm text-slate-400">
          Define your target sector and competencies to calibrate the Candidate Generation Engine.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Domain Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Target Industry / Domain</label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
          >
            <option value="AI & Developer Tools" className="bg-slate-900">AI & Developer Tools</option>
            <option value="FinTech & Web3" className="bg-slate-900">FinTech & Web3</option>
            <option value="HealthTech & Bio" className="bg-slate-900">HealthTech & Bio</option>
            <option value="EdTech & Future of Work" className="bg-slate-900">EdTech & Future of Work</option>
            <option value="Climate & CleanTech" className="bg-slate-900">Climate & CleanTech</option>
          </select>
        </div>

        {/* Skill Selector */}
        <SkillSelector selectedSkills={skills} onChange={setSkills} />

        {/* Custom Vision Prompt */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Vision or Problem Statement (Optional)
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., An autonomous copilot for debugging microservices in real time..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl font-bold font-mono text-slate-950 bg-gradient-to-r from-cyan-400 to-violet-500 hover:from-cyan-300 hover:to-violet-400 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.3)] disabled:opacity-50"
        >
          {loading ? 'Synthesizing Blueprint...' : 'Generate Project DNA →'}
        </button>
      </form>
    </div>
  );
}
