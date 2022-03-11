import { AsyncIterableX } from '../asynciterablex';
import { wrapWithAbort } from '../operators/withabort';
import { AbortError, throwIfAborted } from '../../aborterror';
import { safeRace } from '../../util/safeRace';
import { OperatorAsyncFunction } from '../../interfaces';

type ExtractValueType<A> = A extends AsyncIterable<infer T> ? T : never;
type SwitchMapSelector<TSource, TResult extends AsyncIterable<any>> = (
  value: TSource,
  index: number,
  signal?: AbortSignal
) => TResult | Promise<TResult>;

const NEVER_PROMISE = new Promise<IteratorResult<never>>(() => {});

class SwitchMapAsyncIterable<TSource, TResult extends AsyncIterable<any>> extends AsyncIterableX<
  ExtractValueType<TResult>
> {
  constructor(
    private source: AsyncIterable<TSource>,
    private selector: SwitchMapSelector<TSource, TResult>,
    private thisArg?: any
  ) {
    super();
  }
  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    const enum Type {
      OUTER = -1,
      INNER = 0,
    }

    type OuterWrap = { value: TSource; type: Type.OUTER };
    type InnerWrap = { value: ExtractValueType<TResult>; type: Type.INNER };

    async function* wrapIterator(
      source: AsyncIterable<TSource> | TResult,
      type: Type,
      signal?: AbortSignal
    ) {
      for await (const value of wrapWithAbort(source, signal)) {
        throwIfAborted(signal);
        yield { type, value };
      }
      return { type, value: undefined };
    }

    function swallowOurAbortErrors(innerSignal: AbortSignal) {
      return function (e?: any) {
        if (e instanceof AbortError && !innerSignal.aborted) {
          throw e;
        }
        return NEVER_PROMISE;
      };
    }

    let index = 0;
    let controller: AbortController | undefined;
    let catchOurAborts: (e?: any) => any = (e) => {
      throw e;
    };
    const outer = wrapIterator(this.source, Type.OUTER, signal);
    let inner: AsyncIterableIterator<OuterWrap | InnerWrap> | undefined;

    const pending = {
      [Type.OUTER]: outer.next(),
      [Type.INNER]: NEVER_PROMISE as Promise<IteratorResult<OuterWrap | InnerWrap>>,
      *[Symbol.iterator]() {
        yield pending[Type.OUTER];
        yield pending[Type.INNER];
      },
    };

    while (1) {
      const {
        done = false,
        value: { type, value },
      } = await safeRace([...pending]);

      if (done) {
        // only listen for one of the next results
        pending[type] = NEVER_PROMISE;
        // exit if both inner and outer are done
        if (pending[~type as Type] === NEVER_PROMISE) {
          break;
        }
      } else {
        if (type === Type.OUTER) {
          // abort the current inner iterator first
          controller && controller.abort();
          controller = new AbortController();
          catchOurAborts = swallowOurAbortErrors(controller.signal);
          inner = wrapIterator(
            await this.selector.call(this.thisArg, value, index++, controller.signal),
            Type.INNER,
            controller.signal
          );
          pending[Type.OUTER] = outer.next();
        } else if (type === Type.INNER) {
          yield value;
        }
        pending[Type.INNER] = inner!.next().catch(catchOurAborts);
      }
    }
  }
}

export function switchMap<TSource extends unknown, TResult extends AsyncIterable<any>>(
  selector: SwitchMapSelector<TSource, TResult>,
  thisArg?: any
): OperatorAsyncFunction<TSource, ExtractValueType<TResult>> {
  return function switchMapOperatorFunction(source) {
    return new SwitchMapAsyncIterable(source, selector, thisArg);
  };
}
