import { noNext } from '../asynciterablehelpers.js';
import { empty } from 'ix/asynciterable/index.js';

test('AsyncIterable#empty empty', async () => {
  const xs = empty();

  const it = xs[Symbol.asyncIterator]();
  await noNext(it);
});
