import { Response } from "miragejs";

/**
 * Wrap a Mirage handler with simulated delay + failure
 * @param {Function} handler - your actual route handler
 * @param {object} options
 * @param {number} options.failRate - probability between 0 and 1 (default 0.08 = 8%)
 * @param {number[]} options.delayRange - [min, max] ms artificial latency
 */
export function withFailure(handler, { failRate = 0.1, delayRange = [200, 1200] } = {}) {
  return async (schema, request) => {
    const delay = Math.floor(
      Math.random() * (delayRange[1] - delayRange[0]) + delayRange[0]
    );
    await new Promise((res) => setTimeout(res, delay));

    if (Math.random() < failRate) {
      console.warn(`[Mirage] Simulated network error on ${request.method} ${request.url}`);
      return new Response(500, {}, { error: "Simulated server error" });
    }

    return handler(schema, request);
  };
}
