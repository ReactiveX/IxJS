import { IterableX } from '../../iterable/iterablex';
import { ignoreElements } from '../../iterable/ignoreelements';

/**
 * @ignore
 */
export function ignoreElementsProto<T>(this: IterableX<T>): IterableX<T> {
  return ignoreElements(this);
}

IterableX.prototype.ignoreElements = ignoreElementsProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    ignoreElements: typeof ignoreElementsProto;
  }
}
