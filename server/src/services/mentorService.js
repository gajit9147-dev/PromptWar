const aiService = require('./aiService');
const projectService = require('./projectService');

class MentorService {
  constructor() {
    this.mentors = [
      {
        id: 'architect',
        name: 'Alex Vance',
        title: 'Principal Systems Architect',
        avatar: '🏗️',
        specialty: 'System scalability, modular design, caching & backend latency',
        description: 'Deep experience designing high-throughput LLM pipelines and fault-tolerant distributed architectures.',
      },
      {
        id: 'promptCraft',
        name: 'Elena Rostova',
        title: 'Chief Prompt Engineer',
        avatar: '🪄',
        specialty: 'Few-shot prompting, schema adherence, context compression & guardrails',
        description: 'Pioneers prompt optimization methodologies for high-accuracy reasoning models.',
      },
      {
        id: 'pitchCoach',
        name: 'Marcus Sterling',
        title: 'Hackathon Grandmaster & VC Partner',
        avatar: '🎙️',
        specialty: 'Demo velocity, narrative arcs, product positioning & judge hooks',
        description: 'Judged 50+ global hackathons and coached early-stage founders to winning demos.',
      },
      {
        id: 'codeReviewer',
        name: 'Sarah Chen',
        title: 'Staff Reliability Engineer',
        avatar: '🔍',
        specialty: 'Error boundaries, input sanitization, async timeouts & resilience',
        description: 'Ensures your prototype survives judge traffic spikes and unpredictable upstream LLM latencies.',
      },
    ];
  }

  /**
   * Return available mentor roster
   */
  getAvailableMentors() {
    return this.mentors;
  }

  /**
   * Request specific mentor guidance
   */
  async getGuidance({ projectId, mentorType = 'architect', question, context = {} }) {
    let projectContext = context;

    if (projectId) {
      try {
        const project = await projectService.getProjectById(projectId);
        projectContext = {
          ...context,
          projectTitle: project.title,
          projectDescription: project.description,
          projectPrompt: project.prompt,
          currentScores: project.scoreData?.scores,
        };
      } catch (err) {
        // Project ID optional or not found, proceed with direct context
        console.warn(`[MentorService] Project ${projectId} not found, using raw context.`);
      }
    }

    const advice = await aiService.getMentorAdvice(mentorType, question, projectContext);
    const mentorProfile = this.mentors.find((m) => m.id === mentorType) || this.mentors[0];

    return {
      mentorId: mentorProfile.id,
      mentorName: mentorProfile.name,
      mentor: mentorProfile,
      question,
      guidance: advice?.directAnswer || (advice?.actionableSteps ? advice.actionableSteps.join('\n• ') : JSON.stringify(advice)),
      response: advice,
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = new MentorService();
