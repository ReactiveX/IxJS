import * as test from 'tape-async';
import { fromNodeStream } from '../Ix';
import { Readable, ReadableOptions } from 'stream';

class Counter extends Readable {
  private _index: number;
  private _max: number;

  constructor(options?: ReadableOptions) {
    super(options);
    this._max = 3;
    this._index = 0;
  }

  _read() {
    const i = ++this._index;
    if (i > this._max) {
      this.push(null);
    } else {
      const buf = Buffer.from(`${i}`, 'utf8');
      this.push(buf);
    }
  }
}

test('AsyncIterable#fromNodeStream with readable', async t => {
  const c = new Counter({ objectMode: true });
  const xs = fromNodeStream(c);

  const it = xs[Symbol.asyncIterator]();
  let next = await it.next();
  t.false(next.done);
  t.equal((next.value as Buffer).compare(Buffer.from('1', 'utf8')), 0);

  next = await it.next();
  t.false(next.done);
  t.equal((next.value as Buffer).compare(Buffer.from('2', 'utf8')), 0);

  next = await it.next();
  t.false(next.done);
  t.equal((next.value as Buffer).compare(Buffer.from('3', 'utf8')), 0);

  next = await it.next();
  t.true(next.done);

  t.end();
});
