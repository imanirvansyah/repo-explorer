// src/lib/githubApi.ts
import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosHeaderValue } from "axios"

export type RateLimitInfo = {
  limit?: number;
  remaining?: number;
  reset?: number; // epoch seconds
};

export class AppError extends Error {
  status?: number;
  code?: string | number;
  details?: unknown;
  rateLimit?: RateLimitInfo;
  isRateLimit?: boolean;
  constructor(message: string, opts: {
    status?: number;
    code?: string | number;
    details?: unknown;
    rateLimit?: RateLimitInfo;
    isRateLimit?: boolean;
  } = {}) {
    super(message);
    this.name = "AppError";
    this.status = opts.status;
    this.code = opts.code;
    this.details = opts.details;
    this.rateLimit = opts.rateLimit;
    this.isRateLimit = !!opts.isRateLimit;
  }
}

const parseIntHeader = (h?: AxiosHeaderValue): number | undefined => {
  if (h === undefined || h === null) return undefined;
  const raw = Array.isArray(h) ? h[0] : h;
  const s = String(raw).trim();
  if (s === "") return undefined;
  const n = Number(s);
  return Number.isNaN(n) ? undefined : Math.floor(n);
};

export const callIApi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
  headers: {
    "Accept": "application/vnd.github+json",
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export function setGithubAuthToken(token?: string) {
  if (token) {
    callIApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete callIApi.defaults.headers.common["Authorization"];
  }
}

export function attachETag(config: AxiosRequestConfig, etag?: string) {
  if (!config.headers) config.headers = {};
  if (etag) {
    config.headers["If-None-Match"] = etag;
  }
  return config;
}

callIApi.interceptors.response.use(
  r => r,
  (err: AxiosError) => {
    const status = err.response?.status;
    const data = err.response?.data;
    const headers = err.response?.headers ?? {};

    const rateLimit = {
      limit: parseIntHeader(headers["x-ratelimit-limit"]),
      remaining: parseIntHeader(headers["x-ratelimit-remaining"]),
      reset: parseIntHeader(headers["x-ratelimit-reset"]),
    };
    const isRateLimit = (status === 403 || status === 429) && rateLimit.remaining === 0;

    const message =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data && ((data as any).message ?? JSON.stringify(data))) ??
      err.message ??
      `HTTP ${status ?? "?"} from GitHub API`;

    return Promise.reject(
      new AppError(message, {
        status,
        details: data,
        rateLimit,
        isRateLimit,
      })
    );
  }
);
