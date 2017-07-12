import * as Ix from '../Ix';
import * as test from 'tape';
const { defer } = Ix.asynciterable;
const { doWhile } = Ix.asynciterable;
const { of } = Ix.asynciterable;
const { sequenceEqual } = Ix.iterable;
const { tap } = Ix.asynciterable;
const { toArray } = Ix.asynciterable;

test('Iterable#doWhile some', async t => {
  let x = 5;
  const res = await toArray(
    doWhile(defer(() => tap(of(x), { next: async () => { x--; } })), async () => x > 0)
  );

  t.true(sequenceEqual(res, [5, 4, 3, 2, 1]));
  t.end();
});

test('Iterable#doWhile one', async t => {
  let x = 0;
  const res = await toArray(
    doWhile(defer(() => tap(of(x), { next: async () => { x--; } })), async () => x > 0)
  );

  t.true(sequenceEqual(res, [0]));
  t.end();
});
