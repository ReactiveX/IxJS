import * as Ix from '../Ix';
import * as test from 'tape';
const { catchWith } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { single } = Ix.iterable;
const { _throw } = Ix.iterable;

test('Iterable#catchWith error catches', t => {
  const err = new Error();
  const res = single(catchWith(_throw(err), e => { t.same(err, e); return [42]; }));
  t.equal(42, res);
  t.end();
});

test('Iterable#catchWith no error misses', t => {
  const xs = range(0, 10);
  const res = catchWith(xs, e => { t.fail(); return [42]; });
  t.true(sequenceEqual(res, xs));
  t.end();
});
