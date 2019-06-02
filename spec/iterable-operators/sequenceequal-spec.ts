import { empty, throwError, sequenceEqual } from 'ix/iterable';

test('Iterable#sequenceEqual sequence equals itself', () => {
  const xs = [1, 2, 3];

  expect(sequenceEqual(xs, xs)).toBeTruthy();
});

test('Iterable#sequenceEqual empty sequence equals itself', () => {
  const xs = empty<number>();
  const ys = empty<number>();

  expect(sequenceEqual(xs, ys)).toBeTruthy();
});

test('Iterable#sequenceEqual two different sequences not equal', () => {
  const xs = [1, 2, 3];
  const ys = [1, 3, 2];

  expect(sequenceEqual(xs, ys)).toBeFalsy();
});

test('Iterable#sequenceEqual left longer than right not equal', () => {
  const xs = [1, 2, 3, 4];
  const ys = [1, 2, 3];

  expect(sequenceEqual(xs, ys)).toBeFalsy();
});

test('Iterable#sequenceEqual right longer than left not equal', () => {
  const xs = [1, 2, 3];
  const ys = [1, 2, 3, 4];

  expect(sequenceEqual(xs, ys)).toBeFalsy();
});

test('Iterable#sequenceEqual left throws', () => {
  const xs = throwError<number>(new Error());
  const ys = [1, 2, 3];

  expect(() => sequenceEqual(xs, ys)).toThrow();
});

test('Iterable#sequenceEqual right throws', () => {
  const xs = [1, 2, 3];
  const ys = throwError<number>(new Error());

  expect(() => sequenceEqual(xs, ys)).toThrow();
});

test('Iterable#sequenceEqual with ccustom omparer sequence equals itself', () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3];

  expect(sequenceEqual(xs, xs, comparer)).toBeTruthy();
});

test('Iterable#sequenceEqual with custom comparer empty sequence equals itself', () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = empty<number>();
  const ys = empty<number>();

  expect(sequenceEqual(xs, ys, comparer)).toBeTruthy();
});

test('Iterable#sequenceEqual with custom comparer two different sequences not equal', () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3];
  const ys = [1, 3, 2];

  expect(sequenceEqual(xs, ys, comparer)).toBeFalsy();
});

test('Iterable#sequenceEqual with custom comparer left longer than right not equal', () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3, 4];
  const ys = [1, 2, 3];

  expect(sequenceEqual(xs, ys, comparer)).toBeFalsy();
});

test('Iterable#sequenceEqual with custom comparer right longer than left not equal', () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3];
  const ys = [1, 2, 3, 4];

  expect(sequenceEqual(xs, ys, comparer)).toBeFalsy();
});

test('Iterable#sequenceEqual with custom comparer left throws', () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = throwError<number>(new Error());
  const ys = [1, 2, 3];

  expect(() => sequenceEqual(xs, ys, comparer)).toThrow();
});

test('Iterable#sequenceEqual with custom comparer right throws', () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3];
  const ys = throwError<number>(new Error());

  expect(() => sequenceEqual(xs, ys, comparer)).toThrow();
});

test('Itearble#sequenceEqual with custom comparer should be equal', () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, -3, 4];
  const ys = [1, -2, 3, 4];

  expect(sequenceEqual(xs, ys, comparer)).toBeTruthy();
});

test('Itearble#sequenceEqual with custom comparer throws', () => {
  const comparer = (_x: number, _y: number) => {
    throw new Error();
  };
  const xs = [1, 2, -3, 4];
  const ys = [1, -2, 3, 4];

  expect(() => sequenceEqual(xs, ys, comparer)).toThrow();
});
