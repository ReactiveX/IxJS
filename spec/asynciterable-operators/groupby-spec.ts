import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.asynciterable;
const { from } = Ix.asynciterable;
const { groupBy } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

interface Employee {
  name: string;
  age: number;
}

test('AsyncIterable#groupBy normal', async t => {
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
  const ys = groupBy(xss, async x => Math.floor(x.age / 10));

  const it = ys[Symbol.asyncIterator]();
  let next = await it.next();
  t.false(next.done);
  t.equal(next.value.key, 2);
  const g1 = next.value[Symbol.asyncIterator]();
  await hasNext(t, g1, xs[0]);
  await hasNext(t, g1, xs[2]);
  await hasNext(t, g1, xs[4]);
  await hasNext(t, g1, xs[5]);
  await noNext(t, g1);

  next = await it.next();
  t.false(next.done);
  t.equal(next.value.key, 6);
  const g2 = next.value[Symbol.asyncIterator]();
  await hasNext(t, g2, xs[1]);
  await noNext(t, g2);

  next = await it.next();
  t.false(next.done);
  t.equal(next.value.key, 1);
  const g3 = next.value[Symbol.asyncIterator]();
  await hasNext(t, g3, xs[3]);
  await noNext(t, g3);

  next = await it.next();
  t.false(next.done);
  t.equal(next.value.key, 4);
  const g4 = next.value[Symbol.asyncIterator]();
  await hasNext(t, g4, xs[6]);
  await noNext(t, g4);

  await noNext(t, it);
  t.end();
});

test('AsyncIterable#groupBy normal can get results later', async t => {
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
  const ys = groupBy(xss, async x => Math.floor(x.age / 10));

  const it = ys[Symbol.asyncIterator]();
  const g1 = await it.next();
  t.false(g1.done);
  t.equal(g1.value.key, 2);

  const g2 = await it.next();
  t.false(g2.done);
  t.equal(g2.value.key, 6);

  const g3 = await it.next();
  t.false(g3.done);
  t.equal(g3.value.key, 1);

  const g4 = await it.next();
  t.false(g4.done);
  t.equal(g4.value.key, 4);

  await noNext(t, it);

  const g1it = g1.value[Symbol.asyncIterator]();
  await hasNext(t, g1it, xs[0]);
  await hasNext(t, g1it, xs[2]);
  await hasNext(t, g1it, xs[4]);
  await hasNext(t, g1it, xs[5]);
  await noNext(t, g1it);

  const g2it = g2.value[Symbol.asyncIterator]();
  await hasNext(t, g2it, xs[1]);
  await noNext(t, g2it);

  const g3it = g3.value[Symbol.asyncIterator]();
  await hasNext(t, g3it, xs[3]);
  await noNext(t, g3it);

  const g4it = g4.value[Symbol.asyncIterator]();
  await hasNext(t, g4it, xs[6]);
  await noNext(t, g4it);

  t.end();
});

test('AsyncIterable#groupBy empty', async t => {
  const xs = empty<number>();
  const ys = groupBy(xs, x => x);

  const it = ys[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#groupBy element selector', async t => {
  const xs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const xss = from<number, number>(xs);
  const ys = groupBy(xss, async x => x % 3, x => String.fromCharCode(97 + x));

  const it = ys[Symbol.asyncIterator]();

  let next = await it.next();
  t.false(next.done);
  const g1 = next.value;
  t.equal(g1.key, 0);
  const g1it = g1[Symbol.asyncIterator]();
  await hasNext(t, g1it, 'a');
  await hasNext(t, g1it, 'd');
  await hasNext(t, g1it, 'g');
  await hasNext(t, g1it, 'j');
  await noNext(t, g1it);

  next = await it.next();
  t.false(next.done);
  const g2 = next.value;
  t.equal(g2.key, 1);
  const g2it = g2[Symbol.asyncIterator]();
  await hasNext(t, g2it, 'b');
  await hasNext(t, g2it, 'e');
  await hasNext(t, g2it, 'h');
  await noNext(t, g2it);

  next = await it.next();
  t.false(next.done);
  const g3 = next.value;
  t.equal(g3.key, 2);
  const g3it = g3[Symbol.asyncIterator]();
  await hasNext(t, g3it, 'c');
  await hasNext(t, g3it, 'f');
  await hasNext(t, g3it, 'i');
  await noNext(t, g3it);

  await noNext(t, it);

  t.end();
});

test('AsyncIterable#groupBy result selector', async t => {
  const xs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const xss = from<number, number>(xs);
  const ys = groupBy(xss, async x => x % 3, x => String.fromCharCode(97 + x), (k, v) => ({ k, v: from(v) }));

  const it = ys[Symbol.asyncIterator]();

  let next = await it.next();
  t.false(next.done);
  const g1 = next.value;
  t.equal(g1.k, 0);
  const g1it = g1.v[Symbol.asyncIterator]();
  await hasNext(t, g1it, 'a');
  await hasNext(t, g1it, 'd');
  await hasNext(t, g1it, 'g');
  await hasNext(t, g1it, 'j');
  await noNext(t, g1it);

  next = await it.next();
  t.false(next.done);
  const g2 = next.value;
  t.equal(g2.k, 1);
  const g2it = g2.v[Symbol.asyncIterator]();
  await hasNext(t, g2it, 'b');
  await hasNext(t, g2it, 'e');
  await hasNext(t, g2it, 'h');
  await noNext(t, g2it);

  next = await it.next();
  t.false(next.done);
  const g3 = next.value;
  t.equal(g3.k, 2);
  const g3it = g3.v[Symbol.asyncIterator]();
  await hasNext(t, g3it, 'c');
  await hasNext(t, g3it, 'f');
  await hasNext(t, g3it, 'i');
  await noNext(t, g3it);

  await noNext(t, it);

  t.end();
});
