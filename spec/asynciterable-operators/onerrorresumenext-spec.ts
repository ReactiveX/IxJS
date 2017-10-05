import * as Ix from '../Ix';
import * as test from 'tape-async';
const { concat } = Ix.asynciterable;
const { of } = Ix.asynciterable;
const { onErrorResumeNext } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;

test('AsyncIterable#onErrorResumeNext continues without error', async t => {
  const xs = of(1, 2);
  const ys = of(3, 4);

  const res = onErrorResumeNext(xs, ys);
  t.true(await sequenceEqual(res, of(1, 2, 3, 4)));
  t.end();
});

test('AsyncIterable#onErrorResumeNext continues after error', async t => {
  const xs = concat(of(1, 2), _throw(new Error()));
  const ys = of(3, 4);

  const res = onErrorResumeNext(xs, ys);
  t.true(await sequenceEqual(res, of(1, 2, 3, 4)));
  t.end();
});
