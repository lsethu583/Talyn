import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

// Single shared Axios instance — credentials:true so the httpOnly
// refresh_token cookie is forwarded on every request automatically.
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Auth helpers ──────────────────────────────────────────────────────────

export interface UserDto {
  id: string;
  email: string;
  roles: string[];
  createdAt: string;
}

export interface LoginResponse {
  data: {
    user: UserDto;
    accessToken: string;
  };
}

export interface RegisterResponse {
  data: UserDto;
}

export const authApi = {
  register: async (name: string, email: string, password: string): Promise<UserDto> => {
    const res = await api.post<RegisterResponse>('/auth/register', { name, email, password });
    return res.data.data;
  },

  login: async (
    email: string,
    password: string,
  ): Promise<{ user: UserDto; accessToken: string }> => {
    const res = await api.post<LoginResponse>('/auth/login', { email, password });
    return res.data.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  refresh: async (): Promise<{ accessToken: string }> => {
    const res = await api.post<{ data: { accessToken: string } }>('/auth/refresh');
    return res.data.data;
  },
};

export default api;
