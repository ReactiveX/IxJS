'use strict';

import * as test from 'tape';
import { repeatValue } from '../../dist/cjs/asynciterable/repeatvalue';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#repeatValue repeats value finitely', async (t: test.Test) => {
  const xs = repeatValue(2, 5);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#repeatValue repeat zero times', async (t: test.Test) => {
  const xs = repeatValue(2, 0);

  const it = xs[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#repeatValue repeats value infinitely', async (t: test.Test) => {
  const xs = repeatValue(2);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  t.end();
});