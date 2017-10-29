import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.onErrorResumeNext]);
const { concat } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { _throw } = Ix.iterable;

test('Iterable#onErrorResumeNext continues without error', (t, [onErrorResumeNext]) => {
  const xs = [1, 2];
  const ys = [3, 4];

  const res = onErrorResumeNext(xs, ys);
  t.true(sequenceEqual(res, [1, 2, 3, 4]));
  t.end();
});

test('Iterable#onErrorResumeNext continues after error', (t, [onErrorResumeNext]) => {
  const xs = concat([1, 2], _throw(new Error()));
  const ys = [3, 4];

  const res = onErrorResumeNext(xs, ys);
  t.true(sequenceEqual(res, [1, 2, 3, 4]));
  t.end();
});
