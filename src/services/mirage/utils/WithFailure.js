import { Response } from "miragejs";

/**
 * Wrap a Mirage handler with simulated failure
 * @param {Function} handler - your actual route handler
 * @param {number} failRate - probability between 0 and 1 (default 0.08 = 8%)
 */
export function withFailure(handler, failRate = 0.55) {
  return async (schema, request) => {
    if (Math.random() < failRate) {
      console.warn(`[Mirage] Simulated network error on ${request.method} ${request.url}`);
      return new Response(500, {}, { error: "Simulated server error" });
    }
    return handler(schema, request);
  };
}
