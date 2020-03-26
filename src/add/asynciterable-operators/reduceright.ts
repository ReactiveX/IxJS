import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { reduceRight } from '../../asynciterable/reduceright';
import { ReduceOptions } from '../../asynciterable/reduceoptions';

/**
 * @ignore
 */
export async function reduceRightProto<T, R = T>(
  this: AsyncIterableX<T>,
  options: ReduceOptions<T, R>
): Promise<R> {
  return reduceRight(this, options);
}

AsyncIterableX.prototype.reduceRight = reduceRightProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    reduceRight: typeof reduceRightProto;
  }
}
