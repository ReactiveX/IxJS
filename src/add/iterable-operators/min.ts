import { IterableX } from '../../iterable';
import { min } from '../../iterable/min';

export function minProto(this: IterableX<number>, fn?: (x: number) => number): number;
export function minProto<T>(this: IterableX<T>, fn: (x: T) => number): number;
/**
 * @ignore
 */
export function minProto(this: IterableX<any>, fn: (x: any) => number = x => x): number {
  return min(this, fn);
}

IterableX.prototype.min = minProto;

declare module '../../iterable' {
  interface IterableX<T> {
    min: typeof minProto;
  }
}