import { IterableX } from '../../iterable/iterablex';
import { reduceRight } from '../../iterable/reduceright';
import { ReduceOptions } from '../../iterable/reduceoptions';

/**
 * @ignore
 */
export function reduceRightProto<T, R = T>(this: IterableX<T>, options: ReduceOptions<T, R>): R {
  return reduceRight(this, options);
}

IterableX.prototype.reduceRight = reduceRightProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    reduceRight: typeof reduceRightProto;
  }
}
