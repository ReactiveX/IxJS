export type booleanPredicate<T> =
{ (value: T, index: number): boolean } |
{ (value: T, index: number): value is T };

export type booleanAsyncPredicate<T> =
{ (value: T, index: number): boolean } |
{ (value: T, index: number): value is T } |
{ (value: T, index: number): Promise<boolean> } ;
