import * as Ix from '../Ix';
import * as test from 'tape-async';
const { every } = Ix.iterable;

test('Iterable#every some true', t => {
  const res = every([1, 2, 3, 4], x => x % 2 === 0);
  t.false(res);
  t.end();
});

test('Iterable#very all true', t => {
  const res = every([2, 8, 4, 6], x => x % 2 === 0);
  t.true(res);
  t.end();
});
