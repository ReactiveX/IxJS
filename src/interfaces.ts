import { IterableX } from './iterable/index.js';
import { AsyncIterableX } from './asynciterable/index.js';

export type UnaryFunction<T, R> = (source: T) => R;

export type OperatorFunction<T, R> = UnaryFunction<Iterable<T>, IterableX<R>>;

export type OperatorAsyncFunction<T, R> = UnaryFunction<AsyncIterable<T>, AsyncIterableX<R>>;

export type MonoTypeOperatorFunction<T> = OperatorFunction<T, T>;

export type MonoTypeOperatorAsyncFunction<T> = OperatorAsyncFunction<T, T>;

/** @ignore */
export type BufferLike = string | Buffer | Uint8Array;
