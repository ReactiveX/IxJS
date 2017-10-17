<a name="2.2.0"></a>
# [2.2.0](https://github.com/ReactiveX/IxJS/compare/v2.1.4...v2.2.0) (2017-10-15)


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


* Zip `n` sources (#73) ([0c4d513](https://github.com/ReactiveX/IxJS/commit/0c4d513))


### BREAKING CHANGES

* zip selectors now take a single "values" Array argument, instead of varargs

* test(zip): update zip tests for variable sources



<a name="2.1.4"></a>
## [2.1.4](https://github.com/ReactiveX/IxJS/compare/v2.1.3...v2.1.4) (2017-10-04)



<a name="2.1.3"></a>
## [2.1.3](https://github.com/ReactiveX/IxJS/compare/v2.1.1...v2.1.3) (2017-10-03)



<a name="2.1.1"></a>
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



<a name="2.1.0"></a>
# 2.1.0 (2017-08-24)


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



<a name="2.0.3"></a>
## 2.0.3 (2017-08-24)


### Bug Fixes

* **groupBy:** fixing missing this in groupBy operator prototype signatures ([ff2ee18](https://github.com/ReactiveX/IxJS/commit/ff2ee18)), closes [#33](https://github.com/ReactiveX/IxJS/issues/33)
* **typings:** Fix IterableX#concatAll typings to accept IterableX<Iterable<T>> ([#25](https://github.com/ReactiveX/IxJS/issues/25)) ([a9343c0](https://github.com/ReactiveX/IxJS/commit/a9343c0))




<a name="2.0.0"></a>
# 2.0.0 (2017-08-16)


### Bug Fixes

* **typings:** Fix IterableX#concatAll typings to accept IterableX<Iterable<T>> (#25) ([a9343c0](https://github.com/ReactiveX/IxJS/commit/a9343c0)), closes [#25](https://github.com/ReactiveX/IxJS/issues/25)


### Features

* **docs:** add async iterable docs ([c75fbf0](https://github.com/ReactiveX/IxJS/commit/c75fbf0))
* **docs:** add why Ix ([fc0be11](https://github.com/ReactiveX/IxJS/commit/fc0be11))
* **docs:** Adding basic contribution docs ([b4b93e2](https://github.com/ReactiveX/IxJS/commit/b4b93e2))
* **docs:** document for/forEach ([495e772](https://github.com/ReactiveX/IxJS/commit/495e772))
* **from:** Collapse from to include Observable ([b130e9c](https://github.com/ReactiveX/IxJS/commit/b130e9c))
* **observable:** add to/from Observable ([825b3d9](https://github.com/ReactiveX/IxJS/commit/825b3d9))
* **observable:** move subscription to own file ([335f694](https://github.com/ReactiveX/IxJS/commit/335f694))
* **scheduler:** initial scheduler implementation ([4ad0468](https://github.com/ReactiveX/IxJS/commit/4ad0468))
* **time:** add time based operators ([1b6732a](https://github.com/ReactiveX/IxJS/commit/1b6732a))
* **zip:** Make it parallel as possible ([c505389](https://github.com/ReactiveX/IxJS/commit/c505389))



