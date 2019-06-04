import { hasNext, noNext } from '../iterablehelpers';
import { from } from 'ix/iterable';

function* getData() {
  yield 1;
  yield 2;
  yield 3;
}

test('Iterable#from from array/iterable', () => {
  const xs = [1, 2, 3];
  const res = from(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  noNext(it);
});

test('Iterable#from from generator', () => {
  const xs = getData();
  const res = from(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  noNext(it);
});

test('Iterable#from from iterator', () => {
  const xs = getData();
  const res = from({ next: () => xs.next() });

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  noNext(it);
});

test('Iterable#from from array/iterable with selector', () => {
  const xs = [1, 2, 3];
  const res = from(xs, (x, i) => x + i);

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 3);
  hasNext(it, 5);
  noNext(it);
});

test('Iterable#from from empty array/iterable', () => {
  const xs: number[] = [];
  const res = from(xs);

  const it = res[Symbol.iterator]();
  noNext(it);
});

test('Iterable#from from array-like', () => {
  const xs = { length: 3 };
  const res = from(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, undefined);
  hasNext(it, undefined);
  hasNext(it, undefined);
  noNext(it);
});

test('Iterable#from from array-like with selector', () => {
  const xs = { length: 3 };
  const res = from(xs, (_, i) => i);

  const it = res[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#from from with non-iterable throws', done => {
  let error = false;
  try {
    from({} as any);
  } catch (e) {
    error = true;
  }
  error ? done() : done.fail('expected from to throw');
});
