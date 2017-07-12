import * as Ix from '../Ix';
import * as test from 'tape';
const { flatten } = Ix.iterable;
const { toArray } = Ix.iterable;

function compareArrays<T>(t: test.Test, fst: Iterable<T>, snd: Iterable<T>) {
  t.equal(fst.toString(), snd.toString());
}

test('Iterable#flatten flattens all', t => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flatten(xs));

  compareArrays(t, ys, [1, 2, 3, 4]);
  t.end();
});

test('Iterable#flatten flattens two layers', t => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flatten(xs, 2));

  compareArrays(t, ys, [1, 2, 3, 4]);
  t.end();
});

test('Iterable#flatten flattens one layer', t => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flatten(xs, 1));

  compareArrays(t, ys, [1, 2, [3], 4]);
  t.end();
});

test('Iterable#flatten flattens no layers', t => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flatten(xs, 1));

  compareArrays(t, ys, [1, [2, [3]], 4]);
  t.end();
});
