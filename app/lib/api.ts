const BASE_URL = 'https://pg.mmgbpay.com/api';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('mgpay_access_token');
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('mgpay_refresh_token');
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mgpay_access_token', token);
}

export function setRefreshToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mgpay_refresh_token', token);
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('mgpay_access_token');
  localStorage.removeItem('mgpay_refresh_token');
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function logout(): void {
  clearTokens();
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${BASE_URL}/admin/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      return null;
    }

    const data = await response.json();
    setToken(data.access);
    return data.access;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();
    return null;
  }
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<any> {
  let token = getToken();
  
  const makeRequest = async (authToken: string | null) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });

    return response;
  };

  let response = await makeRequest(token);

  if (response.status === 401 && token) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      response = await makeRequest(newToken);
    } else {
      throw new Error('Authentication failed');
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || error.message || 'Request failed');
  }

  return response.json();
}

export async function login(username: string, password: string): Promise<{ access: string; refresh: string }> {
  const response = await fetch(`${BASE_URL}/admin/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Login failed' }));
    throw new Error(error.detail || 'Login failed');
  }

  const data = await response.json();
  setToken(data.access);
  setRefreshToken(data.refresh);
  return data;
}

export async function getDashboardSummary() {
  return apiFetch('/admin/dashboard/summary/');
}

export async function getTransactions(serviceAppId?: number) {
  const query = serviceAppId ? `?service_app=${serviceAppId}` : '';
  return apiFetch(`/transactions/${query}`);
}

export async function getServiceApps() {
  return apiFetch('/service-apps/');
}

export async function createServiceApp(data: any) {
  return apiFetch('/service-apps/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateServiceApp(id: number, data: any) {
  return apiFetch(`/service-apps/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteServiceApp(id: number) {
  return apiFetch(`/service-apps/${id}/`, {
    method: 'DELETE',
  });
}

export async function getBalanceExports() {
  return apiFetch('/balance-exports/');
}

export async function createBalanceExport(data: { service_app: number; amount: string | number; description: string }) {
  return apiFetch('/balance-exports/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateBalanceExport(id: number, data: { amount?: string | number; description?: string }) {
  return apiFetch(`/balance-exports/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteBalanceExport(id: number) {
  return apiFetch(`/balance-exports/${id}/`, {
    method: 'DELETE',
  });
}

export async function getAllowedHosts() {
  return apiFetch('/allowed-hosts/');
}

export async function createAllowedHost(data: { service_app: number; host_name: string; is_active: boolean }) {
  return apiFetch('/allowed-hosts/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAllowedHost(id: number, data: { host_name?: string; is_active?: boolean }) {
  return apiFetch(`/allowed-hosts/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteAllowedHost(id: number) {
  return apiFetch(`/allowed-hosts/${id}/`, {
    method: 'DELETE',
  });
}

export async function getApiLogs() {
  return apiFetch('/api-logs/');
}

export async function getCallbacks() {
  return apiFetch('/callbacks/');
}
