import { IterableX } from '../../iterable/iterablex.js';
import { includes } from '../../iterable/includes.js';

/**
 * @ignore
 */
export function includesProto<T>(this: IterableX<T>, searchElement: T, fromIndex: number): boolean {
  return includes(this, searchElement, fromIndex);
}

IterableX.prototype.includes = includesProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    includes: typeof includesProto;
  }
}
