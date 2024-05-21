import '../asynciterablehelpers.js';
import { never } from 'ix/asynciterable/index.js';
import { of } from 'ix/asynciterable/index.js';
import { race } from 'ix/asynciterable/index.js';
import { hasNext, noNext } from '../asynciterablehelpers.js';

test('AsyncIterable#of never', async () => {
  const xs = of(42, 43, 44);
  const ys = never();
  const res = race(xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 42);
  await hasNext(it, 43);
  await hasNext(it, 44);
  await noNext(it);
});
