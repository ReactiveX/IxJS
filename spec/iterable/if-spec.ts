import * as Ix from '../Ix';
import * as test from 'tape-async';
const { _if } = Ix.iterable;
const { isEmpty } = Ix.iterable;
const { single } = Ix.iterable;

test('Iterable#if then and else', t => {
  let x = 5;
  const res = _if(() => x > 0, [+1], [-1]);

  t.equal(+1, single(res));

  x = -x;
  t.equal(-1, single(res));

  t.end();
});

test('Iterable#if then default else', t => {
  let x = 5;
  const res = _if(() => x > 0, [+1]);

  t.equal(+1, single(res));

  x = -x;
  t.true(isEmpty(res));

  t.end();
});
