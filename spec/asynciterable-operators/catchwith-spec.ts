import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.catchWith]);
const { of } = Ix.AsyncIterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { single } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;

test('AsyncIterable#catchWith error catches', async (t, [catchWith]) => {
  const err = new Error();
  const res = await single(
    catchWith(_throw(err), async e => {
      t.same(err, e);
      return of(42);
    })
  );
  t.equal(42, res);
  t.end();
});

test('AsyncIterable#catchWith no error misses', async (t, [catchWith]) => {
  const xs = range(0, 10);
  const res = catchWith(xs, async e => {
    t.fail();
    return of(42);
  });
  t.true(await sequenceEqual(res, xs));
  t.end();
});
