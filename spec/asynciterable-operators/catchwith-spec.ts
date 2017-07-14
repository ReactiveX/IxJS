import * as Ix from '../Ix';
import * as test from 'tape';
const { catchWith } = Ix.asynciterable;
const { of } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { single } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;

test('AsyncIterable#catchWith error catches', async t => {
  const err = new Error();
  const res = await single(catchWith(_throw(err), async e => { t.same(err, e); return of(42); }));
  t.equal(42, res);
  t.end();
});

test('AsyncIterable#catchWith no error misses', async t => {
  const xs = range(0, 10);
  const res = catchWith(xs, async e => { t.fail(); return of(42); });
  t.true(await sequenceEqual(res, xs));
  t.end();
});
