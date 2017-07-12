import { AsyncIterableX } from '../asynciterable';

class RaceAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _left: AsyncIterable<TSource>;
  private _right: AsyncIterable<TSource>;

  constructor(left: AsyncIterable<TSource>, right: AsyncIterable<TSource>) {
    super();
    this._left = left;
    this._right = right;
  }

  async *[Symbol.asyncIterator]() {
    const leftIt = this._left[Symbol.asyncIterator](), rightIt = this._right[Symbol.asyncIterator]();
    let leftWins = false, rightWins = false;
    const { value, done } = await Promise.race([
      leftIt.next().then(x => { leftWins = true; return x; }),
      rightIt.next().then(x => { rightWins = true; return x; }),
    ]);

    if (!done) {
      yield value;
    }

    let resultIterator: AsyncIterator<TSource>, otherIterator: AsyncIterator<TSource>;
    if (leftWins) {
      resultIterator = leftIt;
      otherIterator = rightIt;
    } else {
      resultIterator = rightIt;
      otherIterator = leftIt;
    }

    // Cancel/finish other iterator
    if (otherIterator.return) { await otherIterator.return(); }

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
    right: AsyncIterable<TSource>): AsyncIterableX<TSource> {
  return new RaceAsyncIterable<TSource>(left, right);
}
