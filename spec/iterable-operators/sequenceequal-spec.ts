import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.sequenceEqual]);
const { empty } = Ix.iterable;
const { _throw } = Ix.iterable;

test('Iterable#sequenceEqual sequence equals itself', ([sequenceEqual]) => {
  const xs = [1, 2, 3];

  expect(sequenceEqual(xs, xs)).toBeTruthy();
});

test('Iterable#sequenceEqual empty sequence equals itself', ([sequenceEqual]) => {
  const xs = empty<number>();
  const ys = empty<number>();

  expect(sequenceEqual(xs, ys)).toBeTruthy();
});

test('Iterable#sequenceEqual two different sequences not equal', ([sequenceEqual]) => {
  const xs = [1, 2, 3];
  const ys = [1, 3, 2];

  expect(sequenceEqual(xs, ys)).toBeFalsy();
});

test('Iterable#sequenceEqual left longer than right not equal', ([sequenceEqual]) => {
  const xs = [1, 2, 3, 4];
  const ys = [1, 2, 3];

  expect(sequenceEqual(xs, ys)).toBeFalsy();
});

test('Iterable#sequenceEqual right longer than left not equal', ([sequenceEqual]) => {
  const xs = [1, 2, 3];
  const ys = [1, 2, 3, 4];

  expect(sequenceEqual(xs, ys)).toBeFalsy();
});

test('Iterable#sequenceEqual left throws', ([sequenceEqual]) => {
  const xs = _throw<number>(new Error());
  const ys = [1, 2, 3];

  expect(() => sequenceEqual(xs, ys)).toThrow();
});

test('Iterable#sequenceEqual right throws', ([sequenceEqual]) => {
  const xs = [1, 2, 3];
  const ys = _throw<number>(new Error());

  expect(() => sequenceEqual(xs, ys)).toThrow();
});

test('Iterable#sequenceEqual with ccustom omparer sequence equals itself', ([sequenceEqual]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3];

  expect(sequenceEqual(xs, xs, comparer)).toBeTruthy();
});

test('Iterable#sequenceEqual with custom comparer empty sequence equals itself', ([
  sequenceEqual
]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = empty<number>();
  const ys = empty<number>();

  expect(sequenceEqual(xs, ys, comparer)).toBeTruthy();
});

test('Iterable#sequenceEqual with custom comparer two different sequences not equal', ([
  sequenceEqual
]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3];
  const ys = [1, 3, 2];

  expect(sequenceEqual(xs, ys, comparer)).toBeFalsy();
});

test('Iterable#sequenceEqual with custom comparer left longer than right not equal', ([
  sequenceEqual
]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3, 4];
  const ys = [1, 2, 3];

  expect(sequenceEqual(xs, ys, comparer)).toBeFalsy();
});

test('Iterable#sequenceEqual with custom comparer right longer than left not equal', ([
  sequenceEqual
]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3];
  const ys = [1, 2, 3, 4];

  expect(sequenceEqual(xs, ys, comparer)).toBeFalsy();
});

test('Iterable#sequenceEqual with custom comparer left throws', ([sequenceEqual]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = _throw<number>(new Error());
  const ys = [1, 2, 3];

  expect(() => sequenceEqual(xs, ys, comparer)).toThrow();
});

test('Iterable#sequenceEqual with custom comparer right throws', ([sequenceEqual]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3];
  const ys = _throw<number>(new Error());

  expect(() => sequenceEqual(xs, ys, comparer)).toThrow();
});

test('Itearble#sequenceEqual with custom comparer should be equal', ([sequenceEqual]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, -3, 4];
  const ys = [1, -2, 3, 4];

  expect(sequenceEqual(xs, ys, comparer)).toBeTruthy();
});

test('Itearble#sequenceEqual with custom comparer throws', ([sequenceEqual]) => {
  const comparer = (_x: number, _y: number) => {
    throw new Error();
  };
  const xs = [1, 2, -3, 4];
  const ys = [1, -2, 3, 4];

  expect(() => sequenceEqual(xs, ys, comparer)).toThrow();
});
