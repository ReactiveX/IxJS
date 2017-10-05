import * as Ix from '../Ix';
import * as test from 'tape-async';
const { merge } = Ix.asynciterable;
const { mergeAll } = Ix.asynciterable;
const { of } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;

test('AsyncIterable#merge mergeAll behavior', async t => {
  const res = mergeAll(of(of(1, 2, 3), of(4, 5)));
  t.true(await sequenceEqual(res, of(1, 2, 3, 4, 5)));
  t.end();
});

test('AsyncIterable#merge behavior', async t => {
  const res = merge(of(1, 2, 3), of(4, 5));
  t.true(await sequenceEqual(res, of(1, 2, 3, 4, 5)));
  t.end();
});
