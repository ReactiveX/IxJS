import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.chain]);
const { empty } = Ix.asynciterable;
import { noNext } from '../asynciterablehelpers';

test('Itearble#chain calls function immediately', async ([chain]) => {
  let called = false;
  const xs = chain(empty<number>(), x => {
    called = true;
    return x;
  });
  expect(called).toBeTruthy();

  const it = xs[Symbol.asyncIterator]();
  await noNext(it);
});
