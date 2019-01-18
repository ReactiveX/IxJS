import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.scan]);
const { of } = Ix.AsyncIterable;
const { range } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#scan no seed', async ([scan]) => {
  const res = scan(range(0, 5), async (n, x, i) => n + x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await hasNext(it, 6);
  await hasNext(it, 12);
  await hasNext(it, 20);
  await noNext(it);
});

test('AsyncIterable#scan with seed', async ([scan]) => {
  const res = scan(range(0, 5), async (n, x, i) => n - x - i, 20);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 20);
  await hasNext(it, 18);
  await hasNext(it, 14);
  await hasNext(it, 8);
  await hasNext(it, 0);
  await noNext(it);
});

test('AsyncIterable#scan no seed yields the value of single-element sources', async ([scan]) => {
  const res = scan(of(0), async (n, x, i) => n + x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await noNext(it);
});
