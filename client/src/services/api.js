/**
 * @file api.js
 * @description API Client Service for VentureMind backend.
 * Provides a safe interface for Project Generation, Scoring Engine,
 * and Adaptive Mentor Loop.
 */

const API_BASE = "/api";

/**
 * Safely parse an API response.
 *
 * Prevents:
 * "Unexpected end of JSON input"
 *
 * when the server returns an empty or non-JSON response.
 */
async function handleResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const rawText = await response.text();

  let data = null;

  // Parse JSON only when the response actually contains JSON.
  if (rawText.trim()) {
    if (contentType.includes("application/json")) {
      try {
        data = JSON.parse(rawText);
      } catch {
        data = null;
      }
    } else {
      // Some development/proxy errors may return plain text.
      try {
        data = JSON.parse(rawText);
      } catch {
        data = null;
      }
    }
  }

  // Handle unsuccessful HTTP responses.
  if (!response.ok) {
    const message =
      data?.error ||
      data?.message ||
      rawText.trim() ||
      `API request failed with status ${response.status}`;

    const error = new Error(message);

    error.status = response.status;
    error.errors = data?.errors || null;

    throw error;
  }

  // Successful response with no body.
  if (!rawText.trim()) {
    return {
      success: true,
      data: null,
    };
  }

  // Successful JSON response.
  if (data !== null) {
    return data;
  }

  // Successful but unexpected non-JSON response.
  return {
    success: true,
    data: rawText,
  };
}

/**
 * Shared JSON request configuration.
 */
const jsonHeaders = {
  "Content-Type": "application/json",
};

export const api = {
  // =========================================================
  // PROJECTS
  // =========================================================

  async createProject(payload) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    });

    return handleResponse(res);
  },

  async adaptProject(payload) {
    const res = await fetch(`${API_BASE}/projects/adapt`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    });

    return handleResponse(res);
  },

  async getProjects() {
    const res = await fetch(`${API_BASE}/projects`);

    return handleResponse(res);
  },

  async getProjectById(id) {
    const res = await fetch(`${API_BASE}/projects/${encodeURIComponent(id)}`);

    return handleResponse(res);
  },

  async scoreProject(id, answers) {
    const res = await fetch(
      `${API_BASE}/projects/${encodeURIComponent(id)}/score`,
      {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ answers }),
      },
    );

    return handleResponse(res);
  },

  async getLeaderboard() {
    const res = await fetch(`${API_BASE}/projects/leaderboard`);

    return handleResponse(res);
  },

  // =========================================================
  // MENTOR
  // =========================================================

  async getMentors() {
    const res = await fetch(`${API_BASE}/mentor`);

    return handleResponse(res);
  },

  async getMentorFeedback(mentorId, projectId, question = 'How can I optimize and stress-test this concept for production?') {
    const res = await fetch(`${API_BASE}/mentor/feedback`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify({
        mentorType: mentorId,
        projectId,
        question,
      }),
    });
    return handleResponse(res);
  },

  async askMentor(mentorId, question, projectId) {
    const res = await fetch(
      `${API_BASE}/mentor/${encodeURIComponent(mentorId)}/ask`,
      {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({
          question,
          projectId,
        }),
      },
    );

    return handleResponse(res);
  },
};
