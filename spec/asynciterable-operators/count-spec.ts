import * as Ix from '../Ix';
import * as test from 'tape-async';
const { count } = Ix.asynciterable;
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;

test('AsyncItearble#count some', async (t: test.Test) => {
  const xs = of(1, 2, 3, 4);

  const ys = await count(xs);

  t.equal(ys, 4);
  t.end();
});

test('AsyncIterable#count empty', async (t: test.Test) => {
  const xs = empty<number>();

  const ys = await count(xs);

  t.equal(ys, 0);
  t.end();
});

test('AsyncIterable#count throws', async (t: test.Test) => {
  const err = new Error();
  const xs = _throw<number>(err);

  try {
    await count(xs);
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#count predicate some match', async (t: test.Test) => {
  const xs = of(1, 2, 3, 4);

  const ys = await count(xs, async x => x > 3);

  t.equal(ys, 1);
  t.end();
});

test('AsyncIterable#count predicate all match', async (t: test.Test) => {
  const xs = of(1, 2, 3, 4);

  const ys = await count(xs, async x => x > 0);

  t.equal(ys, 4);
  t.end();
});

test('AsyncIterable#count predicate none match', async (t: test.Test) => {
  const xs = of(1, 2, 3, 4);

  const ys = await count(xs, async x => x > 4);

  t.equal(ys, 0);
  t.end();
});

test('AsyncIterable#count predicate throws', async (t: test.Test) => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);

  try {
    await count(xs, async () => {
      throw err;
    });
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});
