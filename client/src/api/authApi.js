// Functions for calling the Express authentication API. Pages read each response and show success or error messages.
// Use the Vite proxy locally, or a custom API base URL supplied at build time.
const API_URL = (import.meta.env.VITE_API_URL || '/api/auth').replace(/\/$/, '');

// credentials: include tells fetch to accept and send the HTTP-only session cookie.
// JavaScript cannot read that cookie directly; the browser manages it.
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
export function forgotPassword(data) {
  return fetch(`${API_URL}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export function resetPassword(data) {
  return fetch(`${API_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}
