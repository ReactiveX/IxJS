import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.groupJoin]);
const { reduce } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#groupJoin all groups have values', ([groupJoin]) => {
  const xs = [0, 1, 2];
  const ys = [4, 7, 6, 2, 3, 4, 8, 9];
  const res = groupJoin(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, i) => x + ' - ' + reduce(i, (s, j) => s + j, '')
  );

  const it = res[Symbol.iterator]();
  hasNext(it, '0 - 639');
  hasNext(it, '1 - 474');
  hasNext(it, '2 - 28');
  noNext(it);
});

test('Iterable#groupJoin some groups have values', ([groupJoin]) => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = groupJoin(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, i) => x + ' - ' + reduce(i, (s, j) => s + j, '')
  );

  const it = res[Symbol.iterator]();
  hasNext(it, '0 - 36');
  hasNext(it, '1 - 4');
  hasNext(it, '2 - ');
  noNext(it);
});

test('Iterable#groupJoin left throws', ([groupJoin]) => {
  const xs = _throw<number>(new Error());
  const ys = [3, 6, 4];
  const res = groupJoin(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, i) => x + ' - ' + reduce(i, (s, j) => s + j, '')
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#groupJoin right throws', ([groupJoin]) => {
  const xs = [0, 1, 2];
  const ys = _throw<number>(new Error());
  const res = groupJoin(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, i) => x + ' - ' + reduce(i, (s, j) => s + j, '')
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#groupJoin left selector throws', ([groupJoin]) => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = groupJoin(
    xs,
    ys,
    _ => {
      throw new Error();
    },
    y => y % 3,
    (x, i) => x + ' - ' + reduce(i, (s, j) => s + j, '')
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#groupJoin right selector throws', ([groupJoin]) => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = groupJoin(
    xs,
    ys,
    x => x % 3,
    _ => {
      throw new Error();
    },
    (x, i) => x + ' - ' + reduce(i, (s, j) => s + j, '')
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#groupJoin result selector eventually throws', ([groupJoin]) => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = groupJoin(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, i) => {
      if (x === 1) {
        throw new Error();
      }
      return x + ' - ' + reduce(i, (s, j) => s + j, '');
    }
  );

  const it = res[Symbol.iterator]();
  hasNext(it, '0 - 36');
  expect(() => it.next()).toThrow();
});
