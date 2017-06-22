import { AsyncIterableX } from '../../asynciterable';
import { scanRight } from '../../asynciterable/scanright';

export function scanRightProto<T>(
  this: AsyncIterable<T>,
  accumulator: (acc: T, value: T, index: number) => T | Promise<T>): AsyncIterable<T>;
export function scanRightProto<T, R = T>(
  this: AsyncIterable<T>,
  accumulator: (acc: R, value: T, index: number) => R | Promise<R>,
  seed: R): AsyncIterable<R>;
/**
 * @ignore
 */
export async function* scanRightProto<T, R = T>(
    this: AsyncIterable<T>,
    accumulator: (acc: T | R, value: T, index: number) => R | Promise<R>,
    ...args: (T | R)[]): AsyncIterable<T | R> {
  return args.length === 3 ? scanRight(this, accumulator, args[0]) : scanRight(this, accumulator);
}

AsyncIterableX.prototype.scanRight = scanRightProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    scanRight: typeof scanRightProto;
  }
}