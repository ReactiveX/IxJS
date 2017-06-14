import { IterableX } from '../../iterable';
import { elementAt } from '../../iterable/elementat';

/**
 * @ignore
 */
export function elementAtProto<T>(this: IterableX<T>, index: number) {
  return elementAt<T>(this, index);
}

IterableX.prototype.elementAt = elementAtProto;

declare module '../../iterable' {
  interface IterableX<T> {
    elementAt: typeof elementAtProto;
  }
}