import * as Ix from '../Ix';
const { of } = Ix.AsyncIterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#of behavior', async () => {
  const res = of(1, 2, 3);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});
