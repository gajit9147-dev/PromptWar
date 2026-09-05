import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Layers3,
  Rocket,
  Sparkles,
  Users,
  WandSparkles,
  Zap,
} from 'lucide-react';
import SkillSelector from '../components/SkillSelector';

const domains = [
  'AI & Developer Tools',
  'Web & SaaS',
  'Cybersecurity',
  'FinTech',
  'HealthTech',
  'EdTech',
  'IoT & Smart Systems',
  'Data & Analytics',
  'Cloud & DevOps',
];

const timelines = [
  '4 weeks',
  '6 weeks',
  '8 weeks',
  '12 weeks',
  '16+ weeks',
];

const experienceOptions = [
  {
    value: 'Beginner',
    description: 'Learning fundamentals',
  },
  {
    value: 'Intermediate',
    description: 'Comfortable building projects',
  },
  {
    value: 'Advanced',
    description: 'Ready for complex systems',
  },
];

const ambitionOptions = [
  {
    value: 'Simple & Reliable',
    icon: ShieldIcon,
    description: 'Low-risk, focused build',
  },
  {
    value: 'Balanced',
    icon: TargetIcon,
    description: 'Strong academics + portfolio',
  },
  {
    value: 'Highly Innovative',
    icon: Sparkles,
    description: 'Push the technical edge',
  },
  {
    value: 'Startup Ready',
    icon: Rocket,
    description: 'Built for real-world potential',
  },
];

function ShieldIcon({ className }) {
  return <Zap className={className} />;
}

function TargetIcon({ className }) {
  return <Layers3 className={className} />;
}

