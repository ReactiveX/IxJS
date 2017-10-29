import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.toObservable]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;

test('AsyncIterable#toObservable empty', async (t, [toObservable]) => {
  const xs = empty<number>();
  const ys = toObservable(xs);
  let fail = false;

  ys.subscribe({
    next: (value: number) => {
      fail = true;
    },
    error: (err: any) => {
      fail = true;
    },
    complete: () => {
      t.false(fail);
      t.end();
    }
  });
});

test('AsyncIterable#toObservable non-empty', async (t, [toObservable]) => {
  const results: number[] = [];
  const xs = of(1, 2, 3);
  const ys = toObservable(xs);
  let fail = false;

  ys.subscribe({
    next: (value: number) => {
      results.push(value);
    },
    error: (err: any) => {
      fail = true;
    },
    complete: () => {
      t.deepEqual(results, [1, 2, 3]);
      t.false(fail);
      t.end();
    }
  });
});

test('AsyncIterable#toObservable error', async (t, [toObservable]) => {
  const error = new Error();
  const xs = _throw<number>(error);
  const ys = toObservable(xs);
  let fail = false;

  ys.subscribe({
    next: (value: number) => {
      fail = true;
    },
    error: (err: any) => {
      t.same(err, error);
      t.false(fail);
      t.end();
    },
    complete: () => {
      fail = true;
    }
  });
});
