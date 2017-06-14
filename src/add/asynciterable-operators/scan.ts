import { AsyncIterableX } from '../../asynciterable';
import { scan } from '../../asynciterable/scan';

export function scanProto<T>(
  this: AsyncIterable<T>,
  accumulator: (acc: T, value: T, index: number) => T | Promise<T>): AsyncIterable<T>;
export function scanProto<T, R = T>(
  this: AsyncIterable<T>,
  accumulator: (acc: R, value: T, index: number) => R | Promise<R>,
  seed: R): AsyncIterable<R>;
/**
 * @ignore
 */
export async function* scanProto<T, R = T>(
    this: AsyncIterable<T>,
    accumulator: (acc: T | R, value: T, index: number) => R | Promise<R>,
    ...args: (T | R)[]): AsyncIterable<T | R> {
  return args.length === 3 ? scan(this, accumulator, args[0]) : scan(this, accumulator);
}

AsyncIterableX.prototype.scan = scanProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    scan: typeof scanProto;
  }
}