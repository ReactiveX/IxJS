import { AsyncIterableX } from '../../asynciterable';
import { average } from '../../asynciterable/average';

export function averageProto(this: AsyncIterableX<number>, fn?: (x: number) => number): Promise<number>;
export function averageProto<T>(this: AsyncIterableX<T>, fn?: (x: T) => number): Promise<number>;
export function averageProto(this: AsyncIterableX<any>, fn: (x: any) => number = x => x): Promise<number> {
  return average(this, fn);
}

AsyncIterableX.prototype.average = averageProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    average: typeof averageProto;
  }
}