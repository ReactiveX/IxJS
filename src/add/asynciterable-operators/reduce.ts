import { AsyncIterableX } from '../../asynciterable';
import { reduce } from '../../asynciterable/reduce';

export async function reduceProto<T>(
  this: AsyncIterable<T>,
  accumulator: (acc: T, value: T, index: number) => T | Promise<T>): Promise<T>;
export async function reduceProto<T, R = T>(
  this: AsyncIterable<T>,
  accumulator: (acc: R, value: T, index: number) => R | Promise<R>,
  seed: R): Promise<R>;
/**
 * @ignore
 */
export async function reduceProto<T, R = T>(
    this: AsyncIterable<T>,
    accumulator: (acc: T | R, value: T, index: number) => R | Promise<R>,
    ...args: (T | R)[]): Promise<T | R> {
  return args.length === 3 ? reduce(this, accumulator, args[0]) : reduce(this, accumulator);
}

AsyncIterableX.prototype.reduce = reduceProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    reduce: typeof reduceProto;
  }
}