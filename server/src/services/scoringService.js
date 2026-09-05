const aiService = require('./aiService');

class ScoringService {
  /**
   * Determine badges based on scoring criteria
   */
  calculateBadges(scores, overallScore) {
    const badges = [];

    if (scores.promptEngineering >= 90) {
      badges.push({ name: 'Prompt Maestro', icon: '🪄', description: 'Exceptional prompt precision and structure' });
    }
    if (scores.innovation >= 90) {
      badges.push({ name: 'Trailblazer', icon: '🚀', description: 'Highly novel and creative concept' });
    }
    if (scores.feasibility >= 90) {
      badges.push({ name: 'Rock Solid', icon: '🛡️', description: 'Exceptionally practical and production-ready' });
    }
    if (scores.technicalDepth >= 90) {
      badges.push({ name: 'Deep Tech', icon: '⚙️', description: 'Advanced technical architecture and execution' });
    }
    if (overallScore >= 95) {
      badges.push({ name: 'Top Tier Finalist', icon: '🏆', description: 'Overall project score in top 5%' });
    }

    return badges;
  }

  /**
   * Calculate percentile relative to all existing project scores
   */
  calculatePercentile(currentScore, allScores = []) {
    if (!allScores || allScores.length <= 1) return 100;
    const belowCount = allScores.filter((s) => s < currentScore).length;
    return Math.round((belowCount / allScores.length) * 100);
  }

  /**
   * Complete evaluation process for a project
   */
  async scoreProjectSubmission(project, existingScores = [], customCriteria = []) {
    const evaluation = await aiService.evaluateProject(project, customCriteria);

    const badges = this.calculateBadges(evaluation.scores, evaluation.overallScore);
    const percentile = this.calculatePercentile(evaluation.overallScore, existingScores);

    return {
      evaluatedAt: new Date().toISOString(),
      scores: evaluation.scores,
      overallScore: evaluation.overallScore,
      percentile,
      verdict: evaluation.verdict,
      badges,
      strengths: evaluation.strengths,
      improvements: evaluation.improvements,
      promptCritique: evaluation.promptCritique,
      summary: evaluation.summary,
      evaluatedBy: evaluation.evaluatedBy || 'PromptWar AI Engine',
    };
  }
}

module.exports = new ScoringService();
