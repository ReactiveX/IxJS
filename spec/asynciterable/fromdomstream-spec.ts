import '../asynciterablehelpers.js';
import { Readable, ReadableOptions } from 'stream';
import { as, fromDOMStream } from 'ix/asynciterable/index.js';

// eslint-disable-next-line consistent-return
(async () => {
  if (!fromDOMStream || process.env.TEST_DOM_STREAMS !== 'true') {
    return test('not testing node streams because process.env.TEST_DOM_STREAMS !== "true"', () => {
      /**/
    });
  }

  class Counter extends Readable {
    private _index: number;
    private _max: number;

    constructor(options?: ReadableOptions) {
      super(options);
      this._max = 3;
      this._index = 0;
    }

    _read() {
      this.push(++this._index > this._max ? null : `${this._index}`);
    }
  }

  const compare = <T>(a: T, b: T) => {
    const aVal = ArrayBuffer.isView(a) ? `${Buffer.from(a.buffer, a.byteOffset, a.byteLength)}` : a;
    const bVal = ArrayBuffer.isView(b) ? `${Buffer.from(b.buffer, b.byteOffset, b.byteLength)}` : b;
    // poor man's deep-equals
    try {
      expect(aVal).toEqual(bVal);
    } catch (e) {
      return false;
    }
    return true;
  };

  describe('AsyncIterable#fromDOMStream', () => {
    test('objectMode: true', async () => {
      // @ts-ignore
      const { toStream } = await import('@openpgp/web-stream-tools');
      const c = toStream(new Counter({ objectMode: true }));
      const xs = fromDOMStream(c) as AsyncIterable<string>;
      const expected = as(['1', '2', '3']);
      await expect(xs).toEqualStream(expected, compare);
    });

    test('objectMode: false', async () => {
      // @ts-ignore
      const { toStream } = await import('@openpgp/web-stream-tools');
      const c = toStream(new Counter({ objectMode: false }));
      const xs = fromDOMStream(c) as AsyncIterable<Buffer>;
      const expected = as(['1', '2', '3'].map((s) => Buffer.from(s)));
      await expect(xs).toEqualStream(expected, compare);
    });
  });
})();
