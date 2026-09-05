const mentorService = require('../services/mentorService');

/**
 * List available mentor roster
 */
const getAvailableMentors = async (req, res, next) => {
  try {
    const mentors = mentorService.getAvailableMentors();
    res.status(200).json({
      success: true,
      count: mentors.length,
      data: mentors,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request mentor feedback on a project or prompt draft
 */
const getMentorFeedback = async (req, res, next) => {
  try {
    const { projectId, mentorType, question, context } = req.body;
    const guidance = await mentorService.getGuidance({
      projectId,
      mentorType: mentorType || 'architect',
      question,
      context,
    });

    res.status(200).json({
      success: true,
      message: 'Mentor feedback generated successfully',
      data: guidance,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Chat/Ask question directly to a specific mentor persona
 */
const askMentorQuestion = async (req, res, next) => {
  try {
    const { mentorType } = req.params;
    const { question, context, projectId } = req.body;

    const guidance = await mentorService.getGuidance({
      projectId,
      mentorType: mentorType || 'promptCraft',
      question,
      context,
    });

    res.status(200).json({
      success: true,
      data: guidance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAvailableMentors,
  getMentorFeedback,
  askMentorQuestion,
};
