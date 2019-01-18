import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.zip]);
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#zip equal length', ([zip]) => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6];
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(it, 1 * 4);
  hasNext(it, 2 * 5);
  hasNext(it, 3 * 6);
  noNext(it);
});

test('Iterable#zip left longer', ([zip]) => {
  const xs = [1, 2, 3, 4];
  const ys = [4, 5, 6];
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(it, 1 * 4);
  hasNext(it, 2 * 5);
  hasNext(it, 3 * 6);
  noNext(it);
});

test('Iterable#zip right longer', ([zip]) => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6, 7];
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(it, 1 * 4);
  hasNext(it, 2 * 5);
  hasNext(it, 3 * 6);
  noNext(it);
});

test('Iterable#zip multiple sources', ([zip]) => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6, 7];
  const zs = [8, 9, 10];
  const res = zip(([x, y, z]) => x * y * z, xs, ys, zs);

  const it = res[Symbol.iterator]();
  hasNext(it, 1 * 4 * 8);
  hasNext(it, 2 * 5 * 9);
  hasNext(it, 3 * 6 * 10);
  noNext(it);
});

test('Iterable#zip left throws', ([zip]) => {
  const xs = _throw<number>(new Error());
  const ys = [4, 5, 6];
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#zip right throws', ([zip]) => {
  const xs = [1, 2, 3];
  const ys = _throw<number>(new Error());
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#zip selector throws', ([zip]) => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6];
  const res = zip(
    ([x, y]) => {
      if (x > 0) {
        throw new Error();
      }
      return x * y;
    },
    xs,
    ys
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
