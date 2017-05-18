import { AsyncIterableX } from '../../asynciterable';
import { sum } from '../../asynciterable/sum';

export function sumProto(this: AsyncIterableX<number>, fn?: (x: number) => number): Promise<number>;
export function sumProto<T>(this: AsyncIterableX<T>, fn: (x: T) => number): Promise<number>;
export function sumProto(this: AsyncIterableX<any>, fn: (x: any) => number = x => x): Promise<number> {
  return sum(this, fn);
}

AsyncIterableX.prototype.sum = sumProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    sum: typeof sumProto;
  }
}