import * as Ix from '../Ix';
import * as test from 'tape';
const { _throw } = Ix.iterable;

test('Iterable#throw throws', t => {
  const xs = _throw<number>(new Error());

  const it = xs[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});
