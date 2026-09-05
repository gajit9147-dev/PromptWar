const crypto = require('crypto');

const aiService = require('./aiService');
const scoringService = require('./scoringService');
const { AppError } = require('../middleware/errorHandler');

class ProjectService {
  constructor() {
    this.projects = new Map();
    this.seedInitialProjects();
  }

  seedInitialProjects() {
    const sampleProjects = [
      {
        id: 'proj_sample_01',
        title: 'QueryCraft: Natural Language to SQL Agent',
        tagline: 'Translates complex ambiguous business queries into verified ANSI SQL.',
        description: 'An autonomous agent that ingests schema definitions and translates natural language inquiries into zero-defect SQL with explainability trees.',
        problem: 'Data analysts and business stakeholders spend hours constructing queries across fragmented relational schemas.',
        solution: 'An AI-powered AST query engine that decomposes natural language and validates output against schema constraints.',
        whyThisProject: 'High industry applicability with strong demonstration of engineering rigor.',
        domain: 'Data Engineering & AI',
        difficulty: 'Advanced',
        features: ['Natural language AST translation', 'Schema-aware integrity checks', 'Execution explainability tree', 'Dialect optimization'],
        techStack: ['React', 'Node.js', 'PostgreSQL', 'LLM Engine'],
        tags: ['SQL', 'AI Agent', 'Data Engineering'],
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        scoreData: {
          evaluatedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
          scores: { promptEngineering: 92, innovation: 85, feasibility: 94, technicalDepth: 90, clarity: 95 },
          overallScore: 91,
          percentile: 90,
          verdict: 'Outstanding',
          badges: [{ name: 'Build Ready', icon: '🚀', description: 'Excellent overall project fit.' }],
        },
      },
      {
        id: 'proj_sample_02',
        title: 'MedScribe: Clinical Diagnostic Summarizer',
        tagline: 'Converts patient-clinician conversations into structured SOAP notes.',
        description: 'Summarizes doctor-patient conversations into structured EHR notes conforming to SOAP standards with medical ontology verification.',
        problem: 'Clinicians spend over 3 hours daily on manual EHR documentation, causing diagnostic fatigue.',
        solution: 'A real-time ambient transcription and clinical entity extraction pipeline adhering to SOAP guidelines.',
        whyThisProject: 'Solves a critical healthcare efficiency problem with clear guardrails.',
        domain: 'Healthcare & NLP',
        difficulty: 'Advanced',
        features: ['Ambient speech-to-text', 'SOAP note synthesis', 'Medical ontology validation', 'Doctor confirmation workflow'],
        techStack: ['Next.js', 'FastAPI', 'PyTorch', 'Vector Search'],
        tags: ['Healthcare', 'NLP', 'Clinical'],
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        scoreData: {
          evaluatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
          scores: { promptEngineering: 95, innovation: 89, feasibility: 91, technicalDepth: 93, clarity: 94 },
          overallScore: 93,
          percentile: 95,
          verdict: 'Outstanding',
          badges: [{ name: 'Build Ready', icon: '🚀', description: 'Excellent overall project fit.' }],
        },
      },
    ];

    sampleProjects.forEach((p) => this.projects.set(p.id, p));
  }

  /**
   * Alias for backward compatibility with createProject
   */
  async createProject(projectData, autoScore = true) {
    return this.generateProject(projectData);
  }

  /**
   * Generate a VentureMind project from a student profile.
   *
   * Flow:
   * Student Profile
   *      ↓
   * Candidate Ideas
   *      ↓
   * AI Evaluation
   *      ↓
   * Best Project
   *      ↓
   * Project DNA
   *      ↓
   * Practical Blueprint
   */
  async generateProject(profile) {
    const normalizedProfile = this.normalizeProfile(profile);

    const systemPrompt = this.buildGenerationSystemPrompt();

    const userPrompt = JSON.stringify({
      studentProfile: normalizedProfile,
      task: 'Generate the best final-year project for this student.',
    });

    const aiResult = await aiService.generateResponse(
      systemPrompt,
      userPrompt,
      true
    );

    let project;

    if (aiResult && this.isValidGeneratedProject(aiResult)) {
      project = this.normalizeGeneratedProject(
        aiResult,
        normalizedProfile
      );
    } else {
      project = this.generateFallbackProject(
        normalizedProfile
      );
    }

    // Keep scoring deterministic and separated from the LLM.
    project.scoreData = this.calculateProjectDNA(
      project,
      normalizedProfile
    );

    project.id = `proj_${crypto
      .randomBytes(6)
      .toString('hex')}`;

    project.createdAt = new Date().toISOString();

    project.profileSnapshot = normalizedProfile;

    this.projects.set(project.id, project);

    return project;
  }

