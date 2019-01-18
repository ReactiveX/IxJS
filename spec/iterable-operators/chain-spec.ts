import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.chain]);
const { empty } = Ix.iterable;
import { noNext } from '../iterablehelpers';

test('Itearble#chain calls function immediately', ([chain]) => {
  let called = false;
  const xs = chain(empty<number>(), x => {
    called = true;
    return x;
  });
  expect(called).toBeTruthy();

  const it = xs[Symbol.iterator]();
  noNext(it);
});
