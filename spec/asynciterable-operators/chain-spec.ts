import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.chain]);
const { empty } = Ix.asynciterable;
import { noNext } from '../asynciterablehelpers';

test('Itearble#chain calls function immediately', async (t, [chain]) => {
  let called = false;
  const xs = chain(empty<number>(), x => { called = true; return x; });
  t.true(called);

  const it = xs[Symbol.asyncIterator]();
  await noNext(t, it);

  t.end();
});
