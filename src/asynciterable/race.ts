import { AsyncIterableX } from './asynciterablex';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

class RaceAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _left: AsyncIterable<TSource>;
  private _right: AsyncIterable<TSource>;

  constructor(left: AsyncIterable<TSource>, right: AsyncIterable<TSource>) {
    super();
    this._left = left;
    this._right = right;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const left = wrapWithAbort(this._left, signal);
    const right = wrapWithAbort(this._right, signal);
    const leftIt = left[Symbol.asyncIterator]();
    const rightIt = right[Symbol.asyncIterator]();
    let otherIterator: AsyncIterator<TSource>;
    let resultIterator: AsyncIterator<TSource>;
    const { value, done } = await Promise.race([
      leftIt.next().then((x) => {
        if (!resultIterator) {
          resultIterator = leftIt;
          otherIterator = rightIt;
        }
        return x;
      }),
      rightIt.next().then((x) => {
        if (!resultIterator) {
          resultIterator = rightIt;
          otherIterator = leftIt;
        }
        return x;
      }),
    ]);

    if (!done) {
      yield value;
    }

    otherIterator = otherIterator!;
    resultIterator = resultIterator!;

    // Cancel/finish other iterator
    if (otherIterator.return) {
      await otherIterator.return!();
    }

    let next;
    while (!(next = await resultIterator.next()).done) {
      yield next.value;
    }
  }
}

/**
 * Propagates the async sequence that reacts first.
 * @param {AsyncIterable<T>} left First async sequence.
 * @param {AsyncIterable<T>} right Second async sequence.
 * @return {AsyncIterable<T>} An async sequence that surfaces either of the given sequences, whichever reacted first.
 */
export function race<TSource>(
  left: AsyncIterable<TSource>,
  right: AsyncIterable<TSource>
): AsyncIterableX<TSource> {
  return new RaceAsyncIterable<TSource>(left, right);
}