  /**
   * Adapt an existing project.
   *
   * Supported actions:
   * - innovative
   * - simplify
   * - timeline
   * - add-ai
   * - industry-ready
   */
  async adaptProject(projectInput, action) {
    if (!projectInput || typeof projectInput !== 'object') {
      throw new AppError(
        'A valid project is required for adaptation.',
        400
      );
    }

    const normalizedAction = String(action || '')
      .trim()
      .toLowerCase();

    const allowedActions = [
      'innovative',
      'simplify',
      'timeline',
      'add-ai',
      'industry-ready',
    ];

    if (!allowedActions.includes(normalizedAction)) {
      throw new AppError(
        `Unsupported mentor action. Allowed actions: ${allowedActions.join(
          ', '
        )}`,
        400
      );
    }

    const systemPrompt = `
You are VentureMind Adaptive Mentor.

Your task is to improve an existing final-year project
without destroying its original purpose.

Action requested:
"${normalizedAction}"

Rules:

1. Preserve the project's core problem unless the action requires
   a scope adjustment.
2. Do not add complexity just to make the idea sound impressive.
3. Keep the project realistic for a final-year student.
4. Explain meaningful changes.
5. Respect the student's original skills and timeline whenever supplied.
6. Prefer measurable improvements.
7. Avoid generic filler.
8. Return ONLY valid JSON.
9. Never expose hidden reasoning.

Return:

{
  "project": {
    "title": "",
    "tagline": "",
    "problem": "",
    "solution": "",
    "whyThisProject": "",
    "innovation": "",
    "features": [],
    "techStack": [],
    "architecture": [],
    "roadmap": [],
    "risks": [],
    "futureImprovements": [],
    "vivaQuestions": []
  },
  "changeSummary": [],
  "mentorVerdict": ""
}
`;

    const userPrompt = JSON.stringify({
      action: normalizedAction,
      project: this.sanitizeProjectForAI(projectInput),
    });

    const aiResult = await aiService.generateResponse(
      systemPrompt,
      userPrompt,
      true
    );

    let adapted;

    if (
      aiResult &&
      aiResult.project &&
      typeof aiResult.project === 'object'
    ) {
      adapted = {
        ...this.normalizeGeneratedProject(
          aiResult,
          projectInput.profileSnapshot || {}
        ),
        id: projectInput.id,
        createdAt: projectInput.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        previousVersion: projectInput.id || null,
        changeSummary: Array.isArray(aiResult.changeSummary)
          ? aiResult.changeSummary.slice(0, 8)
          : [],
        mentorVerdict:
          aiResult.mentorVerdict ||
          'Project adapted successfully.',
      };
    } else {
      adapted = this.applyDeterministicAdaptation(
        projectInput,
        normalizedAction
      );
    }

    adapted.scoreData = this.calculateProjectDNA(
      adapted,
      projectInput.profileSnapshot || {}
    );

    if (adapted.id) {
      this.projects.set(adapted.id, adapted);
    }

    return adapted;
  }

  /**
   * Retrieve a generated project.
   */
  async getProjectById(id) {
    const project = this.projects.get(id);

    if (!project) {
      throw new AppError(
        `Project with ID "${id}" not found`,
        404
      );
    }

    return project;
  }

