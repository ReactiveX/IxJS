import { AsyncIterableX } from '../../asynciterable';
import { sum } from '../../asynciterable/sum';
import { identityAsync } from '../../internal/identity';

export function sumProto(
    this: AsyncIterableX<number>,
    selector?: (x: number) => number | Promise<number>): Promise<number>;
export function sumProto<T>(
    this: AsyncIterableX<T>,
    selector: (x: T) => number | Promise<number>): Promise<number>;
/**
 * @ignore
 */
export function sumProto(
    this: AsyncIterableX<any>,
    selector: (x: any) => number | Promise<number> = identityAsync): Promise<number> {
  return sum(this, selector);
}

AsyncIterableX.prototype.sum = sumProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    sum: typeof sumProto;
  }
}