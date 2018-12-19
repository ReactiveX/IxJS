import * as Ix from '../Ix';
import * as test from 'tape';
const { _if } = Ix.asynciterable;
const { isEmpty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { single } = Ix.asynciterable;

test('AsyncIterable#if then and else', async t => {
  let x = 5;
  const res = _if(async () => x > 0, of(+1), of(-1));

  t.equal(+1, await single(res));

  x = -x;
  t.equal(-1, await single(res));

  t.end();
});

test('AsyncIterable#if then default else', async t => {
  let x = 5;
  const res = _if(async () => x > 0, of(+1));

  t.equal(+1, await single(res));

  x = -x;
  t.true(await isEmpty(res));

  t.end();
});
