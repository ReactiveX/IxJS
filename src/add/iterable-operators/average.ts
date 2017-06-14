import { IterableX } from '../../iterable';
import { average } from '../../iterable/average';

export function averageProto(this: IterableX<number>, fn?: (x: number) => number): number;
export function averageProto<T>(this: IterableX<T>, fn?: (x: T) => number): number;
/**
 * @ignore
 */
export function averageProto(this: IterableX<any>, fn: (x: any) => number = x => x): number {
  return average(this, fn);
}

IterableX.prototype.average = averageProto;

declare module '../../iterable' {
  interface IterableX<T> {
    average: typeof averageProto;
  }
}