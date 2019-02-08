import { empty, from } from 'ix/asynciterable';
import { groupBy } from 'ix/asynciterable/operators';
import { hasNext, noNext } from '../asynciterablehelpers';

interface Employee {
  name: string;
  age: number;
}

test('AsyncIterable#groupBy normal', async () => {
  const xs = [
    { name: 'Bart', age: 27 },
    { name: 'John', age: 62 },
    { name: 'Eric', age: 27 },
    { name: 'Lisa', age: 14 },
    { name: 'Brad', age: 27 },
    { name: 'Lisa', age: 23 },
    { name: 'Eric', age: 42 }
  ];
  const xss = from<Employee, Employee>(xs);
  const ys = xss.pipe(groupBy(async x => Math.floor(x.age / 10)));

  const it = ys[Symbol.asyncIterator]();
  let next = await it.next();
  expect(next.done).toBeFalsy();
  expect(next.value.key).toBe(2);
  const g1 = next.value[Symbol.asyncIterator]();
  await hasNext(g1, xs[0]);
  await hasNext(g1, xs[2]);
  await hasNext(g1, xs[4]);
  await hasNext(g1, xs[5]);
  await noNext(g1);

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(next.value.key).toBe(6);
  const g2 = next.value[Symbol.asyncIterator]();
  await hasNext(g2, xs[1]);
  await noNext(g2);

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(next.value.key).toBe(1);
  const g3 = next.value[Symbol.asyncIterator]();
  await hasNext(g3, xs[3]);
  await noNext(g3);

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(next.value.key).toBe(4);
  const g4 = next.value[Symbol.asyncIterator]();
  await hasNext(g4, xs[6]);
  await noNext(g4);

  await noNext(it);
});

test('AsyncIterable#groupBy normal can get results later', async () => {
  const xs = [
    { name: 'Bart', age: 27 },
    { name: 'John', age: 62 },
    { name: 'Eric', age: 27 },
    { name: 'Lisa', age: 14 },
    { name: 'Brad', age: 27 },
    { name: 'Lisa', age: 23 },
    { name: 'Eric', age: 42 }
  ];
  const xss = from<Employee, Employee>(xs);
  const ys = xss.pipe(groupBy(async x => Math.floor(x.age / 10)));

  const it = ys[Symbol.asyncIterator]();
  const g1 = await it.next();
  expect(g1.done).toBeFalsy();
  expect(g1.value.key).toBe(2);

  const g2 = await it.next();
  expect(g2.done).toBeFalsy();
  expect(g2.value.key).toBe(6);

  const g3 = await it.next();
  expect(g3.done).toBeFalsy();
  expect(g3.value.key).toBe(1);

  const g4 = await it.next();
  expect(g4.done).toBeFalsy();
  expect(g4.value.key).toBe(4);

  await noNext(it);

  const g1it = g1.value[Symbol.asyncIterator]();
  await hasNext(g1it, xs[0]);
  await hasNext(g1it, xs[2]);
  await hasNext(g1it, xs[4]);
  await hasNext(g1it, xs[5]);
  await noNext(g1it);

  const g2it = g2.value[Symbol.asyncIterator]();
  await hasNext(g2it, xs[1]);
  await noNext(g2it);

  const g3it = g3.value[Symbol.asyncIterator]();
  await hasNext(g3it, xs[3]);
  await noNext(g3it);

  const g4it = g4.value[Symbol.asyncIterator]();
  await hasNext(g4it, xs[6]);
  await noNext(g4it);
});

test('AsyncIterable#groupBy empty', async () => {
  const xs = empty<number>();
  const ys = xs.pipe(groupBy(x => x));

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#groupBy element selector', async () => {
  const xs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const xss = from<number, number>(xs);
  const ys = xss.pipe(groupBy(async x => x % 3, x => String.fromCharCode(97 + x)));

  const it = ys[Symbol.asyncIterator]();

  let next = await it.next();
  expect(next.done).toBeFalsy();
  const g1 = next.value;
  expect(g1.key).toBe(0);
  const g1it = g1[Symbol.asyncIterator]();
  await hasNext(g1it, 'a');
  await hasNext(g1it, 'd');
  await hasNext(g1it, 'g');
  await hasNext(g1it, 'j');
  await noNext(g1it);

  next = await it.next();
  expect(next.done).toBeFalsy();
  const g2 = next.value;
  expect(g2.key).toBe(1);
  const g2it = g2[Symbol.asyncIterator]();
  await hasNext(g2it, 'b');
  await hasNext(g2it, 'e');
  await hasNext(g2it, 'h');
  await noNext(g2it);

  next = await it.next();
  expect(next.done).toBeFalsy();
  const g3 = next.value;
  expect(g3.key).toBe(2);
  const g3it = g3[Symbol.asyncIterator]();
  await hasNext(g3it, 'c');
  await hasNext(g3it, 'f');
  await hasNext(g3it, 'i');
  await noNext(g3it);

  await noNext(it);
});

test('AsyncIterable#groupBy result selector', async () => {
  const xs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const xss = from<number, number>(xs);
  const ys = xss.pipe(
    groupBy(async x => x % 3, x => String.fromCharCode(97 + x), (k, v) => ({ k, v: from(v) }))
  );

  const it = ys[Symbol.asyncIterator]();

  let next = await it.next();
  expect(next.done).toBeFalsy();
  const g1 = next.value;
  expect(g1.k).toBe(0);
  const g1it = g1.v[Symbol.asyncIterator]();
  await hasNext(g1it, 'a');
  await hasNext(g1it, 'd');
  await hasNext(g1it, 'g');
  await hasNext(g1it, 'j');
  await noNext(g1it);

  next = await it.next();
  expect(next.done).toBeFalsy();
  const g2 = next.value;
  expect(g2.k).toBe(1);
  const g2it = g2.v[Symbol.asyncIterator]();
  await hasNext(g2it, 'b');
  await hasNext(g2it, 'e');
  await hasNext(g2it, 'h');
  await noNext(g2it);

  next = await it.next();
  expect(next.done).toBeFalsy();
  const g3 = next.value;
  expect(g3.k).toBe(2);
  const g3it = g3.v[Symbol.asyncIterator]();
  await hasNext(g3it, 'c');
  await hasNext(g3it, 'f');
  await hasNext(g3it, 'i');
  await noNext(g3it);

  await noNext(it);
});
