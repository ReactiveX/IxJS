import * as Ix from '../Ix';
import * as test from 'tape';
const { buffer } = Ix.iterable;
const { every } = Ix.iterable;
const { map } = Ix.iterable;
const { of } = Ix.AsyncIterable;
const { repeat } = Ix.asynciterable;
const { sum } = Ix.iterable;
const { take } = Ix.asynciterable;
const { tap } = Ix.asynciterable;
const { toArray } = Ix.asynciterable;

test('AsyncIterable#repeat infinite', async t => {
  let i = 0;
  const xs = repeat(
    tap(of(1, 2), {
      next: async () => {
        ++i;
      }
    })
  );

  const res = await toArray(take(xs, 10));
  t.equal(10, res.length);
  t.true(every(map(buffer(res, 2), b => sum(b)), x => x === 3));
  t.equal(10, i);
  t.end();
});

test('AsyncIterable#repeat finite', async t => {
  let i = 0;
  const xs = repeat(
    tap(of(1, 2), {
      next: async () => {
        ++i;
      }
    }),
    5
  );

  const res = await toArray(take(xs, 10));
  t.equal(10, res.length);
  t.true(every(map(buffer(res, 2), b => sum(b)), x => x === 3));
  t.equal(10, i);
  t.end();
});
