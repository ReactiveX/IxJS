import * as Ix from '../Ix';
import * as test from 'tape';
const { average } = Ix.iterable;

test('Iterable#average empty', t => {
  t.throws(() => average([]));
  t.end();
});

test('Iterable#average', t => {
  const res = average([1, 2, 3]);
  t.equal(res, 2);
  t.end();
});

test('Iterable#average with selector empty', t => {
  t.throws(() => average<number>([], x => x * 2));
  t.end();
});

test('Iterable#average with selector', t => {
  const res = average([1, 2, 3], x => x * 2);
  t.equal(res, 4);
  t.end();
});

test('Iterable#average laws', t => {
  const xs = [1, 2, 3];
  t.equal(average(xs), average(xs, x => x));
  t.end();
});
