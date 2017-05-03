import { IterableX } from '../../iterable';
import { includes } from '../../iterable/includes';

export function includesProto<T>(
    this: IterableX<T>,
    searchElement: T,
    fromIndex: number): boolean {
  return includes(this, searchElement, fromIndex);
}

IterableX.prototype.includes = includesProto;

declare module '../../iterable' {
  interface IterableX<T> {
    includes: typeof includesProto;
  }
}