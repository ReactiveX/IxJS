import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable._finally]);
const { range } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#finally defers behavior', async ([_finally]) => {
  let done = false;

  const xs = _finally(range(0, 2), async () => (done = true));
  expect(done).toBeFalsy();

  const it = xs[Symbol.asyncIterator]();
  expect(done).toBeFalsy();

  await hasNext(it, 0);
  expect(done).toBeFalsy();

  await hasNext(it, 1);
  expect(done).toBeFalsy();

  await noNext(it);
  expect(done).toBeTruthy();
});

test('AsyncIterable#finally calls even with error', async ([_finally]) => {
  let done = false;

  const err = new Error();
  const xs = _finally(_throw(err), async () => (done = true));
  expect(done).toBeFalsy();

  const it = xs[Symbol.asyncIterator]();
  expect(done).toBeFalsy();

  try {
    await hasNext(it, 0);
  } catch (e) {
    expect(err).toEqual(e);
  }

  expect(done).toBeTruthy();
});
