## [2.5.3](https://github.com/ReactiveX/IxJS/compare/v2.5.2...v2.5.3) (2019-03-27)

### Bug Fixes

* **asynciterable#memoize**: ensure memoize and publish source values are only pulled once ([8392c50](https://github.com/ReactiveX/IxJS/commit/8392c50))

* **from**: ensure iterable and asynciterable from methods accept iterators ([8392c50](https://github.com/ReactiveX/IxJS/commit/8392c50))

* **observers**: widen the return type of observer fns ([8392c50](https://github.com/ReactiveX/IxJS/commit/8392c50))

* **asynciterable#tap**: add selector function overload ([8392c50](https://github.com/ReactiveX/IxJS/commit/8392c50))


### Features

* **asynciterable-pipe**: add tee, pipeTo, and pipeThrough to AsyncIterable prototype ([873b8fe](https://github.com/ReactiveX/IxJS/commit/873b8fe))

* **asynciterable-toDOMStream**: add AsyncIterable#toDOMStream implementation ([2e00c95](https://github.com/ReactiveX/IxJS/commit/2e00c95))

* **asynciterable-fromDOMStream**: add AsyncIterable.fromDOMStream implementation ([2e00c95](https://github.com/ReactiveX/IxJS/commit/2e00c95))





## [2.5.2](https://github.com/ReactiveX/IxJS/compare/v2.5.1...v2.5.2) (2019-03-04)

### Bug Fixes

* **asynciterable-pipe**: fix asynciterable pipe typings ([2e00c95](https://github.com/ReactiveX/IxJS/commit/2e00c95))


### Features

* **asynciterable-pipe**: add tee, pipeTo, and pipeThrough to AsyncIterable prototype ([873b8fe](https://github.com/ReactiveX/IxJS/commit/873b8fe))

* **asynciterable-toDOMStream**: add AsyncIterable#toDOMStream implementation ([2e00c95](https://github.com/ReactiveX/IxJS/commit/2e00c95))

* **asynciterable-fromDOMStream**: add AsyncIterable.fromDOMStream implementation ([2e00c95](https://github.com/ReactiveX/IxJS/commit/2e00c95))





## [2.5.1](https://github.com/ReactiveX/IxJS/compare/v2.5.0...v2.5.1) (2019-01-14)

### Bug Fixes

* **exports**: export all iterable and asynciterable operators ([1f8870f](https://github.com/ReactiveX/IxJS/commit/1f8870f))

* **asynciterable#scanProto**: allow AsyncIterable#scan selector to return R | Promise<R> ([1f8870f](https://github.com/ReactiveX/IxJS/commit/1f8870f))




# [2.5.0](https://github.com/ReactiveX/IxJS/compare/v2.4.3...v2.5.0) (2019-01-12)

### Bug Fixes

* **scan**: fix scan over single-element sources ([7f6a85f](https://github.com/ReactiveX/IxJS/commit/7f6a85f))



## [2.4.3](https://github.com/ReactiveX/IxJS/compare/v2.4.0...v2.4.3) (2019-01-03)

### Bug Fixes

* **dependencies**: add rxjs to the production dependencies list ([54e5cf7](https://github.com/ReactiveX/IxJS/commit/54e5cf7))


### Features

* **batch**: add asynciterable batch() implementation ([9c9bd7e](https://github.com/ReactiveX/IxJS/commit/9c9bd7e))

* **toNodeStream**: add iterable/asynciterable toNodeStream implementations ([9a1c5cc](https://github.com/ReactiveX/IxJS/commit/9a1c5cc))

* **fromNodeStream**: AsyncIterable.fromNodeStream has been optimized for streams and AsyncIterables ([9a1c5cc](https://github.com/ReactiveX/IxJS/commit/9a1c5cc))

* **pipe**: AsyncIterable.prototype.pipe now accepts Node.js WritableStream values in addition to operators ([9a1c5cc](https://github.com/ReactiveX/IxJS/commit/9a1c5cc))



# [2.4.0](https://github.com/ReactiveX/IxJS/compare/v2.3.5...v2.4.0) (2019-01-03)


### Bug Fixes

* **toObservable:** adds symbol-observable for rxjs interop ([273e697](https://github.com/ReactiveX/IxJS/commit/273e697)), closes [#245](https://github.com/ReactiveX/IxJS/issues/245)


### Features

* add support for passing Node WritableStreams to `AsyncIterableX#pipe()` ([#257](https://github.com/ReactiveX/IxJS/issues/257)) ([9a1c5cc](https://github.com/ReactiveX/IxJS/commit/9a1c5cc))

* add `AsyncIterableX#toNodeStream()` ([#257](https://github.com/ReactiveX/IxJS/issues/257)) ([9a1c5cc](https://github.com/ReactiveX/IxJS/commit/9a1c5cc))

* add `AsyncIterableX#batch()` ([#222](https://github.com/ReactiveX/IxJS/issues/222)) ([9c9bd7e](https://github.com/ReactiveX/IxJS/commit/9c9bd7e))



## [2.3.5](https://github.com/ReactiveX/IxJS/compare/9.2.0...v2.3.5) (2018-02-19)


### Bug Fixes

* **compile:** adding some missing exports to deal with typescript 2.7.x compat issue ([0b0c837](https://github.com/ReactiveX/IxJS/commit/0b0c837)), closes [#214](https://github.com/ReactiveX/IxJS/issues/214)


### Features

* **orderby:** add piped orderby ([#190](https://github.com/ReactiveX/IxJS/issues/190)) ([aaa527a](https://github.com/ReactiveX/IxJS/commit/aaa527a))



## [2.3.4](https://github.com/ReactiveX/IxJS/compare/v2.3.3...v2.3.4) (2017-11-29)


### Bug Fixes

* **typings:** Fix optional predicate typings for user-defined typeguard predicates ([fedd563](https://github.com/ReactiveX/IxJS/commit/fedd563))
* **typings:** workaround typescript bugs when noImplicitAny or strictNullChecks are not true ([ce03239](https://github.com/ReactiveX/IxJS/commit/ce03239))



## [2.3.3](https://github.com/ReactiveX/IxJS/compare/v2.3.2...v2.3.3) (2017-11-21)


### Reverts

* **npm:** revert 4493754d9fbbc061347d8ef785704b61ecb486c5 ([564c600](https://github.com/ReactiveX/IxJS/commit/564c600)), closes [#163](https://github.com/ReactiveX/IxJS/issues/163)



## [2.3.2](https://github.com/ReactiveX/IxJS/compare/v2.3.1...v2.3.2) (2017-11-21)


### Bug Fixes

* **fromnodestream:** enable fromnodestream tests, fix minification problems ([#156](https://github.com/ReactiveX/IxJS/issues/156)) ([745d763](https://github.com/ReactiveX/IxJS/commit/745d763))
* **fromnodestream:** type fromNodeStream to accept NodeJS.ReadableStream interface ([3cbf2dd](https://github.com/ReactiveX/IxJS/commit/3cbf2dd))
* **FromObservableAsyncIterable:** Fix handling of asynchronously emitting Observables ([#150](https://github.com/ReactiveX/IxJS/issues/150)) ([2c7222c](https://github.com/ReactiveX/IxJS/commit/2c7222c))
* **readme:** fix lettable syntax ([0e46181](https://github.com/ReactiveX/IxJS/commit/0e46181))


### Features

* **as:** Add static as convenience methods to wrap values as Async/Iterables ([#154](https://github.com/ReactiveX/IxJS/issues/154)) ([79a14c5](https://github.com/ReactiveX/IxJS/commit/79a14c5))



## [2.3.1](https://github.com/ReactiveX/IxJS/compare/v2.3.0...v2.3.1) (2017-11-08)


### Bug Fixes

* **single:** make iterable prototype single predicate an optional parameter again ([2bea5ab](https://github.com/ReactiveX/IxJS/commit/2bea5ab)), closes [/github.com/ReactiveX/IxJS/pull/83#issuecomment-341832266](https://github.com//github.com/ReactiveX/IxJS/pull/83/issues/issuecomment-341832266)



# [2.3.0](https://github.com/ReactiveX/IxJS/compare/v2.2.0...v2.3.0) (2017-11-03)


### Bug Fixes

* **pipe:** pipe() should always return IterableX<T> ([#126](https://github.com/ReactiveX/IxJS/issues/126)) ([d7c0556](https://github.com/ReactiveX/IxJS/commit/d7c0556))
* **type-guards:** fix user-defined type guards ([#83](https://github.com/ReactiveX/IxJS/issues/83)) ([fd45455](https://github.com/ReactiveX/IxJS/commit/fd45455)), closes [#44](https://github.com/ReactiveX/IxJS/issues/44)


### Features

* **asyncify:** adds asyncify and asyncifyErrback ([#96](https://github.com/ReactiveX/IxJS/issues/96)) ([f75dfaf](https://github.com/ReactiveX/IxJS/commit/f75dfaf))
* **exports:** move abstract class definitions into subfolders ([#121](https://github.com/ReactiveX/IxJS/issues/121)) ([8c45138](https://github.com/ReactiveX/IxJS/commit/8c45138)), closes [#52](https://github.com/ReactiveX/IxJS/issues/52)
* **forkJoin/combineLatest:** adds forkJoin and combineLatest ([#132](https://github.com/ReactiveX/IxJS/issues/132)) ([c0e3596](https://github.com/ReactiveX/IxJS/commit/c0e3596))
* **fromNodeStream:** adds fromNodeStream readable ([#124](https://github.com/ReactiveX/IxJS/issues/124)) ([952509e](https://github.com/ReactiveX/IxJS/commit/952509e))
* **merge/concat:** add typed overloads for merge/concat ([#84](https://github.com/ReactiveX/IxJS/issues/84)) ([752aa96](https://github.com/ReactiveX/IxJS/commit/752aa96))
* **operators:** rename __modules.ts to index.ts for tree-shaking ([#120](https://github.com/ReactiveX/IxJS/issues/120)) ([83ab288](https://github.com/ReactiveX/IxJS/commit/83ab288)), closes [#52](https://github.com/ReactiveX/IxJS/issues/52)
* **pipe:** add piped operators [WIP - DO NOT MERGE] ([#75](https://github.com/ReactiveX/IxJS/issues/75)) ([76a4b4f](https://github.com/ReactiveX/IxJS/commit/76a4b4f)), closes [#116](https://github.com/ReactiveX/IxJS/issues/116) [#117](https://github.com/ReactiveX/IxJS/issues/117) [#119](https://github.com/ReactiveX/IxJS/issues/119)



# [2.2.0](https://github.com/ReactiveX/IxJS/compare/v2.1.4...v2.2.0) (2017-10-15)


* Zip `n` sources (#73) ([0c4d513](https://github.com/ReactiveX/IxJS/commit/0c4d513)), closes [#73](https://github.com/ReactiveX/IxJS/issues/73)


### Bug Fixes

* **comparer:** fixes bug with comparer ([4098a8c](https://github.com/ReactiveX/IxJS/commit/4098a8c))
* **comparer:** Fixes comparer  ([c6a67eb](https://github.com/ReactiveX/IxJS/commit/c6a67eb))
* **concatall:** fix concatall file name case ([#59](https://github.com/ReactiveX/IxJS/issues/59)) ([1d241ca](https://github.com/ReactiveX/IxJS/commit/1d241ca))
* **endWith:** fix endWith unit tests ([dffa71d](https://github.com/ReactiveX/IxJS/commit/dffa71d))
* **operators:** import all add/*-operators in Ix.ts ([6ca52f5](https://github.com/ReactiveX/IxJS/commit/6ca52f5))


### Features

* **endWith:** adds endWith operator ([f967e3b](https://github.com/ReactiveX/IxJS/commit/f967e3b))
* **merge:** adds merge operator ([b81a007](https://github.com/ReactiveX/IxJS/commit/b81a007))
* **merge:** fix indexOf issues with merge ([2a542e5](https://github.com/ReactiveX/IxJS/commit/2a542e5))
* **mergeAll:** adds mergeAll operator ([47f17fa](https://github.com/ReactiveX/IxJS/commit/47f17fa))
* **operators:** support user defined type guards in boolean predicates ([ef8764a](https://github.com/ReactiveX/IxJS/commit/ef8764a)), closes [#44](https://github.com/ReactiveX/IxJS/issues/44)
* **windows:** add windows build support ([0ba498e](https://github.com/ReactiveX/IxJS/commit/0ba498e))
* **windows:** add windows build support ([59fe0e3](https://github.com/ReactiveX/IxJS/commit/59fe0e3))


### BREAKING CHANGES

* zip selectors now take a single "values" Array argument, instead of varargs

* test(zip): update zip tests for variable sources



## [2.1.4](https://github.com/ReactiveX/IxJS/compare/v2.1.3...v2.1.4) (2017-10-04)



## [2.1.3](https://github.com/ReactiveX/IxJS/compare/v2.1.1...v2.1.3) (2017-10-03)



## [2.1.1](https://github.com/ReactiveX/IxJS/compare/v2.1.0...v2.1.1) (2017-10-03)


### Bug Fixes

* **fromeventpattern:** use async generator here since Symbols in object literals don't survive uglif ([38cdee2](https://github.com/ReactiveX/IxJS/commit/38cdee2))
* **internals:** export internal modules as default, which plays nicer with closure compiler ([0bac516](https://github.com/ReactiveX/IxJS/commit/0bac516))
* **Ix:** add a default export to fix node's --experimental-modules behavior ([0698577](https://github.com/ReactiveX/IxJS/commit/0698577))
* **Ix:** export GroupedIterable and GroupedAsyncIterable types ([e6d697e](https://github.com/ReactiveX/IxJS/commit/e6d697e))
* **operators:** rearrange implementation details that break different steps in the build pipeline ([f2f2ddd](https://github.com/ReactiveX/IxJS/commit/f2f2ddd))
* **OrderedIterable:** export ordered iterables. Fixes [#31](https://github.com/ReactiveX/IxJS/issues/31) ([7127771](https://github.com/ReactiveX/IxJS/commit/7127771))


### Features

* **prettier:** adds prettier closes issue [#41](https://github.com/ReactiveX/IxJS/issues/41) ([6464e7a](https://github.com/ReactiveX/IxJS/commit/6464e7a))



# [2.1.0](https://github.com/ReactiveX/IxJS/compare/825b3d9...v2.1.0) (2017-08-24)


### Bug Fixes

* **groupBy:** fixing missing this in groupBy operator prototype signatures ([ff2ee18](https://github.com/ReactiveX/IxJS/commit/ff2ee18)), closes [#33](https://github.com/ReactiveX/IxJS/issues/33)
* **typings:** Fix IterableX#concatAll typings to accept IterableX<Iterable<T>> ([#25](https://github.com/ReactiveX/IxJS/issues/25)) ([a9343c0](https://github.com/ReactiveX/IxJS/commit/a9343c0))


### Features

* **docs:** add async iterable docs ([c75fbf0](https://github.com/ReactiveX/IxJS/commit/c75fbf0))
* **docs:** add why Ix ([fc0be11](https://github.com/ReactiveX/IxJS/commit/fc0be11))
* **docs:** Adding basic contribution docs ([b4b93e2](https://github.com/ReactiveX/IxJS/commit/b4b93e2))
* **docs:** document for/forEach ([495e772](https://github.com/ReactiveX/IxJS/commit/495e772))
* **from:** Collapse from to include Observable ([b130e9c](https://github.com/ReactiveX/IxJS/commit/b130e9c))
* **Iterator:** add iterator return to catch operators ([a7898ca](https://github.com/ReactiveX/IxJS/commit/a7898ca))
* **observable:** add to/from Observable ([825b3d9](https://github.com/ReactiveX/IxJS/commit/825b3d9))
* **observable:** move subscription to own file ([335f694](https://github.com/ReactiveX/IxJS/commit/335f694))
* **scheduler:** initial scheduler implementation ([4ad0468](https://github.com/ReactiveX/IxJS/commit/4ad0468))
* **time:** add time based operators ([1b6732a](https://github.com/ReactiveX/IxJS/commit/1b6732a))
* **zip:** Make it parallel as possible ([c505389](https://github.com/ReactiveX/IxJS/commit/c505389))



