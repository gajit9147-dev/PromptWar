import React from 'react';

const DEFAULT_SKILLS = [
  'React / Next.js',
  'Node.js / Express',
  'Python / FastApi',
  'AI / LLM Engineering',
  'UI/UX Design',
  'PostgreSQL / Prisma',
  'Solidity / Web3',
  'DevOps / Docker',
];

/**
 * @component SkillSelector
 * @description Multi-select interactive chip grid for developer skill profiling during onboarding.
 * @param {Object} props
 * @param {Array<string>} props.selectedSkills - Currently selected skill tags.
 * @param {Function} props.onChange - Callback fired on skill toggle `(skills) => void`.
 */
export default function SkillSelector({ selectedSkills = [], onChange = () => {} }) {
  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onChange([...selectedSkills, skill]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-300">
        Select Your Tech Stack & Superpowers
      </label>
      <div className="flex flex-wrap gap-2">
        {DEFAULT_SKILLS.map((skill) => {
          const isSelected = selectedSkills.includes(skill);
          return (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                  : 'bg-white/[0.02] text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-200'
              }`}
            >
              {isSelected ? '✓ ' : '+ '}
              {skill}
            </button>
          );
        })}
      </div>
    </div>
  );
}
