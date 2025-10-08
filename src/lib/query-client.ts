/* eslint-disable @typescript-eslint/no-explicit-any */

import { QueryClient } from "@tanstack/react-query";
import { AppError } from "@/helpers/api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount: any, error: unknown) => {
        if (error instanceof AppError) {
          const status = error.status ?? 0;
          if (error.isRateLimit) return true;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 1;
      },
      retryDelay: (attempt: any, error: unknown) => {
        if (error instanceof AppError && error.rateLimit?.reset) {
          const resetMs = (error.rateLimit.reset * 1000) - Date.now();
          return Math.max(resetMs + 1000, 1000);
        }
        return Math.min(1000 * 2 ** attempt, 30_000);
      },
      onError: (err: unknown) => {
        if (err instanceof AppError) {
          if (err.isRateLimit) {
            const reset = err.rateLimit?.reset ? new Date(err.rateLimit.reset * 1000) : null;
            const when = reset ? `Try again after ${reset.toLocaleTimeString()}` : "Try again later";
            console.log(`GitHub rate limit exceeded. ${when}`);
            return;
          }
          if (err.status === 401) {
            console.log("Authentication error — please check your token.");
            return;
          }
          if ((err.status ?? 0) >= 500) {
            console.log("GitHub server error. Coba lagi nanti.");
            return;
          }
          console.log(err.message);
        } else {
          console.log("Network error saat menghubungi GitHub.");
        }
      },
      throwOnError: (err: unknown) => {
        if (err instanceof AppError) {
          return (err.status ?? 0) >= 500;
        }
        return false;
      }
    } as any,
    mutations: {
      retry: 0,
      onError: (err: unknown) => {
        console.error("Mutation error", err);
      }
    }
  }
});
