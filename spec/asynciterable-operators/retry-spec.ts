import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.retry]);
const { concat } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
import { hasNext } from '../asynciterablehelpers';

test('AsyncIterable#retry infinite no errors does not retry', async ([retry]) => {
  const xs = range(0, 10);

  const res = retry(xs);
  expect(await sequenceEqual(res, xs)).toBeTruthy();
});

test('AsyncIterable#retry finite no errors does not retry', async ([retry]) => {
  const xs = range(0, 10);

  const res = retry(xs, 2);
  expect(await sequenceEqual(res, xs)).toBeTruthy();
});

test('AsyncIterable#retry finite eventually gives up', async ([retry]) => {
  const err = new Error();
  const xs = concat(range(0, 2), _throw(err));

  const res = retry(xs, 2);
  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 0);
  await hasNext(it, 1);
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});
