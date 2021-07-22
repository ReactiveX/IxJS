import { IterableX } from '../../iterable/iterablex';
import { reduceRight } from '../../iterable/reduceright';
import { ReduceOptions } from '../../iterable/reduceoptions';

/**
 * @ignore
 */
export function reduceRightProto<T, R = T>(this: IterableX<T>, options: ReduceOptions<T, R>): R;
export function reduceRightProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (accumulator: R, current: T, index: number) => R,
  seed?: R
): R;
export function reduceRightProto<T, R = T>(
  this: IterableX<T>,
  optionsOrAccumulator: ReduceOptions<T, R> | ((accumulator: R, current: T, index: number) => R),
  seed?: R
): R {
  return reduceRight(
    this,
    // eslint-disable-next-line no-nested-ternary
    typeof optionsOrAccumulator === 'function'
      ? arguments.length > 1
        ? // prettier-ignore
          { 'callback': optionsOrAccumulator, 'seed': seed }
        : // prettier-ignore
          { 'callback': optionsOrAccumulator }
      : optionsOrAccumulator
  );
}

IterableX.prototype.reduceRight = reduceRightProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    reduceRight: typeof reduceRightProto;
  }
}
