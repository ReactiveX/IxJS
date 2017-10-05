import * as Ix from '../Ix';
import * as test from 'tape-async';
const { _for } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { toArray } = Ix.iterable;

test('Iterable#for behavior', t => {
  const res = toArray(_for([1,2,3], x => range(0, x)));
  t.true(sequenceEqual(res, [0,0,1,0,1,2]));
  t.end();
});
