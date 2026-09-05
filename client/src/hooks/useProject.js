import { useState, useCallback } from 'react';
import { api } from '../services/api';

/**
 * VentureMind project + mentor orchestration.
 *
 * Keeps the UI independent from the AI implementation.
 * The frontend sends a student profile; the backend handles
 * candidate generation, selection, Project DNA and blueprint creation.
 */
export function useProject() {
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [activeMentorFeedback, setActiveMentorFeedback] =
    useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Generate a project from the student's profile.
   */
  const generateProject = useCallback(async (projectInput = {}) => {
    setAiLoading(true);
    setError(null);

    try {
      const payload = {
        skills: normalizeArray(projectInput.skills),
        interests: normalizeArray(
          projectInput.interests || projectInput.domains
        ),

        experience:
          projectInput.experience ||
          'Intermediate',

        domain:
          projectInput.domain ||
          normalizeArray(projectInput.interests)?.[0] ||
          'Technology',

        teamSize:
          projectInput.teamSize ||
          '1',

        timeline:
          projectInput.timeline ||
          '8 weeks',

        ambition:
          projectInput.ambition ||
          'Balanced',

        preferredTechnologies:
          normalizeArray(
            projectInput.preferredTechnologies ||
              projectInput.technologies
          ),
      };

      const res = await api.createProject(payload);

      // API normally returns { success, data }.
      const project = res?.data || res;

      if (!project || typeof project !== 'object') {
        throw new Error(
          'The AI returned an invalid project response.'
        );
      }

      setCurrentProject(project);

      return project;
    } catch (err) {
      const message =
        err?.message ||
        'Unable to generate your project right now.';

      setError(message);
      throw err;
    } finally {
      setAiLoading(false);
    }
  }, []);

  const adaptProject = useCallback(
    async (action) => {
      setAiLoading(true);
      setError(null);

      try {
        if (!currentProject) {
          throw new Error('Generate a project before adapting it.');
        }

        if (!action) {
          throw new Error('Please select an adaptation action.');
        }

        const res = await api.adaptProject({
          project: currentProject,
          action,
        });

        const adaptedProject = res?.data || res;

        if (
          !adaptedProject ||
          typeof adaptedProject !== 'object'
        ) {
          throw new Error(
            'The AI returned an invalid adapted project.'
          );
        }

        setCurrentProject(adaptedProject);
        setActiveMentorFeedback(null);

        return adaptedProject;
      } catch (err) {
        const message =
          err?.message ||
          'Unable to adapt the project right now.';

        setError(message);
        throw err;
      } finally {
        setAiLoading(false);
      }
    },
    [currentProject]
  );

  /**
   * Load available mentor personas.
   */
  const fetchMentors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.getMentors();
      const data = res?.data || res || [];

      setMentors(Array.isArray(data) ? data : []);

      return Array.isArray(data) ? data : [];
    } catch (err) {
      setError(
        err?.message ||
          'Unable to load mentors.'
      );

      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Ask a mentor for guidance on the current project.
   */
  const consultMentor = useCallback(
    async (mentorId, projectId) => {
      setAiLoading(true);
      setError(null);

      try {
        if (!mentorId) {
          throw new Error(
            'Please select a mentor first.'
          );
        }

        if (!projectId) {
          throw new Error(
            'A project is required before consulting a mentor.'
          );
        }

        const res = await api.getMentorFeedback(
          mentorId,
          projectId
        );

        const feedback = res?.data || res;

        setActiveMentorFeedback(feedback);

        return feedback;
      } catch (err) {
        setError(
          err?.message ||
            'Unable to get mentor guidance.'
        );

        throw err;
      } finally {
        setAiLoading(false);
      }
    },
    []
  );

  /**
   * Re-score the current project.
   */
  const rescoreProject = useCallback(
    async (projectId, answers = {}) => {
      setAiLoading(true);
      setError(null);

      try {
        if (!projectId) {
          throw new Error(
            'A project ID is required for scoring.'
          );
        }

        const res = await api.scoreProject(
          projectId,
          answers
        );

        const project = res?.data || res;

        setCurrentProject((previous) =>
          previous?.id === projectId
            ? project
            : previous
        );

        return project;
      } catch (err) {
        setError(
          err?.message ||
            'Unable to update the project score.'
        );

        throw err;
      } finally {
        setAiLoading(false);
      }
    },
    []
  );

  /**
   * Load leaderboard.
   */
  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.getLeaderboard();
      const data = res?.data || res || [];

      const safeLeaderboard = Array.isArray(data)
        ? data
        : [];

      setLeaderboard(safeLeaderboard);

      return safeLeaderboard;
    } catch (err) {
      setError(
        err?.message ||
          'Unable to load leaderboard.'
      );

      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear the current error.
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    currentProject,
    setCurrentProject,

    projects,
    setProjects,

    mentors,

    activeMentorFeedback,
    setActiveMentorFeedback,

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
    clearError,
  };
}

/**
 * Normalize comma-separated strings and arrays.
 */
function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean)
      .slice(0, 20);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 20);
  }

  return [];
}
