import * as Ix from '../Ix';
import * as test from 'tape-async';
const { every } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;

test('AsyncIterable#every not all match', async (t: test.Test) => {
  const xs = of(1, 2, 3, 4);

  const ys = await every(xs, async x => x % 2 === 0);

  t.false(ys);
  t.end();
});

test('AsyncIterable#every all match', async (t: test.Test) => {
  const xs = of(2, 4, 6, 8);

  const ys = await every(xs, async x => x % 2 === 0);

  t.true(ys);
  t.end();
});

test('AsyncIterable#every throws', async (t: test.Test) => {
  const err = new Error();
  const xs = _throw<number>(err);

  try {
    await every(xs, async x => x % 2 === 0);
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#every predicate throws', async (t: test.Test) => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);

  try {
    await every(xs, async () => {
      throw err;
    });
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});