  /**
   * List generated projects.
   */
  async getAllProjects({
    search,
    tag,
    sortBy = 'newest',
  } = {}) {
    let list = Array.from(this.projects.values());

    if (tag) {
      const normalizedTag = String(tag)
        .trim()
        .toLowerCase();

      list = list.filter((project) =>
        Array.isArray(project.tags)
          ? project.tags.some(
              (item) =>
                String(item).toLowerCase() ===
                normalizedTag
            )
          : false
      );
    }

    if (search) {
      const query = String(search)
        .trim()
        .toLowerCase();

      list = list.filter((project) => {
        const searchable = [
          project.title,
          project.tagline,
          project.problem,
          project.solution,
          ...(Array.isArray(project.tags)
            ? project.tags
            : []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchable.includes(query);
      });
    }

    if (sortBy === 'score') {
      list.sort(
        (a, b) =>
          (b.scoreData?.overallScore || 0) -
          (a.scoreData?.overallScore || 0)
      );
    } else if (sortBy === 'oldest') {
      list.sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      );
    } else {
      list.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    return list;
  }

  /**
   * Refresh Project DNA.
   */
  async scoreProject(id, customCriteria = []) {
    const project = await this.getProjectById(id);

    const existingScores = Array.from(
      this.projects.values()
    )
      .filter((item) => item.id !== id)
      .map(
        (item) => item.scoreData?.overallScore
      )
      .filter((value) => Number.isFinite(value));

    const scoreData =
      await scoringService.scoreProjectSubmission(
        project,
        existingScores,
        customCriteria
      );

    project.scoreData = scoreData;

    this.projects.set(project.id, project);

    return project;
  }

  /**
   * Leaderboard.
   */
  async getLeaderboard(limit = 10) {
    const parsedLimit = Math.min(
      50,
      Math.max(1, Number(limit) || 10)
    );

    return Array.from(this.projects.values())
      .filter(
        (project) =>
          project.scoreData &&
          Number.isFinite(
            project.scoreData.overallScore
          )
      )
      .sort(
        (a, b) =>
          (b.scoreData?.overallScore || 0) -
          (a.scoreData?.overallScore || 0)
      )
      .slice(0, parsedLimit)
      .map((project, index) => ({
        rank: index + 1,
        id: project.id,
        title: project.title,
        tags: project.tags,
        overallScore:
          project.scoreData.overallScore,
        verdict: project.scoreData.verdict,
        badges: project.scoreData.badges || [],
        evaluatedAt:
          project.scoreData.evaluatedAt,
      }));
  }

  /**
   * ========================================================
   * PROFILE NORMALIZATION
   * ========================================================
   */
  normalizeProfile(profile = {}) {
    const normalizeArray = (value) => {
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
    };

    return {
      skills: normalizeArray(profile.skills),
      interests: normalizeArray(profile.interests),
      experience: String(
        profile.experience || 'Intermediate'
      ).slice(0, 50),
      domain: String(
        profile.domain ||
          normalizeArray(profile.interests)[0] ||
          'Technology'
      ).slice(0, 100),
      teamSize: String(
        profile.teamSize || '1'
      ).slice(0, 20),
      timeline: String(
        profile.timeline || '8 weeks'
      ).slice(0, 40),
      ambition: String(
        profile.ambition || 'Balanced'
      ).slice(0, 60),
      preferredTechnologies: normalizeArray(
        profile.preferredTechnologies ||
          profile.technologies
      ),
    };
  }

  /**
   * ========================================================
   * AI GENERATION PROMPT
   * ========================================================
   */
  buildGenerationSystemPrompt() {
    return `
You are VentureMind, an expert final-year project
architect, product strategist, AI mentor and technical evaluator.

Your mission is NOT simply to generate an interesting project.

Your mission is to identify the project that this particular
student can realistically build, demonstrate, explain, defend
in a viva, and potentially showcase in a portfolio.

Think across these dimensions:

- student skill alignment
- interest alignment
- realistic implementation scope
- timeline fit
- innovation
- technical depth
- real-world usefulness
- portfolio value
- demo potential

IMPORTANT:

A generic CRUD application should score poorly unless there is
a meaningful differentiating mechanism.

Do not add AI merely as a buzzword.

Prefer:
- one clear user problem
- one strong differentiator
- measurable value
- realistic architecture
- manageable scope
- clear milestones

Candidate selection process:

1. Internally create 3 distinct candidate concepts.
2. Compare them against the student's profile.
3. Select the strongest one.
4. Build the selected project into a practical blueprint.

Do not reveal private chain-of-thought.

Return ONLY JSON.

Required response:

{
  "candidates": [
    {
      "title": "",
      "oneLineValue": "",
      "reason": ""
    },
    {
      "title": "",
      "oneLineValue": "",
      "reason": ""
    },
    {
      "title": "",
      "oneLineValue": "",
      "reason": ""
    }
  ],

  "selection": {
    "selectedTitle": "",
    "selectionReason": ""
  },

  "project": {
    "title": "",
    "tagline": "",
    "domain": "",
    "difficulty": "",
    "summary": "",
    "problem": "",
    "solution": "",
    "whyThisProject": "",
    "innovation": "",
    "features": [],
    "techStack": [],
    "architecture": [],
    "roadmap": [],
    "risks": [],
    "futureImprovements": [],
    "vivaQuestions": []
  },

  "dna": {
    "innovation": 0,
    "skillMatch": 0,
    "feasibility": 0,
    "timeFit": 0,
    "portfolioValue": 0,
    "interestMatch": 0
  },

  "mentorVerdict": ""
}

Scoring guidance:

innovation:
Originality and useful differentiation.

skillMatch:
How closely the project matches the student's existing capabilities.

feasibility:
Whether the student can realistically build it with the stated
time, team size and experience.

timeFit:
How well the implementation scope matches the student's timeline.

portfolioValue:
How strong the project is as a demonstrable portfolio piece.

interestMatch:
How closely it aligns with stated interests.

Use realistic scores.
Do not give every project 90+.

Roadmap should contain practical phases with:
- phase
- title
- duration
- tasks

Architecture should describe meaningful components rather than
generic buzzwords.

Risks should describe actual implementation risks and mitigations.

Viva questions should test understanding of the project,
architecture, AI decisions, tradeoffs and security.
`;
  }

  /**
   * ========================================================
   * RESPONSE VALIDATION
   * ========================================================
   */
  isValidGeneratedProject(result) {
    const project = result?.project;

    if (!project || typeof project !== 'object') {
      return false;
    }

    if (
      typeof project.title !== 'string' ||
      project.title.trim().length < 3
    ) {
      return false;
    }

    if (
      typeof project.problem !== 'string' ||
      project.problem.trim().length < 10
    ) {
      return false;
    }

    if (
      typeof project.solution !== 'string' ||
      project.solution.trim().length < 10
    ) {
      return false;
    }

    return true;
  }

  /**
   * ========================================================
   * GENERATED PROJECT NORMALIZATION
   * ========================================================
   */
  normalizeGeneratedProject(result, profile) {
    const raw = result.project || {};

    const arrayOrEmpty = (value) =>
      Array.isArray(value)
        ? value
            .map((item) => {
              if (
                typeof item === 'string'
              ) {
                return item.trim();
              }

              if (
                item &&
                typeof item === 'object'
              ) {
                return {
                  ...item,
                };
              }

              return null;
            })
            .filter(Boolean)
            .slice(0, 20)
        : [];

    return {
      title: safeText(
        raw.title,
        'Untitled VentureMind Project'
      ),
      tagline: safeText(
        raw.tagline,
        'A practical final-year project.'
      ),
      domain: safeText(
        raw.domain,
        profile.domain
      ),
      difficulty: safeText(
        raw.difficulty,
        'Intermediate'
      ),
      summary: safeText(
        raw.summary,
        raw.solution
      ),
      problem: safeText(
        raw.problem,
        'A real-world problem requiring a practical solution.'
      ),
      solution: safeText(
        raw.solution,
        'A technology-driven solution designed for the target users.'
      ),
      whyThisProject: safeText(
        raw.whyThisProject,
        'This project aligns with the student profile and available timeline.'
      ),
      innovation: safeText(
        raw.innovation,
        'Focused differentiation with measurable user value.'
      ),
      features: arrayOrEmpty(raw.features),
      techStack: arrayOrEmpty(raw.techStack),
      architecture: arrayOrEmpty(raw.architecture),
      roadmap: arrayOrEmpty(raw.roadmap),
      risks: arrayOrEmpty(raw.risks),
      futureImprovements: arrayOrEmpty(
        raw.futureImprovements
      ),
      vivaQuestions: arrayOrEmpty(
        raw.vivaQuestions
      ),
      tags: [
        ...profile.interests,
        ...profile.skills,
      ]
        .slice(0, 10),
      candidates: Array.isArray(result.candidates)
        ? result.candidates.slice(0, 3)
        : [],
      selection: result.selection || null,
      mentorVerdict: safeText(
        result.mentorVerdict,
        'This project is a strong starting point.'
      ),
    };
  }

  /**
   * ========================================================
   * PROJECT DNA
   * ========================================================
   */
  calculateProjectDNA(project, profile) {
    const aiDna = project?.dna;

    if (aiDna && typeof aiDna === 'object') {
      const scores = {
        innovation: clampScore(
          aiDna.innovation,
          0,
          100
        ),
        skillMatch: clampScore(
          aiDna.skillMatch,
          0,
          100
        ),
        feasibility: clampScore(
          aiDna.feasibility,
          0,
          100
        ),
        timeFit: clampScore(
          aiDna.timeFit,
          0,
          100
        ),
        portfolioValue: clampScore(
          aiDna.portfolioValue,
          0,
          100
        ),
        interestMatch: clampScore(
          aiDna.interestMatch,
          0,
          100
        ),
      };

      const overall = Math.round(
        scores.innovation * 0.2 +
          scores.skillMatch * 0.2 +
          scores.feasibility * 0.2 +
          scores.timeFit * 0.15 +
          scores.portfolioValue * 0.15 +
          scores.interestMatch * 0.1
      );

      return {
        scores,
        overallScore: overall,
        verdict: getVerdict(overall),
        badges: buildBadges(scores, overall),
        evaluatedAt:
          new Date().toISOString(),
        evaluatedBy: 'VentureMind Intelligence Engine',
      };
    }

    return this.calculateFallbackDNA(
      project,
      profile
    );
  }

  /**
   * Deterministic fallback DNA.
   */
  calculateFallbackDNA(project, profile) {
    const text = [
      project.title,
      project.problem,
      project.solution,
      project.innovation,
      project.summary,
      ...(Array.isArray(project.features)
        ? project.features.map(String)
        : []),
      ...(Array.isArray(project.techStack)
        ? project.techStack.map(String)
        : []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const skills = Array.isArray(profile.skills)
      ? profile.skills
      : [];

    const interests = Array.isArray(
      profile.interests
    )
      ? profile.interests
      : [];

    const skillHits = skills.filter((skill) =>
      text.includes(String(skill).toLowerCase())
    ).length;

    const interestHits = interests.filter(
      (interest) =>
        text.includes(
          String(interest).toLowerCase()
        )
    ).length;

    const innovationSignals = [
      'ai',
      'ml',
      'adaptive',
      'predict',
      'personalized',
      'intelligent',
      'automation',
      'optimization',
      'agent',
      'recommend',
    ];

    const technicalSignals = [
      'api',
      'database',
      'architecture',
      'model',
      'pipeline',
      'authentication',
      'security',
      'cloud',
      'vector',
    ];

    const innovationHits =
      innovationSignals.filter((word) =>
        text.includes(word)
      ).length;

    const technicalHits =
      technicalSignals.filter((word) =>
        text.includes(word)
      ).length;

    const featureCount = Array.isArray(
      project.features
    )
      ? project.features.length
      : 0;

    const roadmapCount = Array.isArray(
      project.roadmap
    )
      ? project.roadmap.length
      : 0;

    const innovation = clampScore(
      68 + innovationHits * 4,
      55,
      96
    );

    const skillMatch = clampScore(
      70 + skillHits * 7,
      55,
      96
    );

    const feasibility = clampScore(
      90 -
        Math.max(featureCount - 8, 0) * 3 -
        Math.max(roadmapCount - 8, 0) * 2,
      55,
      96
    );

    const timeFit = calculateTimeFit(
      featureCount,
      profile.timeline
    );

    const portfolioValue = clampScore(
      72 +
        innovationHits * 2 +
        technicalHits * 2 +
        (featureCount >= 4 ? 4 : 0),
      60,
      96
    );

    const interestMatch = clampScore(
      72 + interestHits * 8,
      55,
      98
    );

    const scores = {
      innovation,
      skillMatch,
      feasibility,
      timeFit,
      portfolioValue,
      interestMatch,
    };

    const overall = Math.round(
      innovation * 0.2 +
        skillMatch * 0.2 +
        feasibility * 0.2 +
        timeFit * 0.15 +
        portfolioValue * 0.15 +
        interestMatch * 0.1
    );

    return {
      scores,
      overallScore: overall,
      verdict: getVerdict(overall),
      badges: buildBadges(scores, overall),
      evaluatedAt:
        new Date().toISOString(),
      evaluatedBy:
        'VentureMind Deterministic Intelligence Engine',
    };
  }

  /**
   * ========================================================
   * FALLBACK PROJECT
   * ========================================================
   */
  generateFallbackProject(profile) {
    const primaryInterest =
      profile.interests[0] || 'Education';

    const primarySkill =
      profile.skills[0] || 'JavaScript';

    const title =
      `${primaryInterest} InsightHub`;

    return {
      title,
      tagline:
        `An intelligent ${primaryInterest.toLowerCase()} platform built around your ${primarySkill} skills.`,

      domain: profile.domain,

      difficulty:
        profile.ambition ===
        'Innovative & Challenging'
          ? 'Advanced'
          : 'Intermediate',

      summary:
        `A practical ${primaryInterest.toLowerCase()} platform that combines your existing skills with an adaptive intelligence layer.`,

      problem:
        `Students and users in the ${primaryInterest.toLowerCase()} domain often lack a focused digital workflow that turns fragmented information into useful, actionable decisions.`,

      solution:
        `Build a focused web platform that collects user inputs, analyzes patterns using an AI-assisted workflow, and produces personalized recommendations with explainable next steps.`,

      whyThisProject:
        `The concept aligns with your ${primaryInterest} interest and gives you room to demonstrate ${profile.skills.join(
          ', '
        ) || primarySkill} without requiring an unrealistic enterprise-scale system.`,

      innovation:
        'The differentiator is the adaptive recommendation layer: the system changes its guidance based on user context instead of returning static results.',

      features: [
        'Personalized user onboarding',
        'Intelligent recommendation workflow',
        'Explainable recommendations',
        'Progress and outcome tracking',
        'Adaptive improvement suggestions',
      ],

      techStack: [
        primarySkill,
        'Node.js',
        'REST API',
        'Database',
        'LLM / AI service',
      ],

      architecture: [
        'React client for guided user interaction',
        'Node.js API for business logic',
        'Validation and security middleware',
        'AI service abstraction',
        'Deterministic scoring engine',
        'Persistent data layer when required',
      ],

      roadmap: [
        {
          phase: 1,
          title: 'Foundation',
          duration: 'Week 1',
          tasks: [
            'Define user flow',
            'Create application skeleton',
            'Implement secure API foundation',
          ],
        },
        {
          phase: 2,
          title: 'Core Product',
          duration: 'Weeks 2-3',
          tasks: [
            'Build onboarding',
            'Implement core workflow',
            'Connect AI service',
          ],
        },
        {
          phase: 3,
          title: 'Intelligence Layer',
          duration: 'Weeks 4-5',
          tasks: [
            'Add scoring',
            'Add adaptive recommendations',
            'Implement feedback loop',
          ],
        },
        {
          phase: 4,
          title: 'Validation & Launch',
          duration: 'Week 6',
          tasks: [
            'Security testing',
            'UX refinement',
            'Production deployment',
          ],
        },
      ],

      risks: [
        'AI output may be inconsistent without structured validation.',
        "Feature scope may grow beyond the student's timeline.",
        'External AI availability may affect generation latency.',
      ],

      futureImprovements: [
        'Personalized historical recommendations',
        'Project progress intelligence',
        'More advanced domain-specific models',
        'Benchmarking against completed projects',
      ],

      vivaQuestions: [
        'Why did you choose this architecture?',
        'How do you validate AI-generated output?',
        'How do you protect the AI API key?',
        'How is project feasibility calculated?',
        'What happens when the AI service is unavailable?',
      ],

      tags: [
        ...profile.interests.slice(0, 5),
        ...profile.skills.slice(0, 5),
      ],
    };
  }

  /**
   * ========================================================
   * ADAPTATION FALLBACK
   * ========================================================
   */
  applyDeterministicAdaptation(project, action) {
    const adapted = JSON.parse(
      JSON.stringify(project)
    );

    adapted.updatedAt =
      new Date().toISOString();

    const features = Array.isArray(
      adapted.features
    )
      ? adapted.features
      : [];

    if (action === 'simplify') {
      adapted.features = features.slice(0, 4);

      adapted.roadmap = Array.isArray(
        adapted.roadmap
      )
        ? adapted.roadmap.slice(0, 4)
        : [];

      adapted.changeSummary = [
        'Reduced feature scope.',
        'Removed lower-priority roadmap work.',
        'Focused implementation on the core user outcome.',
      ];

      adapted.mentorVerdict =
        'The project has been reduced to a more achievable MVP.';
    }

    if (action === 'innovative') {
      adapted.innovation =
        `${adapted.innovation || ''} Add an adaptive intelligence layer that learns from user feedback and changes recommendations based on observed outcomes.`;

      adapted.features = [
        ...features,
        'Adaptive recommendation feedback loop',
        'Explainable decision insights',
      ];

      adapted.changeSummary = [
        'Added a stronger differentiation mechanism.',
        'Introduced adaptive feedback.',
      ];

      adapted.mentorVerdict =
        'The project now has a stronger innovation story without changing its core purpose.';
    }

    if (action === 'add-ai') {
      adapted.features = [
        ...features,
        'AI-assisted personalization',
        'Natural-language guidance',
      ];

      adapted.changeSummary = [
        'Added a focused AI assistance layer.',
        'Kept the original product workflow intact.',
      ];

      adapted.mentorVerdict =
        'AI has been introduced where it adds measurable user value.';
    }

    if (action === 'industry-ready') {
      adapted.features = [
        ...features,
        'Role-based access control',
        'Audit-friendly activity tracking',
        'Production monitoring hooks',
      ];

      adapted.risks = [
        ...(Array.isArray(adapted.risks)
          ? adapted.risks
          : []),
        'Production environments require observability and access controls.',
      ];

      adapted.changeSummary = [
        'Added production-oriented concerns.',
        'Strengthened operational readiness.',
      ];

      adapted.mentorVerdict =
        'The project now has a stronger path from academic prototype to production-ready application.';
    }

    if (action === 'timeline') {
      adapted.features = features.slice(0, 5);

      adapted.changeSummary = [
        'Reduced non-essential scope.',
        'Prioritized the core demonstration path.',
      ];

      adapted.mentorVerdict =
        'The scope is optimized around completing a reliable core experience first.';
    }

    return adapted;
  }

  /**
   * Remove unnecessary data before sending a project
   * back into the AI model.
   */
  sanitizeProjectForAI(project) {
    return {
      title: safeText(project.title, ''),
      tagline: safeText(project.tagline, ''),
      domain: safeText(project.domain, ''),
      difficulty: safeText(project.difficulty, ''),
      summary: safeText(project.summary, ''),
      problem: safeText(project.problem, ''),
      solution: safeText(project.solution, ''),
      whyThisProject: safeText(
        project.whyThisProject,
        ''
      ),
      innovation: safeText(
        project.innovation,
        ''
      ),
      features: limitArray(
        project.features,
        12
      ),
      techStack: limitArray(
        project.techStack,
        12
      ),
      architecture: limitArray(
        project.architecture,
        12
      ),
      roadmap: limitArray(
        project.roadmap,
        10
      ),
      risks: limitArray(
        project.risks,
        10
      ),
      futureImprovements: limitArray(
        project.futureImprovements,
        10
      ),
      profileSnapshot:
        project.profileSnapshot || {},
    };
  }
}

/**
 * Helpers
 */

function safeText(value, fallback = '') {
  if (
    typeof value === 'string' &&
    value.trim()
  ) {
    return value.trim().slice(0, 5000);
  }

  return fallback;
}

function limitArray(value, max) {
  if (!Array.isArray(value)) return [];

  return value.slice(0, max);
}

function clampScore(value, min, max) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return min;
  }

  return Math.min(
    max,
    Math.max(min, Math.round(number))
  );
}

function getVerdict(score) {
  if (score >= 90) return 'Exceptional';
  if (score >= 80) return 'Strong';
  if (score >= 70) return 'Promising';
  return 'Needs Refinement';
}

function buildBadges(scores, overall) {
  const badges = [];

  if (overall >= 90) {
    badges.push({
      name: 'Build Ready',
      icon: '🚀',
      description:
        'Excellent overall project fit.',
    });
  }

  if (scores.innovation >= 90) {
    badges.push({
      name: 'Differentiator',
      icon: '✦',
      description:
        'Strong innovation potential.',
    });
  }

  if (scores.skillMatch >= 90) {
    badges.push({
      name: 'Skill Aligned',
      icon: '🎯',
      description:
        'Excellent match with the student profile.',
    });
  }

  if (scores.feasibility >= 90) {
    badges.push({
      name: 'Practical Build',
      icon: '🛡️',
      description:
        'Highly realistic implementation scope.',
    });
  }

  return badges;
}

function calculateTimeFit(
  featureCount,
  timeline = '8 weeks'
) {
  const weeks = Number(
    String(timeline).match(/\d+/)?.[0] || 8
  );

  const expectedFeatures =
    Math.max(3, Math.round(weeks * 0.8));

  const difference =
    Math.abs(
      featureCount - expectedFeatures
    );

  return clampScore(
    94 - difference * 5,
    55,
    96
  );
}

module.exports = new ProjectService();
