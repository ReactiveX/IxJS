/**
 * @ignore
 */
export interface RefCount<T> {
  value: T;
  count: number;
}

/**
 * @ignore
 */
export interface IRefCountList<T> {
  clear(): void;
  readonly count: number;
  get(index: number): T;
  push(value: T): void;
  done(): void;
}

/**
 * @ignore
 */
export class MaxRefCountList<T> implements IRefCountList<T> {
  private _list: T[] = [];

  clear() { this._list = []; }
  get count() { return this._list.length; }
  get(index: number): T { return this._list[index]; }
  push(value: T) { this._list.push(value); }

  // tslint:disable-next-line:no-empty
  done() { }
}

/**
 * @ignore
 */
export class RefCountList<T> implements IRefCountList<T> {
  private _readerCount: number;
  private _list: Map<number, RefCount<T>>;
  private _count: number = 0;

  constructor(readerCount: number) {
    this._readerCount = readerCount;
    this._list = new Map<number, RefCount<T>>();
  }

  clear() { this._list.clear(); }
  get count() { return this._count; }
  get readerCount() { return this._readerCount; }
  set readerCount(value: number) { this._readerCount = value; }
  done() { this._readerCount--; }

  get(index: number): T {
    if (!this._list.has(index)) {
      throw new Error('Element no longer available in the buffer.');
    }
    const res = this._list.get(index)!;
    const val = res.value;
    if (--res.count === 0) {
      this._list.delete(index);
    }
    return val;
  }

  push(value: T) {
    this._list.set(this._count++, { value: value, count: this._readerCount });
  }
}
