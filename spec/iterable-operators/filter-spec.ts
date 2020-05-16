import { hasNext, noNext } from '../iterablehelpers';
import { filter } from 'ix/iterable/operators';
import { empty, throwError } from 'ix/iterable';

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
  const xs = [
    new String('8'),
    5,
    new String('7'),
    4,
    new String('6'),
    9,
    new String('2'),
    1,
    new String('0'),
  ];
  const ys: Iterable<String> = filter<number | String, String>(
    (x): x is String => x instanceof String
  )(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, new String('8'));
  hasNext(it, new String('7'));
  hasNext(it, new String('6'));
  hasNext(it, new String('2'));
  hasNext(it, new String('0'));
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
