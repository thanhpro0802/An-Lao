export const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    return `http://${window.location.hostname}:8080/api/v1`;
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
};

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('access_token');
  }

  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${getApiUrl()}${endpoint}`, {
      ...options,
      headers,
    });
    
    // Auto logout on 401/403
    if (response.status === 401 || response.status === 403) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return { status: response.status, data: { message: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại." } };
    }

    // For 204 No Content or empty responses
    if (response.status === 204) {
      return { status: 204, data: null };
    }

    // Safely parse JSON
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    
    return { status: response.status, data };
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { status: 500, data: { message: "Lỗi kết nối máy chủ" } };
  }
}
