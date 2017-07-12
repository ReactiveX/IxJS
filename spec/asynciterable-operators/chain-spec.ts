import * as Ix from '../Ix';
import * as test from 'tape';
const { empty } = Ix.asynciterable;
const { chain } = Ix.asynciterable;
import { noNext } from '../asynciterablehelpers';

test('Itearble#chain calls function immediately', async t => {
  let called = false;
  const xs = chain(empty<number>(), x => { called = true; return x; });
  t.true(called);

  const it = xs[Symbol.asyncIterator]();
  await noNext(t, it);

  t.end();
});
