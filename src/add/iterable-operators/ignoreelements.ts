import { IterableX } from '../../iterable';
import { ignoreElements } from '../../iterable/ignoreelements';

/**
 * @ignore
 */
export function ignoreElementsProto<T>(
    this: IterableX<T>): IterableX<T> {
  return ignoreElements(this);
}

IterableX.prototype.ignoreElements = ignoreElementsProto;

declare module '../../iterable' {
  interface IterableX<T> {
    ignoreElements: typeof ignoreElementsProto;
  }
}