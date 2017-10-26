import * as Ix from '../Ix';
import * as test from 'tape-async';
const { flatten } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { toArray } = Ix.asynciterable;

function compareArrays<T>(t: test.Test, fst: Iterable<T>, snd: Iterable<T>) {
  t.equal(fst.toString(), snd.toString());
}

test('AsyncIterable#flatten flattens all', async t => {
  const xs = of<any>(1, of<any>(2, of<any>(3)), 4);
  const ys = await toArray(flatten(xs));

  compareArrays(t, ys, [1, 2, 3, 4]);
  t.end();
});

test('AsyncIterable#flatten flattens two layers', async t => {
  const xs = of<any>(1, of<any>(2, of<any>(3)), 4);
  const ys = await toArray(flatten(xs, 2));

  compareArrays(t, ys, [1, 2, 3, 4]);
  t.end();
});
