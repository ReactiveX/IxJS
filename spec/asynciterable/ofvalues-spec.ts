import * as Ix from '../Ix';
const { ofValues } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#ofValues behavior', async () => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofValues(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 'Bob');
  await hasNext(it, 'Smith');
  await noNext(it);
});
