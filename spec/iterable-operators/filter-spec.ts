import { hasNext, noNext } from '../iterablehelpers.js';
import { filter } from 'ix/iterable/operators/index.js';
import { empty, throwError } from 'ix/iterable/index.js';

test('Iterable#filter', () => {
  const xs = [8, 5, 7, 4, 6, 9, 2, 1, 0];
  const ys = filter<number>((x) => x % 2 === 0)(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 8);
  hasNext(it, 4);
  hasNext(it, 6);
  hasNext(it, 2);
  hasNext(it, 0);
  noNext(it);
});

test('Iterable#filter with index', () => {
  const xs = [8, 5, 7, 4, 6, 9, 2, 1, 0];
  const ys = filter<number>((_, i) => i % 2 === 0)(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 8);
  hasNext(it, 7);
  hasNext(it, 6);
  hasNext(it, 2);
  hasNext(it, 0);
  noNext(it);
});

test('Iterable#filter with typeguard', () => {
  const xs = ['8', 5, '7', 4, '6', 9, '2', 1, '0'];
  const ys: Iterable<string> = filter<number | string, string>(
    (x): x is string => typeof x === 'string'
  )(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, '8');
  hasNext(it, '7');
  hasNext(it, '6');
  hasNext(it, '2');
  hasNext(it, '0');
  noNext(it);
});

test('Iterable#filter throws part way through', () => {
  const xs = [8, 5, 7, 4, 6, 9, 2, 1, 0];
  const err = new Error();
  const ys = filter((x) => {
    if (x === 4) {
      throw err;
    }
    return true;
  })(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 8);
  hasNext(it, 5);
  hasNext(it, 7);
  expect(() => it.next()).toThrow();
});

test('Iterable#filter with index throws part way through', () => {
  const xs = [8, 5, 7, 4, 6, 9, 2, 1, 0];
  const err = new Error();
  const ys = filter((_, i) => {
    if (i === 3) {
      throw err;
    }
    return true;
  })(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 8);
  hasNext(it, 5);
  hasNext(it, 7);
  expect(() => it.next()).toThrow();
});

test('Iterable#filter with error source', () => {
  const xs = throwError(new Error());
  const ys = xs.pipe(filter((x) => x % 2 === 0));

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#filter with empty source', () => {
  const xs = empty();
  const ys = xs.pipe(filter((x) => x % 2 === 0));

  const it = ys[Symbol.iterator]();
  noNext(it);
});
