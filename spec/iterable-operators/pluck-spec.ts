import * as Ix from '../Ix';
import * as test from 'tape-async';
const { of } = Ix.iterable;
const { pluck } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#pluck simple prop', t => {
  const xs = of(
    {prop: 1},
    {prop: 2},
    {prop: 3},
    {prop: 4},
    {prop: 5}
  );
  const ys = pluck(xs, 'prop');

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  hasNext(t, it, 5);
  noNext(t, it);
  t.end();
});

test('Iterable#pluck nested prop', t => {
  const xs = of(
    {a: {b: {c: 1}}},
    {a: {b: {c: 2}}},
    {a: {b: {c: 3}}},
    {a: {b: {c: 4}}},
    {a: {b: {c: 5}}}
  );
  const ys = pluck(xs, 'a', 'b', 'c');

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  hasNext(t, it, 5);
  noNext(t, it);
  t.end();
});

test('Iterable#pluck edge cases', t => {
  const xs = of<any>(
    {a: {b: {c: 1}}},
    {a: {b: 2}},
    {a: {c: {c: 3}}},
    {},
    {a: {b: {c: 5}}}
  );
  const ys = pluck(xs, 'a', 'b', 'c');

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, undefined);
  hasNext(t, it, undefined);
  hasNext(t, it, undefined);
  hasNext(t, it, 5);
  noNext(t, it);
  t.end();
});
