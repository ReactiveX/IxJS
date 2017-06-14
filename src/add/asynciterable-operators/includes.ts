import { AsyncIterableX } from '../../asynciterable';
import { includes } from '../../asynciterable/includes';

/**
 * @ignore
 */
export function includesProto<T>(
    this: AsyncIterableX<T>,
    searchElement: T,
    fromIndex: number): Promise<boolean> {
  return includes(this, searchElement, fromIndex);
}

AsyncIterableX.prototype.includes = includesProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    includes: typeof includesProto;
  }
}