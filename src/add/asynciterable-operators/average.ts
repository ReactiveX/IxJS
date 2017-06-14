import { AsyncIterableX } from '../../asynciterable';
import { average } from '../../asynciterable/average';

export function averageProto(
    this: AsyncIterableX<number>,
    selector?: (x: number) => number | Promise<number>): Promise<number>;
export function averageProto<T>(
    this: AsyncIterableX<T>,
    selector?: (x: T) => number | Promise<number>): Promise<number>;
/**
 * @ignore
 */
export function averageProto(
    this: AsyncIterableX<any>,
    selector: (x: any) => number | Promise<number>): Promise<number> {
  return average(this, selector);
}

AsyncIterableX.prototype.average = averageProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    average: typeof averageProto;
  }
}