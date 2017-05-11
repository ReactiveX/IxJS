import { AsyncIterableX } from '../../asynciterable';
import { min } from '../../asynciterable/min';

export function minProto(this: AsyncIterableX<number>, fn?: (x: number) => number): Promise<number>;
export function minProto<T>(this: AsyncIterableX<T>, fn: (x: T) => number): Promise<number>;
export function minProto(this: AsyncIterableX<any>, fn: (x: any) => number = x => x): Promise<number> {
  return min(this, fn);
}

AsyncIterableX.prototype.min = minProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    min: typeof minProto;
  }
}