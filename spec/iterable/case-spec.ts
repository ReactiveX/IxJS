import * as Ix from '../Ix';
import * as test from 'tape-async';
const { _case } = Ix.iterable;
const { defer } = Ix.iterable;
const { isEmpty } = Ix.iterable;
const { single } = Ix.iterable;

test('Iterable#case no default', t => {
  let x = 1;
  let d = 'd';
  const map = new Map<number, Iterable<string>>([
    [0, ['a']],
    [1, ['b']],
    [2, ['c']],
    [3, defer(() => [d])]
  ]);
  const res = _case(() => x, map);

  t.equal('b', single(res));
  t.equal('b', single(res));

  x = 0;
  t.equal('a', single(res));

  x = 2;
  t.equal('c', single(res));

  x = 3;
  t.equal('d', single(res));

  d = 'e';
  t.equal('e', single(res));

  x = 4;
  t.true(isEmpty(res));

  t.end();
});

test('Iterable#case with default', t => {
  let x = 1;
  let d = 'd';
  const map = new Map<number, Iterable<string>>([
    [0, ['a']],
    [1, ['b']],
    [2, ['c']],
    [3, defer(() => [d])]
  ]);
  const res = _case(() => x, map, ['z']);

  t.equal('b', single(res));
  t.equal('b', single(res));

  x = 0;
  t.equal('a', single(res));

  x = 2;
  t.equal('c', single(res));

  x = 3;
  t.equal('d', single(res));

  d = 'e';
  t.equal('e', single(res));

  x = 4;
  t.equal('z', single(res));

  t.end();
});
