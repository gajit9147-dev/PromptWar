const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.genAI = this.apiKey
      ? new GoogleGenerativeAI(this.apiKey)
      : null;

    this.modelName =
      process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  }

  /**
   * Check whether Gemini is configured correctly.
   */
  isConfigured() {
    return Boolean(
      this.apiKey &&
      this.apiKey.trim() !== '' &&
      this.apiKey !== 'your_gemini_api_key_here'
    );
  }

  /**
   * Safely parse JSON returned by the model.
   */
  parseJSON(text) {
    if (!text || typeof text !== 'string') {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch (_) {
      // Try extracting a JSON object if the model wrapped it in text.
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');

      if (start !== -1 && end > start) {
        try {
          return JSON.parse(text.slice(start, end + 1));
        } catch (_) {
          return null;
        }
      }

      return null;
    }
  }

  /**
   * General Gemini generator.
   *
   * The service intentionally returns null on AI failure so
   * callers can use deterministic fallback logic.
   */
  async generateResponse(systemPrompt, userPrompt, jsonMode = true) {
    if (!this.isConfigured()) {
      return null;
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        generationConfig: jsonMode
          ? {
              responseMimeType: 'application/json',
              temperature: 0.25,
            }
          : {
              temperature: 0.5,
            },
      });

      const prompt = [
        systemPrompt,
        '',
        '=== USER DATA ===',
        userPrompt,
        '',
        '=== END USER DATA ===',
      ].join('\n');

      const result = await model.generateContent(prompt);
      const text = result?.response?.text?.() || '';

      if (!jsonMode) {
        return text;
      }

      return this.parseJSON(text);
    } catch (error) {
      console.warn(
        `[AIService] Gemini request failed: ${error.message}`
      );

      return null;
    }
  }

  /**
   * Evaluate project quality.
   *
   * Designed around the PromptWar judging criteria:
   * innovation, prompt quality, feasibility, technical depth,
   * clarity and practical value.
   */
  async evaluateProject(projectData, customCriteria = []) {
    const systemPrompt = `
You are VentureMind's senior AI project evaluator and hackathon judge.

Your job is to evaluate a final-year student project as if it were being
reviewed by a demanding technical hackathon jury.

Evaluate FIVE dimensions independently:

1. promptEngineering
   - clarity
   - specificity
   - constraints
   - structured output requirements
   - ability to reduce ambiguity

2. innovation
   - originality
   - meaningful differentiation
   - intelligent use of AI
   - whether the idea goes beyond a generic CRUD application

3. feasibility
   - realistic for a final-year student
   - reasonable implementation scope
   - achievable with available technologies
   - avoids unnecessary enterprise complexity

4. technicalDepth
   - architecture
   - meaningful engineering challenges
   - APIs/data/AI/system design
   - opportunities to demonstrate engineering skill

5. clarity
   - clearly defined problem
   - understandable solution
   - coherent user value
   - easy to explain in a demo or viva

IMPORTANT EVALUATION RULES:

- Do NOT reward complexity for its own sake.
- Do NOT assume that adding AI automatically makes a project innovative.
- Penalize vague ideas and generic clones.
- Reward focused projects with one strong differentiating mechanism.
- A project should be ambitious but realistically buildable.
- Prefer measurable outcomes over buzzwords.
- Consider the student's likely academic context.
- Never invent technologies that are not mentioned.
- Do not expose chain-of-thought or hidden reasoning.
- Give concise judge-facing explanations.

Return ONLY valid JSON matching this exact structure:

{
  "scores": {
    "promptEngineering": 0,
    "innovation": 0,
    "feasibility": 0,
    "technicalDepth": 0,
    "clarity": 0
  },
  "overallScore": 0,
  "verdict": "Outstanding",
  "strengths": [],
  "improvements": [],
  "promptCritique": {
    "clarityRating": 0,
    "constraintEffectiveness": 0,
    "refinedPromptSuggestion": ""
  },
  "summary": ""
}

Score every numeric field within its requested range.
Keep strengths and improvements concrete.
`;

    const userPrompt = JSON.stringify({
      project: {
        title: projectData?.title || '',
        description: projectData?.description || '',
        prompt: projectData?.prompt || '',
        tags: Array.isArray(projectData?.tags)
          ? projectData.tags
          : [],
      },
      customCriteria: Array.isArray(customCriteria)
        ? customCriteria
        : [],
    });

    const aiResult = await this.generateResponse(
      systemPrompt,
      userPrompt,
      true
    );

    if (aiResult && this.isValidEvaluation(aiResult)) {
      return aiResult;
    }

    return this.generateHeuristicProjectScore(projectData);
  }

  /**
   * Validate evaluator output before returning it to the API.
   */
  isValidEvaluation(result) {
    if (!result || typeof result !== 'object') {
      return false;
    }

    const scores = result.scores;

    if (!scores || typeof scores !== 'object') {
      return false;
    }

    const requiredScores = [
      'promptEngineering',
      'innovation',
      'feasibility',
      'technicalDepth',
      'clarity',
    ];

    return requiredScores.every((key) => {
      const value = Number(scores[key]);
      return Number.isFinite(value) && value >= 1 && value <= 100;
    });
  }

  /**
   * Generate tailored mentor guidance.
   */
  async getMentorAdvice(
    mentorType,
    question,
    projectContext
  ) {
    const mentorPersonas = {
      architect:
        'You are an Elite Systems Architect specializing in scalable AI platforms, modular architecture, APIs, databases, and production infrastructure.',

      promptCraft:
        'You are a World-Class Prompt Engineer specializing in structured prompting, context engineering, constraints, evaluation, guardrails, and reliable LLM output.',

      pitchCoach:
        'You are a Silicon Valley Hackathon Pitch Coach specializing in memorable demos, judge psychology, value propositions, storytelling, and technical differentiation.',

      codeReviewer:
        'You are a Senior Staff Engineer specializing in clean architecture, security, reliability, validation, testing, observability, and production readiness.',
    };

    const persona =
      mentorPersonas[mentorType] ||
      mentorPersonas.architect;

    const systemPrompt = `
${persona}

You are mentoring a final-year student building a project with VentureMind.

Your advice must be:

- practical
- specific to the supplied project
- achievable by a student
- technically credible
- concise
- focused on the next useful action

Avoid generic motivational advice.

When suggesting improvements, prioritize:
1. impact
2. feasibility
3. technical quality
4. differentiation
5. demo value

Never recommend unsafe, illegal, deceptive, or harmful functionality.

Do not expose chain-of-thought.

Return ONLY valid JSON:

{
  "mentorType": "${mentorType}",
  "mentorTitle": "",
  "directAnswer": "",
  "actionableSteps": [
    "",
    "",
    ""
  ],
  "proTip": "",
  "recommendedResources": [
    "",
    ""
  ]
}
`;

    const userPrompt = JSON.stringify({
      question: question || '',
      projectContext: projectContext || {},
    });

    const aiResult = await this.generateResponse(
      systemPrompt,
      userPrompt,
      true
    );

    if (
      aiResult &&
      aiResult.directAnswer &&
      Array.isArray(aiResult.actionableSteps)
    ) {
      return aiResult;
    }

    return this.generateHeuristicMentorAdvice(
      mentorType,
      question,
      projectContext
    );
  }

  /**
   * Deterministic offline evaluator.
   *
   * Important: no Math.random().
   * The same project always receives the same fallback score.
   */
  generateHeuristicProjectScore(projectData = {}) {
    const prompt = String(projectData.prompt || '');
    const description = String(
      projectData.description || ''
    );

    const tags = Array.isArray(projectData.tags)
      ? projectData.tags
      : [];

    const combined = `${prompt} ${description} ${tags.join(' ')}`;

    const hasStructure =
      /\b(role|format|json|criteria|constraints|steps?|schema)\b/i.test(
        combined
      );

    const hasSpecificity =
      /\b(user|input|output|workflow|feature|api|database|model|algorithm)\b/i.test(
        combined
      );

    const hasInnovationSignals =
      /\b(ai|ml|machine learning|recommend|prediction|adaptive|personalized|intelligent|optimization|automation)\b/i.test(
        combined
      );

    const hasTechnicalSignals =
      /\b(api|backend|frontend|database|authentication|architecture|pipeline|model|embedding|vector|cloud|docker|deployment)\b/i.test(
        combined
      );

    const promptLengthScore = Math.min(
      35,
      Math.floor(prompt.length / 12)
    );

    const promptScore = clamp(
      55 +
        promptLengthScore +
        (hasStructure ? 12 : 0) +
        (hasSpecificity ? 8 : 0),
      60,
      98
    );

    const innovationScore = clamp(
      65 +
        (hasInnovationSignals ? 15 : 0) +
        (description.length > 160 ? 6 : 0) +
        (tags.length >= 3 ? 4 : 0),
      65,
      95
    );

    const feasibilityScore = clamp(
      70 +
        (description.length > 120 ? 10 : 0) -
        (description.length > 1200 ? 8 : 0),
      60,
      96
    );

    const technicalDepth = clamp(
      65 +
        (hasTechnicalSignals ? 16 : 0) +
        Math.min(tags.length * 2, 8),
      65,
      95
    );

    const clarity = clamp(
      65 +
        (description.length > 50 ? 12 : 0) +
        (description.length > 150 ? 8 : 0) +
        (hasSpecificity ? 6 : 0),
      65,
      98
    );

    const overallScore = Math.round(
      promptScore * 0.25 +
        innovationScore * 0.25 +
        feasibilityScore * 0.2 +
        technicalDepth * 0.15 +
        clarity * 0.15
    );

    let verdict = 'Promising';

    if (overallScore >= 90) {
      verdict = 'Outstanding';
    } else if (overallScore >= 80) {
      verdict = 'Strong';
    } else if (overallScore < 70) {
      verdict = 'Needs Refinement';
    }

    return {
      scores: {
        promptEngineering: promptScore,
        innovation: innovationScore,
        feasibility: feasibilityScore,
        technicalDepth,
        clarity,
      },

      overallScore,

      verdict,

      strengths: [
        'Clear project objective and target use case.',
        hasInnovationSignals
          ? 'Contains a meaningful opportunity for intelligent or adaptive functionality.'
          : 'Has a practical foundation that can be strengthened with a focused differentiator.',
        hasTechnicalSignals
          ? 'Shows multiple opportunities to demonstrate real engineering depth.'
          : 'Provides a manageable foundation for a final-year implementation.',
      ],

      improvements: [
        'Define one measurable outcome that proves the project creates value.',
        'Add a clear differentiating mechanism instead of relying on generic AI features.',
        'Specify constraints, expected inputs, outputs, and failure behavior more explicitly.',
      ],

      promptCritique: {
        clarityRating: Math.round(clarity / 10),

        constraintEffectiveness: Math.round(
          promptScore / 10
        ),

        refinedPromptSuggestion:
          `System: You are an expert assistant for ${projectData.title || 'this project'}.

Context:
${description.slice(0, 500)}

Requirements:
1. Follow the user's constraints exactly.
2. Produce structured and deterministic output.
3. Do not invent unavailable capabilities.
4. Explain important assumptions.
5. Handle edge cases explicitly.
6. Return the requested format without additional commentary.

Original Prompt:
${prompt}`,
      },

      summary:
        `The project has a ${verdict.toLowerCase()} profile with an overall score of ${overallScore}/100. The strongest opportunity is to combine practical scope with a clearly measurable and differentiated outcome.`,

      evaluatedBy: this.isConfigured()
        ? this.modelName
        : 'VentureMind Deterministic Evaluation Engine (Offline Mode)',
    };
  }

  /**
   * Offline mentor fallback.
   */
  generateHeuristicMentorAdvice(
    mentorType,
    question,
    projectContext
  ) {
    const adviceMap = {
      architect: {
        directAnswer:
          'Keep the architecture modular: validate requests first, isolate AI logic behind a service layer, and keep project scoring deterministic outside the model.',

        actionableSteps: [
          'Separate API validation, business logic, AI calls, and scoring into independent modules.',
          'Add explicit timeout and failure handling around external AI requests.',
          'Keep the frontend independent from the Gemini implementation.',
        ],

        proTip:
          'The strongest student architecture is usually the simplest architecture that clearly separates responsibilities.',

        recommendedResources: [
          'Layered Architecture',
          'REST API Design',
        ],
      },

      promptCraft: {
        directAnswer:
          'Optimize prompts for reliability by defining the role, input context, constraints, evaluation criteria, and exact output schema.',

        actionableSteps: [
          'Define exactly what the model must produce and what it must never produce.',
          'Use structured JSON output for data consumed by application code.',
          'Test prompts against vague, incomplete, and unexpected user inputs.',
        ],

        proTip:
          'Treat your prompt like production code: define inputs, outputs, constraints, failure cases, and evaluation criteria.',

        recommendedResources: [
          'Structured Output',
          'Prompt Evaluation',
        ],
      },

      pitchCoach: {
        directAnswer:
          'Frame VentureMind around the transformation from a vague student interest into a scored, feasible, buildable project blueprint.',

        actionableSteps: [
          'Open the demo with a real student profile rather than a technical explanation.',
          'Show the Project DNA score and explain why the winning idea was selected.',
          'Demonstrate one adaptive mentor action changing the project recommendation.',
        ],

        proTip:
          'Your strongest demo moment is the transition from "I have no project idea" to a concrete build plan.',

        recommendedResources: [
          'Hackathon Demo Storytelling',
          'Problem-Solution-Impact Framework',
        ],
      },

      codeReviewer: {
        directAnswer:
          'Focus on defensive engineering: validate every request, safely handle malformed AI responses, and never expose API keys or internal errors.',

        actionableSteps: [
          'Validate incoming data before sending it to the AI service.',
          'Treat model output as untrusted external data and validate it before use.',
          'Use centralized error handling and safe production logging.',
        ],

        proTip:
          'An AI application should never assume the model is correct just because the response is valid JSON.',

        recommendedResources: [
          'Express Production Best Practices',
          'Input Validation with Zod',
        ],
      },
    };

    const advice =
      adviceMap[mentorType] || adviceMap.architect;

    return {
      mentorType,
      mentorTitle: `${
        mentorType.charAt(0).toUpperCase() +
        mentorType.slice(1)
      } Mentor`,
      question,
      ...advice,
      providedBy: this.isConfigured()
        ? this.modelName
        : 'VentureMind Mentor Advisory Engine (Offline Mode)',
    };
  }
}

/**
 * Keep scores within a safe range.
 */
function clamp(value, min, max) {
  return Math.min(
    max,
    Math.max(min, Math.round(value))
  );
}

module.exports = new AIService();
