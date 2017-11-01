import * as Ix from '../Ix';
import * as test from 'tape-async';
const { fromNodeStream } = Ix;
import { Readable, ReadableOptions } from 'stream';

class Counter extends Readable {
  private _index: number;
  private _max: number;

  constructor(options?: ReadableOptions) {
    super(options);
    this._max = 3;
    this._index = 1;
  }

  _read() {
    const i = this._index++;
    if (i > this._max) {
      this.push(null);
    } else {
      const buf = Buffer.from(`${i}`, 'ascii');
      this.push(buf);
    }
  }
}

test('AsyncIterable#fromNodeStream with readable', async t => {
  const c = new Counter();
  const xs = fromNodeStream(c);

  const it = xs[Symbol.asyncIterator]();
  let next = await it.next();
  t.false(next.done);
  t.equal((next.value as Buffer).compare(new Buffer('1', 'ascii')), 0);

  next = await it.next();
  t.false(next.done);
  t.equal((next.value as Buffer).compare(new Buffer('2', 'ascii')), 0);

  next = await it.next();
  t.false(next.done);
  t.equal((next.value as Buffer).compare(new Buffer('3', 'ascii')), 0);

  next = await it.next();
  t.true(next.done);

  t.end();
});
