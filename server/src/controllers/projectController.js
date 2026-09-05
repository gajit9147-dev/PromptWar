const projectService = require('../services/projectService');

/**
 * Create / generate a VentureMind project.
 *
 * The endpoint now accepts a student profile and lets the
 * ProjectService handle:
 * profile normalization → AI candidates → selection →
 * blueprint → Project DNA.
 */
const createProject = async (req, res, next) => {
  try {
    const project = await projectService.generateProject(
      req.body
    );

    res.status(201).json({
      success: true,
      message:
        'VentureMind project generated successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Adapt the current project using an AI mentor action.
 */
const adaptProject = async (req, res, next) => {
  try {
    const { project, action } = req.body || {};

    if (!project || typeof project !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'A project is required for adaptation.',
      });
    }

    if (!action || typeof action !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'An adaptation action is required.',
      });
    }

    const adaptedProject =
      await projectService.adaptProject(
        project,
        action
      );

    res.status(200).json({
      success: true,
      message: 'Project adapted successfully',
      data: adaptedProject,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all generated projects.
 */
const getProjects = async (req, res, next) => {
  try {
    const {
      search,
      tag,
      sortBy,
    } = req.query;

    const projects =
      await projectService.getAllProjects({
        search,
        tag,
        sortBy,
      });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single project.
 */
const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project =
      await projectService.getProjectById(id);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Re-score a generated project.
 */
const scoreProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customCriteria = [] } = req.body || {};

    const project =
      await projectService.scoreProject(
        id,
        customCriteria
      );

    res.status(200).json({
      success: true,
      message:
        'Project scored successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get leaderboard.
 */
const getLeaderboard = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;

    const leaderboard =
      await projectService.getLeaderboard(limit);

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      data: leaderboard,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  adaptProject,
  getProjects,
  getProjectById,
  scoreProject,
  getLeaderboard,
};
