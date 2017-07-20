import * as Ix from '../Ix';
import * as test from 'tape';
const { empty } = Ix.asynciterable;
const { of } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
const { toObservable } = Ix.asynciterable;

test('AsyncIterable#toObservable empty', async t => {
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

test('AsyncIterable#toObservable non-empty', async t => {
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

test('AsyncIterable#toObservable error', async t => {
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