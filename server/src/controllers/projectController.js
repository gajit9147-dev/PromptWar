const projectService = require('../services/projectService');

/**
 * Create a new project
 */
const createProject = async (req, res, next) => {
  try {
    const autoScore = req.query.autoScore !== 'false';
    const project = await projectService.createProject(req.body, autoScore);

    res.status(201).json({
      success: true,
      message: 'Project created and evaluated successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all projects with optional filtering
 */
const getProjects = async (req, res, next) => {
  try {
    const { search, tag, sortBy } = req.query;
    const projects = await projectService.getAllProjects({ search, tag, sortBy });

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
 * Get single project by ID
 */
const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Trigger scoring or re-evaluation of project
 */
const scoreProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customCriteria } = req.body;
    const project = await projectService.scoreProject(id, customCriteria);

    res.status(200).json({
      success: true,
      message: 'Project scored successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Leaderboard rankings
 */
const getLeaderboard = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const leaderboard = await projectService.getLeaderboard(limit);

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
  getProjects,
  getProjectById,
  scoreProject,
  getLeaderboard,
};
