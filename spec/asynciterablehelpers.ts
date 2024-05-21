import './Ix.js';
import { Observer, PartialObserver } from '../src/observer.js';
import { AsyncIterableX } from 'ix/asynciterable/asynciterablex.js';

export async function hasNext<T>(source: AsyncIterator<T>, expected: T) {
  await expect(source.next()).resolves.toEqual({ done: false, value: expected });
}

export async function hasErr(source: AsyncIterator<any>, expected: any) {
  await expect(source.next()).rejects.toThrow(expected);
}

export async function noNext<T>(source: AsyncIterator<T>) {
  await expect(source.next()).resolves.toEqual({ done: true, value: undefined });
}

export function delayValue<T>(item: T, delay: number): Promise<T> {
  return new Promise<T>((res) => {
    setTimeout(() => {
      res(item);
    }, delay);
  });
}

export function delayError<T>(item: T, delay: number): Promise<void> {
  return new Promise<void>((_, reject) => {
    setTimeout(() => {
      reject(item);
    }, delay);
  });
}

const noop = (_?: any) => {
  /**/
};

// eslint-disable-next-line complexity
export function toObserver<T>(
  next?: PartialObserver<T> | ((value: T) => void) | null,
  error?: ((err: any) => void) | null,
  complete?: (() => void) | null
): Observer<T> {
  if (next && typeof next === 'object') {
    const observer = <any>next;
    return {
      next: (observer.next || noop).bind(observer),
      error: (observer.error || noop).bind(observer),
      complete: (observer.complete || noop).bind(observer),
    };
  } else {
    return {
      next: typeof next === 'function' ? next : noop,
      error: typeof error === 'function' ? error : noop,
      complete: typeof complete === 'function' ? complete : noop,
    };
  }
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualStream<T>(
        expected: Iterable<T> | AsyncIterable<T>,
        comparer?: (first: T, second: T) => boolean | Promise<boolean>
      ): Promise<CustomMatcherResult>;
    }
  }
}

const defaultAsyncCompare = <T>(x: T, y: T) => {
  // poor man's deep-equals
  try {
    expect(x).toEqual(y);
  } catch (e) {
    return false;
  }
  return true;
};

expect.extend({
  // eslint-disable-next-line complexity
  async toEqualStream<T>(
    this: jest.MatcherUtils,
    actual: Iterable<T> | AsyncIterable<T>,
    expected: Iterable<T> | AsyncIterable<T>,
    comparer: (first: T, second: T) => boolean | Promise<boolean> = defaultAsyncCompare
  ) {
    let actualCount = 0;
    let expectedCount = 0;
    let next1: IteratorResult<T>;
    let next2: IteratorResult<T>;
    const results: string[] = [];
    const it1 = AsyncIterableX.as(expected)[Symbol.asyncIterator]();
    const it2 =
      typeof (<any>actual)[Symbol.asyncIterator] === 'function'
        ? (<any>actual)[Symbol.asyncIterator]()
        : (<any>actual)[Symbol.iterator]();

    while (!(next1 = await it1.next()).done) {
      expectedCount++;
      if (!(next2 = await it2.next(getValueByteLength(next1.value))).done) {
        actualCount++;
        if (!(await comparer(next1.value, next2.value))) {
          results.push(
            `expected ${this.utils.printExpected(next2.value)} to equal ${this.utils.printReceived(
              next1.value
            )}`
          );
          break;
        }
      }
    }
    while (!(await it1.next()).done) {
      expectedCount++;
    }
    if ((!(await it2.next()).done && ++actualCount) || expectedCount !== actualCount) {
      results.push(`expected length ${expectedCount}, instead received ${++actualCount}`);
    }
    return { pass: results.length === 0, message: () => results.join('\n') };
  },
});

function getValueByteLength(value: any) {
  if (value && value.buffer instanceof ArrayBuffer) {
    return value.byteLength;
  }
  return undefined;
}
