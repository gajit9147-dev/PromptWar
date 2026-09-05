import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import ProjectBlueprint from './pages/ProjectBlueprint';
import LoadingExperience from './components/LoadingExperience';
import { useProject } from './hooks/useProject';

/**
 * Root Application component for VentureMind.
 * Controls routing between Home, Onboarding, and Blueprint states.
 */
export default function App() {
  const [activeView, setActiveView] = useState('home'); // 'home' | 'onboarding' | 'blueprint'
  const {
    currentProject,
    setCurrentProject,
    mentors,
    activeMentorFeedback,
    leaderboard,
    loading,
    aiLoading,
    error,
    generateProject,
    adaptProject,
    fetchMentors,
    consultMentor,
    rescoreProject,
    fetchLeaderboard,
  } = useProject();

  useEffect(() => {
    fetchMentors();
    fetchLeaderboard();
  }, [fetchMentors, fetchLeaderboard]);

  const handleGenerate = async (inputData) => {
    try {
      const project = await generateProject(inputData);
      if (project) {
        setActiveView('blueprint');
      }
    } catch (err) {
      console.error('Generation failed:', err);
    }
  };

  const handleSelectProject = (project) => {
    setCurrentProject(project);
    setActiveView('blueprint');
  };

  return (
    <div className="min-h-screen bg-[#050813] text-slate-200 flex flex-col">
      {/* Global Navigation Header */}
      <header className="border-b border-white/5 bg-[#050813]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 h-16 flex items-center justify-between">
          <div
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-violet-600 flex items-center justify-center font-bold text-slate-950 font-mono text-sm">
              VM
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Venture<span className="text-cyan-400">Mind</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {activeView !== 'onboarding' && (
              <button
                type="button"
                onClick={() => setActiveView('onboarding')}
                className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all cursor-pointer"
              >
                + New Project
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
        {error && (
          <div className="my-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
            Error: {error}
          </div>
        )}

        {aiLoading && <LoadingExperience />}

        {!aiLoading && activeView === 'home' && (
          <Home
            leaderboard={leaderboard}
            onStart={() => setActiveView('onboarding')}
            onSelectProject={handleSelectProject}
          />
        )}

        {!aiLoading && activeView === 'onboarding' && (
          <Onboarding onGenerate={handleGenerate} loading={aiLoading} />
        )}

        {!aiLoading && activeView === 'blueprint' && currentProject && (
          <ProjectBlueprint
            project={currentProject}
            mentors={mentors}
            mentorFeedback={activeMentorFeedback}
            aiLoading={aiLoading}
            onScoreProject={rescoreProject}
            onConsultMentor={consultMentor}
            onAdaptProject={adaptProject}
            onBack={() => setActiveView('home')}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-xs font-mono text-slate-600">
        VentureMind • Autonomous Startup Intelligence & Adaptive Mentor Council
      </footer>
    </div>
  );
}
