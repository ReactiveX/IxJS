import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.innerJoin]);
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#innerJoin normal', ([innerJoin]) => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = innerJoin(xs, ys, x => x % 3, y => y % 3, (x, y) => x + y);

  const it = res[Symbol.iterator]();
  hasNext(it, 0 + 3);
  hasNext(it, 0 + 6);
  hasNext(it, 1 + 4);
  noNext(it);
});

test('Iterable#innerJoin reversed', ([innerJoin]) => {
  const xs = [3, 6, 4];
  const ys = [0, 1, 2];
  const res = innerJoin(xs, ys, x => x % 3, y => y % 3, (x, y) => x + y);

  const it = res[Symbol.iterator]();
  hasNext(it, 3 + 0);
  hasNext(it, 6 + 0);
  hasNext(it, 4 + 1);
  noNext(it);
});

test('Iterable#innerJoin only one group matches', ([innerJoin]) => {
  const xs = [0, 1, 2];
  const ys = [3, 6];
  const res = innerJoin(xs, ys, x => x % 3, y => y % 3, (x, y) => x + y);

  const it = res[Symbol.iterator]();
  hasNext(it, 0 + 3);
  hasNext(it, 0 + 6);
  noNext(it);
});

test('Iterable#innerJoin only one group matches reversed', ([innerJoin]) => {
  const xs = [3, 6];
  const ys = [0, 1, 2];
  const res = innerJoin(xs, ys, x => x % 3, y => y % 3, (x, y) => x + y);

  const it = res[Symbol.iterator]();
  hasNext(it, 3 + 0);
  hasNext(it, 6 + 0);
  noNext(it);
});

test('Iterable#innerJoin left throws', ([innerJoin]) => {
  const xs = _throw<number>(new Error());
  const ys = [3, 6, 4];
  const res = innerJoin(xs, ys, x => x % 3, y => y % 3, (x, y) => x + y);

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#innerJoin right throws', ([innerJoin]) => {
  const xs = [0, 1, 2];
  const ys = _throw<number>(new Error());
  const res = innerJoin(xs, ys, x => x % 3, y => y % 3, (x, y) => x + y);

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#innerJoin left selector throws', ([innerJoin]) => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = innerJoin(
    xs,
    ys,
    _ => {
      throw new Error();
    },
    y => y % 3,
    (x, y) => x + y
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#join right selector throws', ([innerJoin]) => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = innerJoin(
    xs,
    ys,
    x => x % 3,
    _ => {
      throw new Error();
    },
    (x, y) => x + y
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#innerJoin result selector throws', ([innerJoin]) => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = innerJoin(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (_x, _y) => {
      throw new Error();
    }
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
