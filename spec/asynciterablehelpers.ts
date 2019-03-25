import * as Ix from './Ix';
import { Observer, PartialObserver } from '../src/observer';

export async function hasNext<T>(source: AsyncIterator<T>, expected: T) {
  const { done, value } = await source.next();
  expect(done).toBeFalsy();
  expect(value).toEqual(expected);
}

export async function noNext<T>(source: AsyncIterator<T>) {
  const next = await source.next();
  expect(next.done).toBeTruthy();
}

export function delayValue<T>(item: T, delay: number): Promise<T> {
  return new Promise<T>(res => {
    let id: any = setInterval(() => {
      clearInterval(id);
      id = undefined;
      res(item);
    }, delay);
  });
}

const pipe = Ix.AsyncIterable.prototype.pipe;
const operatorNamesMap = Object.keys(Ix.asynciterable).reduce(
  (map, name) => map.set((Ix.asynciterable as any)[name], name),
  new Map<Function, string>()
);

export function testOperator<Op>(op: Op) {
  const ops = ((Array.isArray(op) ? op : [op]) as any) as Function[];
  const internalNames = ops.map(op => operatorNamesMap.get(op)!);
  const fnNames = internalNames.map(name => name.replace('_', ''));
  const pipeFns = internalNames.map(name => (Ix.asynciterablePipe as any)[name]);
  return function operatorTest(
    message: string,
    testFn: (op: Op) => any | Promise<any>,
    timeout?: number
  ) {
    test(`(fp) ${message}`, async () => await (testFn as any)(ops), timeout);
    test(`(proto) ${message}`, async () => await (testFn as any)(fnNames.map(wrapProto)), timeout);
    if (pipeFns.every(xs => typeof xs === 'function')) {
      test(`(pipe) ${message}`, async () => await (testFn as any)(pipeFns.map(wrapPipe)), timeout);
    }
  };
}

function wrapProto(name: string) {
  return function(source: any, ...args: any[]) {
    return typeof source !== 'function'
      ? cast(source)[name].apply(source, args)
      : cast(args[0])[name].apply(args[0], [source, ...args.slice(1)]);
  };
}

function wrapPipe(fn: any) {
  return function(source: any, ...args: any[]) {
    return typeof source !== 'function'
      ? pipe.call(source, fn(...args))
      : pipe.call(args[0], fn(source, ...args.slice(1)));
  };
}

function cast(source: any): any {
  return source instanceof Ix.AsyncIterable ? source : Ix.AsyncIterable.as(source);
}

const noop = (_?: any) => {
  /**/
};

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
      complete: (observer.complete || noop).bind(observer)
    };
  } else {
    return {
      next: typeof next === 'function' ? next : noop,
      error: typeof error === 'function' ? error : noop,
      complete: typeof complete === 'function' ? complete : noop
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
    const it1 = Ix.AsyncIterable.from(expected)[Symbol.asyncIterator]();
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
  }
});

function getValueByteLength(value: any) {
  if (value && value.buffer instanceof ArrayBuffer) {
    return value.byteLength;
  }
  return undefined;
}
