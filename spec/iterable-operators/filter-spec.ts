import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.filter]);
const { empty } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#filter', ([filter]) => {
  const xs = [8, 5, 7, 4, 6, 9, 2, 1, 0];
  const ys = filter(xs, x => x % 2 === 0);

  const it = ys[Symbol.iterator]();
  hasNext(it, 8);
  hasNext(it, 4);
  hasNext(it, 6);
  hasNext(it, 2);
  hasNext(it, 0);
  noNext(it);
});

test('Iterable#filter with index', ([filter]) => {
  const xs = [8, 5, 7, 4, 6, 9, 2, 1, 0];
  const ys = filter(xs, (_, i) => i % 2 === 0);

  const it = ys[Symbol.iterator]();
  hasNext(it, 8);
  hasNext(it, 7);
  hasNext(it, 6);
  hasNext(it, 2);
  hasNext(it, 0);
  noNext(it);
});

test('Iterable#filter with typeguard', ([filter]) => {
  const xs = [
    new String('8'),
    5,
    new String('7'),
    4,
    new String('6'),
    9,
    new String('2'),
    1,
    new String('0')
  ];
  const ys: Iterable<String> = filter(xs, (x): x is String => x instanceof String);

  const it = ys[Symbol.iterator]();
  hasNext(it, new String('8'));
  hasNext(it, new String('7'));
  hasNext(it, new String('6'));
  hasNext(it, new String('2'));
  hasNext(it, new String('0'));
  noNext(it);
});

test('Iterable#filter throws part way through', ([filter]) => {
  const xs = [8, 5, 7, 4, 6, 9, 2, 1, 0];
  const err = new Error();
  const ys = filter(xs, x => {
    if (x === 4) {
      throw err;
    }
    return true;
  });

  const it = ys[Symbol.iterator]();
  hasNext(it, 8);
  hasNext(it, 5);
  hasNext(it, 7);
  expect(() => it.next()).toThrow();
});

test('Iterable#filter with index throws part way through', ([filter]) => {
  const xs = [8, 5, 7, 4, 6, 9, 2, 1, 0];
  const err = new Error();
  const ys = filter(xs, (_, i) => {
    if (i === 3) {
      throw err;
    }
    return true;
  });

  const it = ys[Symbol.iterator]();
  hasNext(it, 8);
  hasNext(it, 5);
  hasNext(it, 7);
  expect(() => it.next()).toThrow();
});

test('Iterable#filter with error source', ([filter]) => {
  const xs = _throw<number>(new Error());
  const ys = filter(xs, x => x % 2 === 0);

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#filter with empty source', ([filter]) => {
  const xs = empty<number>();
  const ys = filter(xs, x => x % 2 === 0);

  const it = ys[Symbol.iterator]();
  noNext(it);
});
