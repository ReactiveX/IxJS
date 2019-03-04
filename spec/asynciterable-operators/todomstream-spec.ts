import '../asynciterablehelpers';
import { AsyncIterable, toDOMStream } from '../Ix';

(() => {
  if (!toDOMStream || process.env.TEST_DOM_STREAMS !== 'true') {
    return test('not testing node streams because process.env.TEST_DOM_STREAMS !== "true"', () => {
      /**/
    });
  }

  const stringsItr = () => AsyncIterable.from([1, 2, 3]).map(i => `${i}`);
  const buffersItr = () => stringsItr().map(val => Buffer.from(val));
  const objectsItr = () => stringsItr().map(val => ({ val }));
  const compare = <T>(a: T, b: T) => {
    let aVal = ArrayBuffer.isView(a) ? `${Buffer.from(a.buffer, a.byteOffset, a.byteLength)}` : a;
    let bVal = ArrayBuffer.isView(b) ? `${Buffer.from(b.buffer, b.byteOffset, b.byteLength)}` : b;
    // poor man's deep-equals
    try {
      expect(aVal).toEqual(bVal);
    } catch (e) {
      return false;
    }
    return true;
  };

  describe(`AsyncIterable#toDOMStream`, () => {
    describe(`DefaultController`, () => {
      const expectedStrings = ['1', '2', '3'];
      const expectedObjects = expectedStrings.map(val => ({ val }));
      const expectedBuffers = expectedStrings.map(x => Buffer.from(x));
      test(`yields Strings`, async () => {
        const expected = AsyncIterable.from(expectedStrings);
        const actual = stringsItr().toDOMStream();
        await expect(actual).toEqualStream(expected, compare);
      });
      test(`yields Buffers`, async () => {
        const expected = AsyncIterable.from(expectedBuffers);
        const actual = buffersItr().toDOMStream();
        await expect(actual).toEqualStream(expected, compare);
      });
      test(`yields Objects`, async () => {
        const expected = AsyncIterable.from(expectedObjects);
        const actual = objectsItr().toDOMStream();
        await expect(actual).toEqualStream(expected, compare);
      });
    });

    describe(`ReadableByteStreamController (byobRequest)`, () => {
      const expectedStrings = ['123'];
      const expectedBuffers = expectedStrings.map(x => Buffer.from(x));
      test(`yields Strings`, async () => {
        const expected = AsyncIterable.from(expectedBuffers);
        const actual = stringsItr()
          .map(x => Buffer.from(x))
          .toDOMStream({ type: 'bytes' });
        await expect(actual).toEqualStream(expected, compare);
      });
      test(`yields Buffers`, async () => {
        const expected = AsyncIterable.from(expectedBuffers);
        const actual = buffersItr().toDOMStream({ type: 'bytes' });
        await expect(actual).toEqualStream(expected, compare);
      });
    });

    describe(`ReadableByteStreamController (autoAllocateChunkSize)`, () => {
      const expectedStrings = ['123'];
      const expectedBuffers = expectedStrings.map(x => Buffer.from(x));
      test(`yields Strings`, async () => {
        const expected = AsyncIterable.from(expectedBuffers);
        const actual = stringsItr()
          .map(x => Buffer.from(x))
          .toDOMStream({ type: 'bytes', autoAllocateChunkSize: 1024 });
        await expect(actual).toEqualStream(expected, compare);
      });
      test(`yields Buffers`, async () => {
        const expected = AsyncIterable.from(expectedBuffers);
        const actual = buffersItr().toDOMStream({ type: 'bytes', autoAllocateChunkSize: 1024 });
        await expect(actual).toEqualStream(expected, compare);
      });
    });
  });
})();
