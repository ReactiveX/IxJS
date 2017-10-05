import * as Ix from '../Ix';
import * as test from 'tape-async';
const { sequenceEqual } = Ix.iterable;
const { toArray } = Ix.iterable;

test('Iterable#toArray some', t => {
  const xs = [42, 25, 39];
  const res = toArray(xs);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('Iterable#toArray empty', t => {
  const res = toArray<number>([]);
  t.equal(res.length, 0);
  t.end();
});
