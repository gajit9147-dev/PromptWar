process.env.NODE_ENV = 'test';
process.env.PORT = '5001';

const http = require('http');
const app = require('./src/app');

const startTestServer = () => {
  return new Promise((resolve) => {
    const server = http.createServer(app);
    server.listen(0, () => {
      const port = server.address().port;
      resolve({ server, baseUrl: `http://localhost:${port}` });
    });
  });
};

const request = async (baseUrl, path, options = {}) => {
  const url = `${baseUrl}${path}`;
  const headers = { 'Content-Type': 'application/json', Connection: 'close', ...(options.headers || {}) };
  const res = await fetch(url, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
};

const runTests = async () => {
  console.log('🧪 Starting PromptWar Backend Test Suite...\n');
  const { server, baseUrl } = await startTestServer();

  let passed = 0;
  let failed = 0;

  const assert = (condition, message) => {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  };

  try {
    // 1. Health check
    console.log('1. Health Check Endpoint:');
    const health = await request(baseUrl, '/api/health');
    assert(health.status === 200 && health.data.status === 'healthy', 'GET /api/health returns 200 healthy');

    // 2. Initial projects list
    console.log('\n2. Projects Retrieval:');
    const projects = await request(baseUrl, '/api/projects');
    assert(projects.status === 200 && projects.data.count >= 2, `GET /api/projects returns seeded projects (count: ${projects.data.count})`);

    // 3. Project leaderboard
    console.log('\n3. Leaderboard:');
    const leaderboard = await request(baseUrl, '/api/projects/leaderboard');
    assert(leaderboard.status === 200 && Array.isArray(leaderboard.data.data), 'GET /api/projects/leaderboard returns ranked list');

    // 4. Create Project with validation check
    console.log('\n4. Project Validation & Creation:');
    const invalidCreate = await request(baseUrl, '/api/projects', {
      method: 'POST',
      body: { title: 'No' }, // Missing description and prompt
    });
    assert(invalidCreate.status === 400 && invalidCreate.data.success === false, 'POST /api/projects rejects invalid payload with 400');

    const validCreate = await request(baseUrl, '/api/projects', {
      method: 'POST',
      body: {
        title: 'AutoDoc AI: Realtime Code Documentation',
        description: 'Analyzes AST trees and generates synchronized markdown docstrings for polyglot codebases.',
        prompt: 'You are an AST documentation expert. Given the function signature and body, output standard JSDoc or Sphinx markdown. Verify edge cases.',
        tags: ['Documentation', 'Developer Tools', 'Code Analysis'],
        author: 'HackathonChallenger',
      },
    });
    assert(validCreate.status === 201 && validCreate.data.data.scoreData !== null, 'POST /api/projects creates and automatically evaluates project');
    const createdId = validCreate.data.data.id;

    // 5. Get Project by ID
    console.log('\n5. Single Project Retrieval:');
    const singleProj = await request(baseUrl, `/api/projects/${createdId}`);
    assert(singleProj.status === 200 && singleProj.data.data.id === createdId, `GET /api/projects/:id successfully returns project ${createdId}`);

    // 6. Score Project endpoint
    console.log('\n6. Score Project Endpoint:');
    const scoredProj = await request(baseUrl, `/api/projects/${createdId}/score`, {
      method: 'POST',
      body: { customCriteria: ['Clarity of developer API', 'Multi-language support'] },
    });
    assert(scoredProj.status === 200 && scoredProj.data.data.scoreData.overallScore > 0, 'POST /api/projects/:id/score evaluates project with custom criteria');

    // 7. Mentor Roster
    console.log('\n7. Mentors API:');
    const mentors = await request(baseUrl, '/api/mentor');
    assert(mentors.status === 200 && mentors.data.count >= 4, `GET /api/mentor returns mentor roster (${mentors.data.count} mentors)`);

    // 8. Mentor Feedback
    console.log('\n8. Mentor Feedback & Consultation:');
    const mentorFeedback = await request(baseUrl, '/api/mentor/feedback', {
      method: 'POST',
      body: {
        projectId: createdId,
        mentorType: 'promptCraft',
        question: 'How do I ensure the model does not hallucinate undocumented parameters?',
      },
    });
    assert(mentorFeedback.status === 200 && mentorFeedback.data.data.response.directAnswer, 'POST /api/mentor/feedback returns actionable advice');

    // 9. Mentor Direct Chat
    const mentorChat = await request(baseUrl, '/api/mentor/architect/chat', {
      method: 'POST',
      body: {
        question: 'What is the optimal caching architecture for AST documentation generation?',
      },
    });
    assert(mentorChat.status === 200 && mentorChat.data.data.response.actionableSteps.length > 0, 'POST /api/mentor/:mentorType/chat returns structured guidance');

    // 10. 404 Handler
    console.log('\n9. Error Handling:');
    const notFound = await request(baseUrl, '/api/non-existent-route');
    assert(notFound.status === 404 && notFound.data.success === false, 'Handles 404 routes gracefully');

    console.log(`\n=========================================`);
    console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
    console.log(`=========================================`);
  } catch (err) {
    console.error('Test execution exception:', err);
    failed++;
  } finally {
    server.close(() => {
      process.exit(failed > 0 ? 1 : 0);
    });
  }
};

runTests();
