import { hasNext, noNext } from '../iterablehelpers.js';
import { as, empty } from 'ix/iterable/index.js';
import { groupBy } from 'ix/iterable/operators/index.js';

test('Iterable#groupBy normal', () => {
  const xs = [
    { name: 'Bart', age: 27 },
    { name: 'John', age: 62 },
    { name: 'Eric', age: 27 },
    { name: 'Lisa', age: 14 },
    { name: 'Brad', age: 27 },
    { name: 'Lisa', age: 23 },
    { name: 'Eric', age: 42 },
  ];
  const ys = as(xs).pipe(groupBy((x) => Math.floor(x.age / 10)));

  const it = ys[Symbol.iterator]();
  let next = it.next();
  expect(next.done).toBeFalsy();
  expect(next.value.key).toBe(2);
  const g1 = next.value[Symbol.iterator]();
  hasNext(g1, xs[0]);
  hasNext(g1, xs[2]);
  hasNext(g1, xs[4]);
  hasNext(g1, xs[5]);
  noNext(g1);

  next = it.next();
  expect(next.done).toBeFalsy();
  expect(next.value.key).toBe(6);
  const g2 = next.value[Symbol.iterator]();
  hasNext(g2, xs[1]);
  noNext(g2);

  next = it.next();
  expect(next.done).toBeFalsy();
  expect(next.value.key).toBe(1);
  const g3 = next.value[Symbol.iterator]();
  hasNext(g3, xs[3]);
  noNext(g3);

  next = it.next();
  expect(next.done).toBeFalsy();
  expect(next.value.key).toBe(4);
  const g4 = next.value[Symbol.iterator]();
  hasNext(g4, xs[6]);
  noNext(g4);

  noNext(it);
});

test('Iterable#groupBy normal can get results later', () => {
  const xs = [
    { name: 'Bart', age: 27 },
    { name: 'John', age: 62 },
    { name: 'Eric', age: 27 },
    { name: 'Lisa', age: 14 },
    { name: 'Brad', age: 27 },
    { name: 'Lisa', age: 23 },
    { name: 'Eric', age: 42 },
  ];
  const ys = as(xs).pipe(groupBy((x) => Math.floor(x.age / 10)));

  const it = ys[Symbol.iterator]();
  const g1 = it.next();
  expect(g1.done).toBeFalsy();
  expect(g1.value.key).toBe(2);

  const g2 = it.next();
  expect(g2.done).toBeFalsy();
  expect(g2.value.key).toBe(6);

  const g3 = it.next();
  expect(g3.done).toBeFalsy();
  expect(g3.value.key).toBe(1);

  const g4 = it.next();
  expect(g4.done).toBeFalsy();
  expect(g4.value.key).toBe(4);

  noNext(it);

  const g1it = g1.value[Symbol.iterator]();
  hasNext(g1it, xs[0]);
  hasNext(g1it, xs[2]);
  hasNext(g1it, xs[4]);
  hasNext(g1it, xs[5]);
  noNext(g1it);

  const g2it = g2.value[Symbol.iterator]();
  hasNext(g2it, xs[1]);
  noNext(g2it);

  const g3it = g3.value[Symbol.iterator]();
  hasNext(g3it, xs[3]);
  noNext(g3it);

  const g4it = g4.value[Symbol.iterator]();
  hasNext(g4it, xs[6]);
  noNext(g4it);
});

test('Iterable#groupBy empty', () => {
  const xs = empty();
  const ys = xs.pipe(groupBy((x) => x));

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#groupBy element selector', () => {
  const xs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const ys = as(xs).pipe(
    groupBy(
      (x) => x % 3,
      (x) => String.fromCharCode(97 + x)
    )
  );

  const it = ys[Symbol.iterator]();

  let next = it.next();
  expect(next.done).toBeFalsy();
  const g1 = next.value;
  expect(g1.key).toBe(0);
  const g1it = g1[Symbol.iterator]();
  hasNext(g1it, 'a');
  hasNext(g1it, 'd');
  hasNext(g1it, 'g');
  hasNext(g1it, 'j');
  noNext(g1it);

  next = it.next();
  expect(next.done).toBeFalsy();
  const g2 = next.value;
  expect(g2.key).toBe(1);
  const g2it = g2[Symbol.iterator]();
  hasNext(g2it, 'b');
  hasNext(g2it, 'e');
  hasNext(g2it, 'h');
  noNext(g2it);

  next = it.next();
  expect(next.done).toBeFalsy();
  const g3 = next.value;
  expect(g3.key).toBe(2);
  const g3it = g3[Symbol.iterator]();
  hasNext(g3it, 'c');
  hasNext(g3it, 'f');
  hasNext(g3it, 'i');
  noNext(g3it);

  noNext(it);
});
