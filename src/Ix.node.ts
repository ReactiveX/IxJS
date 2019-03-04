export * from './Ix.dom';
import './add/asynciterable/fromnodestream';
import './add/iterable-operators/tonodestream';
import './add/asynciterable-operators/tonodestream';
export { IterableReadable } from './iterable/tonodestream';
export { AsyncIterableReadable } from './asynciterable/tonodestream';
export { fromNodeStream, ReadableStreamAsyncIterable } from './asynciterable/fromnodestream';

import { OperatorAsyncFunction } from './interfaces';
import { AsyncIterableX } from './asynciterable/asynciterablex';

import { toNodeStream } from './asynciterable/tonodestream';
import { isReadableNodeStream, isWritableNodeStream } from './internal/isiterable';

AsyncIterableX.prototype.pipe = nodePipe;

const as = AsyncIterableX.as;
const readableOpts = (x: any, opts = x._writableState || { objectMode: true }) => opts;
type WritableOrOperatorAsyncFunction<T, R> =
  | NodeJS.WritableStream
  | NodeJS.ReadWriteStream
  | OperatorAsyncFunction<T, R>;

function nodePipe<T>(this: AsyncIterableX<T>, ...args: any[]) {
  let i = -1;
  let n = args.length;
  let prev: any = this;
  let next: WritableOrOperatorAsyncFunction<T, any>;
  while (++i < n) {
    next = args[i];
    if (typeof next === 'function') {
      prev = as(next(prev));
    } else if (isWritableNodeStream(next)) {
      // prettier-ignore
      return isReadableNodeStream(prev) ? prev.pipe(next) :
        toNodeStream(prev, readableOpts(next)).pipe(next);
    }
  }
  return prev;
}
