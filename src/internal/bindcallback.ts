/**
 * @ignore
 */
export function bindCallback(func: any, thisArg: any, argCount: number) {
  if (typeof thisArg === 'undefined') { return func; }
  switch (argCount) {
    case 0:
      return function() { return func.call(thisArg); };
    case 1:
      return function(arg: any) { return func.call(thisArg, arg); };
    case 2:
      return function(value: any, index: number) { return func.call(thisArg, value, index); };
    case 3:
      return function(value: any, index: number, collection: any[]) { return func.call(thisArg, value, index, collection); };
  }

  return function() {
    return func.apply(thisArg, arguments);
  };
}
