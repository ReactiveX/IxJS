import * as Ix from '../Ix';
import * as tape from 'tape-async';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.flatten]);
const { toArray } = Ix.iterable;

function compareArrays<T>(t: tape.Test, fst: Iterable<T>, snd: Iterable<T>) {
  t.equal(fst.toString(), snd.toString());
}

test('Iterable#flatten flattens all', (t, [flatten]) => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flatten(xs));

  compareArrays(t, ys, [1, 2, 3, 4]);
  t.end();
});

test('Iterable#flatten flattens two layers', (t, [flatten]) => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flatten(xs, 2));

  compareArrays(t, ys, [1, 2, 3, 4]);
  t.end();
});

test('Iterable#flatten flattens one layer', (t, [flatten]) => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flatten(xs, 1));

  compareArrays(t, ys, [1, 2, [3], 4]);
  t.end();
});

test('Iterable#flatten flattens no layers', (t, [flatten]) => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flatten(xs, 1));

  compareArrays(t, ys, [1, [2, [3]], 4]);
  t.end();
});
