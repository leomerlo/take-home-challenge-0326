/**
 * Shared API utilities for HTTP requests.
 * Centralizes error handling and response parsing.
 */

const API_BASE = '/api';

async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function apiGet<T>(path: string): Promise<T> {
  return request<T>(`${API_BASE}${path}`);
}
