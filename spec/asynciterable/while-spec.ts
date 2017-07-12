import * as Ix from '../Ix';
import * as test from 'tape';
const { defer } = Ix.asynciterable;
const { of } = Ix.asynciterable;
const { tap } = Ix.asynciterable;
const { _while } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#while some', async t => {
  let x = 5;
  const res = _while(async () => x > 0, defer(async () => tap(of(x), { next: async () => { x--; } })));

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 5);
  await hasNext(t, it, 4);
  await hasNext(t, it, 3);
  await hasNext(t, it, 2);
  await hasNext(t, it, 1);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#while none', async t => {
  let x = 0;
  const res = _while(async () => x > 0, defer(async () => tap(of(x), { next: async () => { x--; } })));

  const it = res[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});
