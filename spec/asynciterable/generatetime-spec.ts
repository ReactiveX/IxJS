import * as Ix from '../Ix';
import * as test from 'tape-async';
const { generateTime } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#generateTime generateTimes normal sequence', async t => {
  const xs = generateTime(
    0,
    async x => x < 5,
    async x => x + 1,
    async x => x * x,
    async x => x * 100
  );

  const it = xs[Symbol.asyncIterator]();
  await hasNext(t, it, 0);
  await hasNext(t, it, 1);
  await hasNext(t, it, 4);
  await hasNext(t, it, 9);
  await hasNext(t, it, 16);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#generateTime condition throws', async t => {
  const err = new Error();
  const xs = generateTime(
    0,
    async x => { throw err; },
    async x => x + 1,
    async x => x * x,
    async x => x * 100
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#generateTime increment throws', async t => {
  const err = new Error();
  const xs = generateTime(
    0,
    async x => x < 5,
    async x => { throw err; },
    async x => x * x,
    async x => x * 100
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#generateTime result selector throws', async t => {
  const err = new Error();
  const xs = generateTime(
    0,
    async x => x < 5,
    async x => x + 1,
    async x => { throw err; },
    async x => x * 100
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#generateTime time selector throws', async t => {
  const err = new Error();
  const xs = generateTime(
    0,
    async x => x < 5,
    async x => x + 1,
    async x => x * x,
    async x => { throw err; }
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});
