import * as Ix from '../Ix';
import * as test from 'tape-async';
const { defer } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { tap } = Ix.iterable;
const { toArray } = Ix.iterable;
const { _while } = Ix.iterable;

test('Iterable#while some', t => {
  let x = 5;
  const res = toArray(
    _while(() => x > 0, defer(() => tap([x], { next: () => x--})))
  );

  t.true(sequenceEqual(res, [5, 4, 3, 2, 1]));
  t.end();
});

test('Iterable#while none', t => {
  let x = 0;
  const res = toArray(
    _while(() => x > 0, defer(() => tap([x], { next: () => x--})))
  );

  t.true(sequenceEqual(res, []));
  t.end();
});
