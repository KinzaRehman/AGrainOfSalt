const API_URL = 'http://localhost:5000/api/auth';

export function signupUser(data) {
  return fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });
}

export function loginUser(data) {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });
}

export function getCurrentUser() {
  return fetch(`${API_URL}/me`, {
    credentials: 'include'
  });
}

export function logoutUser() {
  return fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
}