export default function Onboarding({
  onGenerate = () => { },
  loading = false,
}) {
  const [skills, setSkills] = useState([]);
  const [domain, setDomain] = useState('AI & Developer Tools');
  const [experience, setExperience] = useState('Intermediate');
  const [timeline, setTimeline] = useState('8 weeks');
  const [teamSize, setTeamSize] = useState('1');
  const [ambition, setAmbition] = useState('Balanced');
  const [prompt, setPrompt] = useState('');

  const completion = useMemo(() => {
    let score = 0;

    if (skills.length > 0) score += 30;
    if (domain) score += 15;
    if (experience) score += 15;
    if (timeline) score += 15;
    if (teamSize) score += 10;
    if (ambition) score += 15;

    return score;
  }, [skills, domain, experience, timeline, teamSize, ambition]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (skills.length === 0 || loading) return;

    onGenerate({
      skills,
      interests: [domain],
      domain,
      experience,
      timeline,
      teamSize,
      ambition,
      prompt,
      preferredTechnologies: skills,
    });
  };

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/[0.06] blur-[110px]" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 rounded-full bg-violet-500/[0.05] blur-[100px]" />

      {/* Header */}
      <header className="relative mb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
              <BrainCircuit className="h-3.5 w-3.5" />
              Project Intelligence Setup
            </div>

            <h1 className="max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Let's build around{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                what you know.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
              Tell VentureMind how you build. We'll evaluate multiple
              directions and select the one that best matches your skills,
              ambition and available time.
            </p>
          </div>

          {/* Completion */}
          <div className="w-full shrink-0 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 md:w-52">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                Profile signal
              </span>

              <span className="text-xs font-bold text-cyan-400">
                {completion}%
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>

            <p className="mt-2 text-[10px] text-slate-600">
              {completion === 100
                ? 'Profile ready for analysis'
                : 'Complete your build profile'}
            </p>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* LEFT */}
          <div className="space-y-5">
            {/* Skills */}
            <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] shadow-2xl backdrop-blur-xl">
              <div className="border-b border-white/[0.06] px-5 py-5 sm:px-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08]">
                    <Code2 className="h-4 w-4 text-cyan-400" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-white">
                        Your technical DNA
                      </h2>

                      <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[9px] font-bold text-cyan-300">
                        REQUIRED
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Select the technologies and skills you can confidently
                      use.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <SkillSelector
                  selectedSkills={skills}
                  onChange={setSkills}
                />

                <div className="mt-4 flex items-center justify-between">
                  {skills.length === 0 ? (
                    <p className="text-xs text-amber-400/80">
                      Select at least one skill to continue.
                    </p>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                      {skills.length} skill{skills.length > 1 ? 's' : ''}{' '}
                      selected
                    </div>
                  )}

                  <span className="text-[10px] text-slate-700">
                    VentureMind uses these as your capability constraints.
                  </span>
                </div>
              </div>
            </section>

            {/* Domain */}
            <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="mb-5 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/[0.08]">
                  <Layers3 className="h-4 w-4 text-violet-400" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-white">
                    Choose your battlefield
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Which space should VentureMind explore?
                  </p>
                </div>
              </div>

              <div className="relative">
                <select
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-white/[0.08] bg-slate-950/70 px-4 py-4 pr-12 text-sm font-medium text-white outline-none transition-all hover:border-white/[0.14] focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                >
                  {domains.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
              </div>
            </section>

            {/* Experience */}
            <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="mb-5">
                <h2 className="text-sm font-bold text-white">
                  How deep should we go?
                </h2>
                <p className="mt-1 text-xs text-slate-600">
                  Your experience helps calibrate technical complexity.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {experienceOptions.map((option) => {
                  const active = experience === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setExperience(option.value)}
                      className={`rounded-2xl border p-4 text-left transition-all duration-200 ${active
                          ? 'border-cyan-400/30 bg-cyan-400/[0.08] shadow-[0_0_30px_rgba(34,211,238,0.06)]'
                          : 'border-white/[0.07] bg-white/[0.015] hover:border-white/[0.14] hover:bg-white/[0.03]'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${active ? 'text-cyan-300' : 'text-slate-300'
                            }`}
                        >
                          {option.value}
                        </span>

                        {active && (
                          <Check className="h-3.5 w-3.5 text-cyan-400" />
                        )}
                      </div>

                      <p className="mt-2 text-[10px] leading-4 text-slate-600">
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Timeline + team */}
            <section className="grid gap-5 sm:grid-cols-2">
              {/* Timeline */}
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.08]">
                    <Clock3 className="h-4 w-4 text-amber-400" />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-white">
                      Build window
                    </h2>
                    <p className="text-[10px] text-slate-600">
                      Available timeline
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <select
                    id="timeline"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-white/[0.08] bg-slate-950/70 px-4 py-3 pr-10 text-sm text-white outline-none transition focus:border-cyan-400/50"
                  >
                    {timelines.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              {/* Team */}
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/[0.08]">
                    <Users className="h-4 w-4 text-blue-400" />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-white">
                      Build crew
                    </h2>
                    <p className="text-[10px] text-slate-600">
                      How many builders?
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <select
                    id="teamSize"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-white/[0.08] bg-slate-950/70 px-4 py-3 pr-10 text-sm text-white outline-none transition focus:border-cyan-400/50"
                  >
                    <option value="1">Solo</option>
                    <option value="2">2 members</option>
                    <option value="3">3 members</option>
                    <option value="4">4 members</option>
                    <option value="5+">5+ members</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                </div>
              </div>
            </section>

            {/* Ambition */}
            <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="mb-5 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-pink-400/20 bg-pink-400/[0.08]">
                  <WandSparkles className="h-4 w-4 text-pink-400" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-white">
                    Set your ambition
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    This influences how aggressively VentureMind explores
                    ideas.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {ambitionOptions.map((option) => {
                  const active = ambition === option.value;
                  const Icon = option.icon;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAmbition(option.value)}
                      className={`group rounded-2xl border p-4 text-left transition-all duration-200 ${active
                          ? 'border-violet-400/30 bg-violet-400/[0.08]'
                          : 'border-white/[0.07] bg-white/[0.015] hover:border-white/[0.14] hover:bg-white/[0.03]'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl ${active
                              ? 'bg-violet-400/15 text-violet-300'
                              : 'bg-white/[0.04] text-slate-600 group-hover:text-slate-400'
                            }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-xs font-bold ${active ? 'text-violet-300' : 'text-slate-300'
                                }`}
                            >
                              {option.value}
                            </span>

                            {active && (
                              <Check className="h-3.5 w-3.5 text-violet-400" />
                            )}
                          </div>

                          <p className="mt-1 text-[10px] text-slate-600">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Prompt */}
            <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="mb-5 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08]">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-white">
                    Give the AI a direction
                    <span className="ml-2 rounded-full bg-white/[0.05] px-2 py-0.5 text-[9px] font-medium text-slate-500">
                      OPTIONAL
                    </span>
                  </h2>

                  <p className="mt-1 text-xs text-slate-600">
                    Have a rough idea? Give VentureMind a starting signal.
                  </p>
                </div>
              </div>

              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                maxLength={500}
                placeholder="Example: I want something useful for students that could eventually become a real product..."
                className="w-full resize-none rounded-2xl border border-white/[0.08] bg-slate-950/70 px-4 py-4 text-sm leading-6 text-white placeholder:text-slate-700 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
              />

              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-700">
                <span>Optional context for the reasoning engine</span>
                <span>{prompt.length}/500</span>
              </div>
            </section>
          </div>

          {/* RIGHT — Intelligence summary */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-b from-cyan-400/[0.06] via-white/[0.025] to-white/[0.015] shadow-2xl backdrop-blur-xl">
              <div className="border-b border-white/[0.06] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                    <BrainCircuit className="h-5 w-5 text-cyan-400" />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-white">
                      Intelligence Brief
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-600">
                      What VentureMind will analyze
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 p-3">
                <SummaryRow
                  label="Technical skills"
                  value={
                    skills.length
                      ? `${skills.length} selected`
                      : 'Awaiting input'
                  }
                  active={skills.length > 0}
                />

                <SummaryRow label="Domain" value={domain} active />

                <SummaryRow label="Experience" value={experience} active />

                <SummaryRow label="Timeline" value={timeline} active />

                <SummaryRow
                  label="Team"
                  value={teamSize === '1' ? 'Solo' : `${teamSize} members`}
                  active
                />

                <SummaryRow label="Ambition" value={ambition} active />
              </div>

              {/* What happens next */}
              <div className="mx-4 mb-4 rounded-2xl border border-white/[0.06] bg-black/10 p-4">
                <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                  AI process
                </div>

                <div className="space-y-3">
                  <ProcessItem number="01" text="Generate candidate projects" />
                  <ProcessItem number="02" text="Evaluate project feasibility" />
                  <ProcessItem number="03" text="Select the strongest concept" />
                  <ProcessItem number="04" text="Create your build blueprint" />
                </div>
              </div>

              {/* Generate */}
              <div className="border-t border-white/[0.06] p-4">
                <button
                  type="submit"
                  disabled={loading || skills.length === 0}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-4 text-sm font-black text-slate-950 shadow-[0_15px_45px_rgba(34,211,238,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(34,211,238,0.18)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  {loading ? (
                    <>
                      <span className="relative h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                      <span className="relative">
                        Designing your project...
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="relative h-4 w-4" />
                      <span className="relative">Generate My Project</span>
                      <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[9px] leading-4 text-slate-700">
                  VentureMind will generate, evaluate and select your strongest
                  project direction.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </section>
  );
}

function SummaryRow({ label, value, active }) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.025]">
      <span
        className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-cyan-400' : 'bg-slate-700'
          }`}
      />

      <span className="min-w-0 flex-1 text-[10px] text-slate-600">
        {label}
      </span>

      <span className="max-w-[145px] truncate text-right text-[10px] font-semibold text-slate-300">
        {value}
      </span>
    </div>
  );
}

function ProcessItem({ number, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[9px] font-bold text-cyan-400/60">
        {number}
      </span>

      <span className="text-[10px] text-slate-500">{text}</span>
    </div>
  );
}