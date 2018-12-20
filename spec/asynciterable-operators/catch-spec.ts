import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable._catch]);
const { concat } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
import { hasNext } from '../asynciterablehelpers';

test('AsyncIterable#catch with no errors', async ([_catch]) => {
  const res = _catch(range(0, 5), range(5, 5));
  expect(await sequenceEqual(res, range(0, 5))).toBeTruthy();
});

test('AsyncIterable#catch with concat error', async ([_catch]) => {
  const res = _catch(concat(range(0, 5), _throw(new Error())), range(5, 5));

  expect(await sequenceEqual(res, range(0, 10))).toBeTruthy();
});

test('AsyncIterable#catch still throws', async ([_catch]) => {
  const e1 = new Error();
  const er1 = _throw(e1);

  const e2 = new Error();
  const er2 = _throw(e2);

  const e3 = new Error();
  const er3 = _throw(e3);

  const res = _catch(concat(range(0, 2), er1), concat(range(2, 2), er2), er3);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
