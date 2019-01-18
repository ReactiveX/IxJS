import * as Ix from '../Ix';
const { empty } = Ix.asynciterable;
import { noNext } from '../asynciterablehelpers';

test('AsyncIterable#empty empty', async () => {
  const xs = empty<number>();

  const it = xs[Symbol.asyncIterator]();
  await noNext(it);
});
