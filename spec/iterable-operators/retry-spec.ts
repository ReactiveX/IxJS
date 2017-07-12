import * as Ix from '../Ix';
import * as test from 'tape';
const { concat } = Ix.iterable;
const { range } = Ix.iterable;
const { retry } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext } from '../iterablehelpers';

test('Iterable#retry infinite no errors does not retry', t => {
  const xs = range(0, 10);

  const res = retry(xs);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('Iterable#retry finite no errors does not retry', t => {
  const xs = range(0, 10);

  const res = retry(xs, 2);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('Iterable#retry finite eventually gives up', t => {
  const err = new Error();
  const xs = concat(range(0, 2), _throw(err));

  const res = retry(xs, 2);
  const it = res[Symbol.iterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  t.throws(() => it.next());
  t.end();
});
