import * as Ix from '../Ix';
import symbolObservable from 'symbol-observable';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.toObservable]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;

test('AsyncIterable#toObservable empty', async ([toObservable]) => {
  const xs = empty<number>();
  const ys = toObservable(xs);
  let fail = false;

  ys.subscribe({
    next: (_value: number) => {
      fail = true;
    },
    error: (_err: any) => {
      fail = true;
    },
    complete: () => {
      expect(fail).toBeFalsy();
    }
  });
});

test('AsyncIterable#toObservable non-empty', async ([toObservable]) => {
  const results: number[] = [];
  const xs = of(1, 2, 3);
  const ys = toObservable(xs);
  let fail = false;

  ys.subscribe({
    next: (value: number) => {
      results.push(value);
    },
    error: (_err: any) => {
      fail = true;
    },
    complete: () => {
      expect(results).toEqual([1, 2, 3]);
      expect(fail).toBeFalsy();
    }
  });
});

test('AsyncIterable#toObservable error', async ([toObservable]) => {
  const error = new Error();
  const xs = _throw<number>(error);
  const ys = toObservable(xs);
  let fail = false;

  ys.subscribe({
    next: (_value: number) => {
      fail = true;
    },
    error: (err: any) => {
      expect(err).toEqual(error);
      expect(fail).toBeFalsy();
    },
    complete: () => {
      fail = true;
    }
  });
});

test('AsyncIterable#toObservable Symbol.observable should return same instance', async ([
  toObservable
]) => {
  const ys = toObservable(empty<number>());
  expect(ys).toBe((<any>ys)[symbolObservable]());
});
