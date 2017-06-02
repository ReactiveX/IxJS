'use strict';

export type SyncAsyncIterable<T> = Iterable<T | PromiseLike<T>> | AsyncIterable<T>;