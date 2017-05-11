import { AsyncIterableX } from '../../asynciterable';
import { max } from '../../asynciterable/max';

export function maxProto(this: AsyncIterableX<number>, fn?: (x: number) => number): Promise<number>;
export function maxProto<T>(this: AsyncIterableX<T>, fn: (x: T) => number): Promise<number>;
export function maxProto(this: AsyncIterableX<any>, fn: (x: any) => number = x => x): Promise<number> {
  return max(this, fn);
}

AsyncIterableX.prototype.max = maxProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    max: typeof maxProto;
  }
}