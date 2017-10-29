import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.retry]);
const { concat } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
import { hasNext } from '../asynciterablehelpers';

test('AsyncIterable#retry infinite no errors does not retry', async (t, [retry]) => {
  const xs = range(0, 10);

  const res = retry(xs);
  t.true(await sequenceEqual(res, xs));
  t.end();
});

test('AsyncIterable#retry finite no errors does not retry', async (t, [retry]) => {
  const xs = range(0, 10);

  const res = retry(xs, 2);
  t.true(await sequenceEqual(res, xs));
  t.end();
});

test('AsyncIterable#retry finite eventually gives up', async (t, [retry]) => {
  const err = new Error();
  const xs = concat(range(0, 2), _throw(err));

  const res = retry(xs, 2);
  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 0);
  await hasNext(t, it, 1);
  await hasNext(t, it, 0);
  await hasNext(t, it, 1);
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});
