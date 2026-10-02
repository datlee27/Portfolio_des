/**
 * Personal Portfolio & Blog API Client
 * Connects to Backend RESTful API (PHP / MySQL / OpenAPI 3.0.3)
 */

const API_BASE = '/api';

async function request(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const config = {
    credentials: 'include', // Includes PHPSESSID cookie
    ...options,
    headers,
  };

  try {
    const res = await fetch(`${API_BASE}${url}`, config);
    const text = await res.text();
    
    let data;
    if (text && text.trim()) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { success: res.ok, message: text };
      }
    } else {
      data = { success: res.ok };
    }

    if (!res.ok) {
      let errorMsg = data?.message || `Lỗi máy chủ HTTP ${res.status}`;
      if (res.status === 401) {
        errorMsg = 'Phiên làm việc hết hạn hoặc chưa đăng nhập (401 Unauthorized). Vui lòng đăng nhập lại!';
      }
      const error = new Error(errorMsg);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    console.error(`[API Error] ${options.method || 'GET'} ${url}:`, err);
    throw err;
  }
}

export const api = {
  // ─── Authentication Endpoints ───
  async login(username, password) {
    return request('/auth.php?endpoint=login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  async checkAuth() {
    try {
      return await request('/auth.php?endpoint=check');
    } catch {
      return { success: false, data: { logged_in: false } };
    }
  },

  async logout() {
    return request('/auth.php?endpoint=logout');
  },

  // ─── Portfolio Endpoints ───
  async getPortfolio() {
    return request('/index.php?endpoint=portfolio');
  },

  async createProject(projectData) {
    return request('/index.php?endpoint=portfolio&type=project', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  async updateProject(id, projectData) {
    return request(`/index.php?endpoint=portfolio&type=project&id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },

  async deleteProject(id) {
    return request(`/index.php?endpoint=portfolio&type=project&id=${id}`, {
      method: 'DELETE',
    });
  },

  async updatePersonal(personalData) {
    return request('/index.php?endpoint=portfolio&type=personal', {
      method: 'PUT',
      body: JSON.stringify(personalData),
    });
  },

  async updateSkills(skillsData) {
    return request('/index.php?endpoint=portfolio&type=skills', {
      method: 'PUT',
      body: JSON.stringify(skillsData),
    });
  },

  async createSkill(skillData) {
    return request('/index.php?endpoint=portfolio&type=skill', {
      method: 'POST',
      body: JSON.stringify(skillData),
    });
  },

  async updateSkill(id, skillData) {
    return request(`/index.php?endpoint=portfolio&type=skill&id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(skillData),
    });
  },

  async deleteSkill(id) {
    return request(`/index.php?endpoint=portfolio&type=skill&id=${id}`, {
      method: 'DELETE',
    });
  },

  async setupPortfolioDatabase() {
    return request('/index.php?endpoint=setup-portfolio');
  },

  // ─── Blog / Posts Endpoints ───
  async getPosts() {
    return request('/index.php?endpoint=posts');
  },

  async createPost(postData) {
    return request('/index.php?endpoint=posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },

  async updatePost(id, postData) {
    // Backend PHP router expects endpoint=post&post_id=...
    const postId = postData?.post_id || id;
    return request(`/index.php?endpoint=post&post_id=${encodeURIComponent(postId)}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  },

  async deletePost(id, altPostId) {
    // Backend PHP router expects endpoint=post&post_id=...
    const postId = altPostId || id;
    return request(`/index.php?endpoint=post&post_id=${encodeURIComponent(postId)}`, {
      method: 'DELETE',
    });
  },
};

export default api;
