import { VoidFunction } from "../types";
import { option } from "./url";

export const noop = () => {};

/**
 * Only allows one function call to go through within set delay (first one goes through)
 *
 * @export
 * @template T
 * @param {number} timeout
 * @param {T} fn
 * @returns {T}
 */
export function debounce<T extends VoidFunction>(timeout : number, fn : T) : T {
  let timeoutId = null;

  return ((...args: any[]) => {
    if (timeoutId) return;

    timeoutId = setTimeout(async () => {
      try {
        await fn(...args);
      } finally {
        timeoutId = null;
      }
    }, timeout);

  }) as T
}

/**
 * Returns an object that modifies the url query params when changed
 *
 * @export
 * @param {Config} config
 * @returns {Config}
 */
export function urlConfig<T extends Record<string, any>>(config: T) : T {
  const ref = Object.entries(config).reduce((out, [key, value]) => {
    return { ...out, [key]: option.smart(key, value) }
  }, {})

  return new Proxy(ref, {
    set: (target: any, prop: string, value: any) => {
      target[prop] = value;
      option.set(prop, value);
      return true;
    }
  }) as T;
}
