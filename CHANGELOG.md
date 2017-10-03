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



