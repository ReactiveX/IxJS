import '../asynciterablehelpers';
import { AsyncIterableX } from 'ix/asynciterable';
import { map, toDOMStream } from 'ix/asynciterable/operators';

// eslint-disable-next-line consistent-return
(() => {
  if (!toDOMStream || process.env.TEST_DOM_STREAMS !== 'true') {
    return test('not testing node streams because process.env.TEST_DOM_STREAMS !== "true"', () => {
      /**/
    });
  }

  const stringsItr = () => AsyncIterableX.from([1, 2, 3]).pipe(map((i) => `${i}`));
  const buffersItr = () => stringsItr().pipe(map((val) => Buffer.from(val)));
  const objectsItr = () => stringsItr().pipe(map((val) => ({ val })));
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

  describe('AsyncIterable#toDOMStream', () => {
    describe('DefaultController', () => {
      const expectedStrings = ['1', '2', '3'];
      const expectedObjects = expectedStrings.map((val) => ({ val }));
      const expectedBuffers = expectedStrings.map((x) => Buffer.from(x));
      test('yields Strings', async () => {
        const expected = AsyncIterableX.from(expectedStrings);
        const actual = stringsItr().pipe(toDOMStream());
        await expect(actual).toEqualStream(expected, compare);
      });
      test('yields Buffers', async () => {
        const expected = AsyncIterableX.from(expectedBuffers);
        const actual = buffersItr().pipe(toDOMStream());
        await expect(actual).toEqualStream(expected, compare);
      });
      test('yields Objects', async () => {
        const expected = AsyncIterableX.from(expectedObjects);
        const actual = objectsItr().pipe(toDOMStream());
        await expect(actual).toEqualStream(expected, compare);
      });
    });

    describe('ReadableByteStreamController (byobRequest)', () => {
      const expectedStrings = ['123'];
      const expectedBuffers = expectedStrings.map((x) => Buffer.from(x));
      test('yields Strings', async () => {
        const expected = AsyncIterableX.from(expectedBuffers);
        const actual = stringsItr()
          .pipe(map((x) => Buffer.from(x)))
          .pipe(toDOMStream({ type: 'bytes' }));
        await expect(actual).toEqualStream(expected, compare);
      });
      test('yields Buffers', async () => {
        const expected = AsyncIterableX.from(expectedBuffers);
        const actual = buffersItr().pipe(toDOMStream({ type: 'bytes' }));
        await expect(actual).toEqualStream(expected, compare);
      });
    });

    describe('ReadableByteStreamController (autoAllocateChunkSize)', () => {
      const expectedStrings = ['123'];
      const expectedBuffers = expectedStrings.map((x) => Buffer.from(x));
      test('yields Strings', async () => {
        const expected = AsyncIterableX.from(expectedBuffers);
        const actual = stringsItr()
          .pipe(map((x) => Buffer.from(x)))
          .pipe(toDOMStream({ type: 'bytes', autoAllocateChunkSize: 1024 }));
        await expect(actual).toEqualStream(expected, compare);
      });
      test('yields Buffers', async () => {
        const expected = AsyncIterableX.from(expectedBuffers);
        const actual = buffersItr().pipe(
          toDOMStream({ type: 'bytes', autoAllocateChunkSize: 1024 })
        );
        await expect(actual).toEqualStream(expected, compare);
      });
    });
  });
})();
