import { hasNext, noNext } from '../iterablehelpers';
import { flatMap } from 'ix/iterable/operators';
import { as, range, throwError } from 'ix/iterable';

test('Iterable#flatMap with range', () => {
  const xs = as([1, 2, 3]);
  const ys = xs.pipe(flatMap((x) => range(0, x)));

  const it = ys[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#flatMap selector returns throw', () => {
  const err = new Error();
  const xs = as([1, 2, 3]);
  const ys = xs.pipe(flatMap((x) => (x < 3 ? range(0, x) : throwError(err))));

  const it = ys[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 0);
  hasNext(it, 1);
  expect(() => it.next()).toThrow();
});

test('Iterable#flatMap with error throws', () => {
  const err = new Error();
  const xs = throwError(err);
  const ys = xs.pipe(flatMap((x) => range(0, x)));

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#flatMap selector throws error', () => {
  const err = new Error();
  const xs = as([1, 2, 3]);
  const ys = xs.pipe(
    flatMap((x) => {
      if (x < 3) {
        return range(0, x);
      }
      throw err;
    })
  );

  const it = ys[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 0);
  hasNext(it, 1);
  expect(() => it.next()).toThrow();
});
