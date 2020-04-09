export interface CombineOptions<T, R = T> {
  thisArg?: any;
  selector?: (args: T[], signal?: AbortSignal) => R | Promise<R>;
}
