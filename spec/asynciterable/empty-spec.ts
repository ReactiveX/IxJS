import { noNext } from '../asynciterablehelpers';
import { empty } from 'ix/asynciterable';

test('AsyncIterable#empty empty', async () => {
  const xs = empty();

  const it = xs[Symbol.asyncIterator]();
  await noNext(it);
});
