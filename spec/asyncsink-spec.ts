import * as Ix from './Ix';
import * as test from 'tape';
const { AsyncSink } = Ix;
import { hasNext, noNext } from './asynciterablehelpers';

test('AsyncSink writes before next', async t => {
  const a = new AsyncSink<number>();

  a.write(1);
  a.write(2);
  a.write(3);
  a.end();

  const it = a[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncSink writes and errors before next', async t => {
  const err = new Error();
  const a = new AsyncSink<number>();

  a.write(1);
  a.write(2);
  a.write(3);
  a.error(err);
  a.end();

  const it = a[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  try {
    await it.next();
  } catch (e) {
    t.equal(err, e);
  }
  t.end();
});

test('AsyncSink writes after next', async t => {
  const a = new AsyncSink<number>();

  const asyncResults = Promise.all([a.next(), a.next(), a.next()]);
  a.write(1);
  a.write(2);
  a.write(3);

  const results = await asyncResults;
  const mappedResults = results.map(x => x.value);
  t.deepEqual(mappedResults, [1, 2, 3]);
  t.end();
});

test('AsyncSink writes and error after next', async t => {
  const err = new Error();
  const a = new AsyncSink<number>();

  const asyncResults = Promise.all([a.next(), a.next(), a.next()]);
  a.write(1);
  a.write(2);
  a.error(err);

  try {
    await asyncResults;
  } catch (e) {
    t.equal(err, e);
  }
  t.end();
});
