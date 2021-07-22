import { hasNext, noNext } from '../asynciterablehelpers';
import { AsyncSink } from 'ix/asynciterable';

test('AsyncSink writes before next', async () => {
  const a = new AsyncSink<number>();

  a.write(1);
  a.write(2);
  a.write(3);
  a.end();

  const it = a[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncSink writes and errors before next', async () => {
  const err = new Error();
  const a = new AsyncSink<number>();

  a.write(1);
  a.write(2);
  a.write(3);
  a.error(err);
  a.end();

  const it = a[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await expect(it.next()).rejects.toThrow(err);
});

test('AsyncSink writes after next', async () => {
  const a = new AsyncSink<number>();

  const asyncResults = Promise.all([a.next(), a.next(), a.next()]);
  a.write(1);
  a.write(2);
  a.write(3);

  const results = await asyncResults;
  const mappedResults = results.map((x) => x.value);
  expect(mappedResults).toEqual([1, 2, 3]);
});

test('AsyncSink writes and error after next', async () => {
  const err = new Error();
  const a = new AsyncSink<number>();

  const asyncResults = Promise.all([a.next(), a.next(), a.next()]);
  a.write(1);
  a.write(2);
  a.error(err);

  await expect(asyncResults).rejects.toThrow(err);
});
