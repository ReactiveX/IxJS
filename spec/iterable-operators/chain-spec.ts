import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.iterable;
const { chain } = Ix.iterable;
import { noNext } from '../iterablehelpers';

test('Itearble#chain calls function immediately', t => {
  let called = false;
  const xs = chain(empty<number>(), x => { called = true; return x; });
  t.true(called);

  const it = xs[Symbol.iterator]();
  noNext(t, it);

  t.end();
});
