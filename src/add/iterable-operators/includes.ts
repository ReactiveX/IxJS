import { IterableX } from '../../iterable';
import { includes } from '../../iterable/includes';

function includesProto<T>(
    this: Iterable<T>,
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