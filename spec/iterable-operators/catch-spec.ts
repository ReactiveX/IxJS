import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable._catch]);
const { concat } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext } from '../iterablehelpers';

test('Iterable#catch with no errors', ([_catch]) => {
  const res = _catch(range(0, 5), range(5, 5));
  expect(sequenceEqual(res, range(0, 5))).toBeTruthy();
});

test('Iterable#catch with concat error', ([_catch]) => {
  const res = _catch(concat(range(0, 5), _throw(new Error())), range(5, 5));

  expect(sequenceEqual(res, range(0, 10))).toBeTruthy();
});

test('Iterable#catch still throws', ([_catch]) => {
  const e1 = new Error();
  const er1 = _throw(e1);

  const e2 = new Error();
  const er2 = _throw(e2);

  const e3 = new Error();
  const er3 = _throw(e3);

  const res = _catch(concat(range(0, 2), er1), concat(range(2, 2), er2), er3);

  const it = res[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  expect(() => it.next()).toThrow();
});
