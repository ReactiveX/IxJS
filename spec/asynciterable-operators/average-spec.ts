import * as Ix from '../Ix';
import * as test from 'tape-async';
const { average } = Ix.asynciterable;
const { empty } = Ix.asynciterable;
const { of } = Ix.asynciterable;

test('Iterable#average empty', async (t: test.Test) => {
  const xs = empty<number>();
  try {
    await average(xs);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('Iterable#average', async (t: test.Test) => {
  const res = await average(of(1, 2, 3));
  t.equal(res, 2);
  t.end();
});

test('Iterable#average with selector empty', async (t: test.Test) => {
  const xs = empty<number>();
  try {
    await average(xs, async x => x * 2);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('Iterable#average with selector', async (t: test.Test) => {
  const res = await average(of(1, 2, 3), x => x * 2);
  t.equal(res, 4);
  t.end();
});

test('Iterable#average laws', async (t: test.Test) => {
  const xs = of(1, 2, 3);
  t.equal(await average(xs), await average(xs, x => x));
  t.end();
});
