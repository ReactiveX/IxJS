import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.some]);

test('Iterable#some some true', (t, [some]) => {
  const res = some([1, 2, 3, 4], x => x % 2 === 0);
  t.true(res);
  t.end();
});

test('Iterable#some none true', (t, [some]) => {
  const res = some([2, 8, 4, 6], x => x % 2 !== 0);
  t.false(res);
  t.end();
});
