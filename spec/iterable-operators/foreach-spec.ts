import * as Ix from '../Ix';
import  * as test  from 'tape';
const { forEach } = Ix.iterable;
const { range } = Ix.iterable;

test('Iterable#forEach', t => {
  let n = 0;

  forEach(range(5, 3), x => n += x);

  t.equal(5 + 6 + 7, n);
  t.end();
});

test('Iterable#forEach with index', t => {
  let n = 0;

  forEach(range(5, 3), (x, i) => n += x * i);

  t.equal(5 * 0 + 6 * 1 + 7 * 2, n);
  t.end();
});
