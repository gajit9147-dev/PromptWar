import { useState, useCallback } from 'react';
import { api } from '../services/api';

/**
 * Custom hook for VentureMind Project & Mentor state orchestration.
 * Manages full lifecycle: creation, scoring, adaptive mentor loop, leaderboard.
 */
export function useProject() {
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [activeMentorFeedback, setActiveMentorFeedback] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateProject = useCallback(async (projectInput) => {
    setAiLoading(true);
    setError(null);
    try {
      const payload = {
        title: projectInput.title || `${projectInput.domain || 'AI'} Genesis Blueprint`,
        description:
          projectInput.description ||
          projectInput.prompt ||
          'Autonomous project concept synthesized from developer competencies and domain parameters.',
        prompt:
          projectInput.prompt && projectInput.prompt.length >= 10
            ? projectInput.prompt
            : `Design an enterprise-grade ${projectInput.domain || 'AI'} system architecture with structured constraints and deterministic validation.`,
        tags: projectInput.skills || projectInput.tags || [],
        author: projectInput.author || 'VentureMind Creator',
      };

      const res = await api.createProject(payload);
      setCurrentProject(res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setAiLoading(false);
    }
  }, []);

  const fetchMentors = useCallback(async () => {
    try {
      const res = await api.getMentors();
      setMentors(res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const consultMentor = useCallback(async (mentorId, projectId) => {
    setAiLoading(true);
    setError(null);
    try {
      const res = await api.getMentorFeedback(mentorId, projectId);
      setActiveMentorFeedback(res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setAiLoading(false);
    }
  }, []);

  const rescoreProject = useCallback(async (projectId, answers) => {
    setAiLoading(true);
    setError(null);
    try {
      const res = await api.scoreProject(projectId, answers);
      setCurrentProject((prev) => (prev && prev.id === projectId ? res.data : prev));
      return res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setAiLoading(false);
    }
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getLeaderboard();
      setLeaderboard(res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    currentProject,
    setCurrentProject,
    projects,
    mentors,
    activeMentorFeedback,
    leaderboard,
    loading,
    aiLoading,
    error,
    generateProject,
    fetchMentors,
    consultMentor,
    rescoreProject,
    fetchLeaderboard,
  };
}
