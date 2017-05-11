import  * as test  from 'tape';
import { range } from '../../dist/cjs/iterable/range';
import { tap } from '../../dist/cjs/iterable/tap';

test('Itearble#tap next', t => {
  let n = 0;
  let source = tap(range(0, 10), {
    next: function (x) {
      n += x;
    }
  });

  // tslint:disable-next-line:no-empty
  for (let _ of source) { }

  t.equal(45, n);
  t.end();
});

test('Iterable#tap next complete', t => {
  let n = 0;
  let source = tap(range(0, 10), {
    next: function (x) {
      n += x;
    },
    complete: function () {
      n *= 2;
    }
  });

  // tslint:disable-next-line:no-empty
  for (let _ of source) { }

  t.equal(90, n);
  t.end();
});

test('Iterable#tap with error', t => {
  let err = new Error();
  let ok = false;

  t.throws(() => {

  });
});

        [Fact]
        public void Do3()
        {
            var ex = new MyException();
            var ok = false;
            AssertThrows<MyException>(() =>
                EnumerableEx.Throw<int>(ex).Do(x => { Assert.True(false); }, e => { Assert.Equal(ex, e); ok = true; }).ForEach(_ => { })
            );
            Assert.True(ok);
        }

        [Fact]
        public void Do4()
        {
            var obs = new MyObserver();
            Enumerable.Range(0, 10).Do(obs).ForEach(_ => { });

            Assert.True(obs.Done);
            Assert.Equal(45, obs.Sum);
        }

        class MyObserver : IObserver<int>
        {
            public int Sum;
            public bool Done;

            public void OnCompleted()
            {
                Done = true;
            }

            public void OnError(Exception error)
            {
                throw new NotImplementedException();
            }

            public void OnNext(int value)
            {
                Sum += value;
            }
        }

        [Fact]
        public void Do5()
        {
            var sum = 0;
            var done = false;
            Enumerable.Range(0, 10).Do(x => sum += x, ex => { throw ex; }, () => done = true).ForEach(_ => { });

            Assert.True(done);
            Assert.Equal(45, sum);
        }