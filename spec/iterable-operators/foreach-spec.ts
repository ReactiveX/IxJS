import * as Ix from '../Ix';
import * as test from 'tape';
const { range } = Ix.iterable;

test('Iterable#forEach', t => {
  let n = 0;

  range(5, 3).forEach(x => (n += x));

  t.equal(5 + 6 + 7, n);
  t.end();
});

test('Iterable#forEach with index', t => {
  let n = 0;

  range(5, 3).forEach((x, i) => (n += x * i));

  t.equal(5 * 0 + 6 * 1 + 7 * 2, n);
  t.end();
});
