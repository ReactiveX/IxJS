## [4.6.1](https://github.com/ReactiveX/IxJS/compare/v4.6.0...v4.6.1) (2022-07-26)


### Bug Fixes

* **flatMap:** default flatMap concurrent parameter to 1 ([#346](https://github.com/ReactiveX/IxJS/issues/346)) ([bcfab5a](https://github.com/ReactiveX/IxJS/commit/bcfab5a4e6da8f02b9c23bee30863062d46c04ec))



# [4.6.0](https://github.com/ReactiveX/IxJS/compare/v4.5.2...v4.6.0) (2022-07-26)


### chore

* **types:** Fixing types ([#341](https://github.com/ReactiveX/IxJS/issues/341)) ([e13a6d3](https://github.com/ReactiveX/IxJS/commit/e13a6d3e4f807482f77b5a9c8e4610080b369a77))


### Continuous Integration

* use github actions instead of travis-ci ([#344](https://github.com/ReactiveX/IxJS/issues/344)) ([d357a19](https://github.com/ReactiveX/IxJS/commit/d357a1919c1c1511877168f947239d2cc733d996))


### Documentation

* **readme:** update link to Array#extras ([#343](https://github.com/ReactiveX/IxJS/issues/343)) ([b06a217](https://github.com/ReactiveX/IxJS/commit/b06a21793abd665314426d7d92a7b7a2629791fc))


* [FEA] Add AsyncIterable `switchMap` (#340) ([7b7d493](https://github.com/ReactiveX/IxJS/commit/7b7d493e89d93c80ed619d1e1646aec4dc790cac)), closes [#340](https://github.com/ReactiveX/IxJS/issues/340) [#244](https://github.com/ReactiveX/IxJS/issues/244)


### BREAKING CHANGES

* flatMap enumerates inner sequences in parallel
* flat enumerates inner sequences in parallel

* feat(concatmap.ts): add concatMap implementation



## [4.5.2](https://github.com/ReactiveX/IxJS/compare/v4.5.1...v4.5.2) (2021-10-07)


### Bug Fixes

* **pipethrough:** fix Iterable/AsyncIterable pipeThrough signature ([#338](https://github.com/ReactiveX/IxJS/issues/338)) ([58dea12](https://github.com/ReactiveX/IxJS/commit/58dea12785dc756ee8a363b42a24c61c69c7c2c0))



## [4.5.1](https://github.com/ReactiveX/IxJS/compare/v4.5.0...v4.5.1) (2021-09-09)


### Bug Fixes

* add static Iterable.as and AsyncIterable.as ([#336](https://github.com/ReactiveX/IxJS/issues/336)) ([b911d1a](https://github.com/ReactiveX/IxJS/commit/b911d1a1d5dc971f063929a5b3bf213f634103be))



# [4.5.0](https://github.com/ReactiveX/IxJS/compare/v4.4.1...v4.5.0) (2021-07-29)


* * chore(readme.md): update travis-ci badge url (#334) ([370ae91](https://github.com/ReactiveX/IxJS/commit/370ae919000390c8725423bb23e4707f81afb619)), closes [#334](https://github.com/ReactiveX/IxJS/issues/334)
* Update to TypeScript v4.3.5 (#332) ([0637a25](https://github.com/ReactiveX/IxJS/commit/0637a25f552520490e9025d559cf384043d6e93f)), closes [#332](https://github.com/ReactiveX/IxJS/issues/332) [#331](https://github.com/ReactiveX/IxJS/issues/331)


### Features

* **from:** support `AbortSignal` in `from(observable)` ([#333](https://github.com/ReactiveX/IxJS/issues/333)) ([7897e85](https://github.com/ReactiveX/IxJS/commit/7897e85c11bcdece1efd749e42e772e5cf0974cf))



## [4.4.1](https://github.com/ReactiveX/IxJS/compare/v4.4.0...v4.4.1) (2021-07-11)


### Bug Fixes

* **package.json:** use ^ for allowed tslib versions ([#330](https://github.com/ReactiveX/IxJS/issues/330)) ([02b1a22](https://github.com/ReactiveX/IxJS/commit/02b1a22b701397d3f969eac965a8a7034fcecc1c))



# [4.4.0](https://github.com/ReactiveX/IxJS/compare/v4.3.1...v4.4.0) (2021-06-09)


### Bug Fixes

* **src/asynciterable/operators/batch.ts:** create rejected Promise on demand ([#328](https://github.com/ReactiveX/IxJS/issues/328)) ([aa40ab1](https://github.com/ReactiveX/IxJS/commit/aa40ab1eabc66ce7cbe4ca71a46853e9ac736006)), closes [#320](https://github.com/ReactiveX/IxJS/issues/320)
* **src/asynciterable/operators/timeout.ts:** ensure AsyncIterable timeout operator passes its values ([#327](https://github.com/ReactiveX/IxJS/issues/327)) ([f5a213a](https://github.com/ReactiveX/IxJS/commit/f5a213abee816337a35d1ab8566165de02b200ce)), closes [#325](https://github.com/ReactiveX/IxJS/issues/325)


### Documentation

* **docs/asynciterable/creating.md:** Fix async iterable docs typo s/source/sink ([#317](https://github.com/ReactiveX/IxJS/issues/317)) ([084658f](https://github.com/ReactiveX/IxJS/commit/084658fbec2d657107610502eb3f3f6c82f253fb))


### Features

* **asynciterable-operators:** Add `bufferCountOrTime` operator ([#324](https://github.com/ReactiveX/IxJS/issues/324)) ([ee7c43e](https://github.com/ReactiveX/IxJS/commit/ee7c43e32c6aebacd649b0ca107b2fc5096c3fd5))



## [4.3.1](https://github.com/ReactiveX/IxJS/compare/v4.3.0...v4.3.1) (2021-03-23)


### Bug Fixes

* **Promise.race:** Fix Promise.race memory leaks ([#323](https://github.com/ReactiveX/IxJS/issues/323)) ([75ef616](https://github.com/ReactiveX/IxJS/commit/75ef61687fde8f62aa284bf908576142cff60e86))


### chore

* **npm-release.sh:** set concurrency to 1 to work around npm publish rate limits ([825bdd8](https://github.com/ReactiveX/IxJS/commit/825bdd8dc79b67a643e09520440c671fa64d56c4))
* **saferace.ts:** add unlicense to safeRace.ts ([c9c0a83](https://github.com/ReactiveX/IxJS/commit/c9c0a836dd1946007e0687d2243d82ca8b86b6a5))



# [4.3.0](https://github.com/ReactiveX/IxJS/compare/v4.2.0...v4.3.0) (2021-03-15)


### Bug Fixes

* **Abort:** Ensure removal of event listeners from AbortSignal ([#321](https://github.com/ReactiveX/IxJS/issues/321)) ([d4de33b](https://github.com/ReactiveX/IxJS/commit/d4de33bdf053c83f87045bc11d1a4e6edd023fa5))



# [4.2.0](https://github.com/ReactiveX/IxJS/compare/v4.1.0...v4.2.0) (2021-01-26)


### Bug Fixes

* **umd:** fix the UMD bundle export names so they don't conflict and overwrite each other ([#318](https://github.com/ReactiveX/IxJS/issues/318)) ([c45eaa8](https://github.com/ReactiveX/IxJS/commit/c45eaa8de6de48cd994e7d61738c602172da9ef6))



# [4.1.0](https://github.com/ReactiveX/IxJS/compare/v4.0.0...v4.1.0) (2021-01-21)


### Bug Fixes

* **operators:** export withLatestFrom and withAbort AsyncIterable operators ([#313](https://github.com/ReactiveX/IxJS/issues/313)) ([19915b5](https://github.com/ReactiveX/IxJS/commit/19915b514a95c43aea86ad455962e0cd646a5e9a))
* **operators:** support Array.prototype.reduce signature in Iterable scan and reduce operators again. Fixes [#311](https://github.com/ReactiveX/IxJS/issues/311) ([#312](https://github.com/ReactiveX/IxJS/issues/312)) ([1d98746](https://github.com/ReactiveX/IxJS/commit/1d98746302d91bd864bf6c0743104ac7c61b2252))
* **repeat-spec.ts:** fix unhandled-rejection error in node v15 ([7d84c87](https://github.com/ReactiveX/IxJS/commit/7d84c87e784c3d5e814cbe2e6d98e31b2c2f5cf7))
* **takeUntil:** complete iterable immediately ([#315](https://github.com/ReactiveX/IxJS/issues/315)) ([#316](https://github.com/ReactiveX/IxJS/issues/316)) ([97b2ca2](https://github.com/ReactiveX/IxJS/commit/97b2ca2714b410d485382f05ecd1692d650ab76f))


### chore

* **npm-release.sh:** add prompt to enter npm OTP before release ([f0c111e](https://github.com/ReactiveX/IxJS/commit/f0c111e2c0ea9b22dfbee8946d8763d1c061077c))
* **npm-release.sh:** use npm run-script instead of npx run-s in release script ([b03597d](https://github.com/ReactiveX/IxJS/commit/b03597dbaa8099be5eadc79bf94bebc1313fc134))


### Documentation

* **readme:** fix wrong result of samples and typo ([16fe9b0](https://github.com/ReactiveX/IxJS/commit/16fe9b08096d29079d24e60efcaeee330a67e36b))



# [4.0.0](https://github.com/ReactiveX/IxJS/compare/v3.0.2...v4.0.0) (2020-09-01)


### Continuous Integration

* **travis:** update to the latest npm ([d53de73](https://github.com/ReactiveX/IxJS/commit/d53de73b93b50d039703e5d30d5a4de18a900134))


### Documentation

* **AsyncIterable:** Add basic async-iterable docs ([11c2037](https://github.com/ReactiveX/IxJS/commit/11c20377d3e92ab47b268a67c4d2c839e0c529f7))
* **creation:** split creation/converting ([e8dfa97](https://github.com/ReactiveX/IxJS/commit/e8dfa973976f96382bbda7ee8156d441d17bb921))
* **IxJS:** Adding basic overview ([10abfdc](https://github.com/ReactiveX/IxJS/commit/10abfdca32907c01c162ab18e8a987dde23d3f05))


### Features

* **Abort:** Add basic abortsignal support ([a66a7c8](https://github.com/ReactiveX/IxJS/commit/a66a7c842250bb5fe4e831c8740de4b7e52ca13b))
* **Abort:** Add basic abortsignal support ([07ba58c](https://github.com/ReactiveX/IxJS/commit/07ba58c47e6171a7bde85aef6b140ce0e36f8899))
* **Abort:** Add more aborts ([b7832a6](https://github.com/ReactiveX/IxJS/commit/b7832a67599769a4e885a3435ea5d0872ab6da6e))
* **Abort:** add more throws if aborted ([2a489e1](https://github.com/ReactiveX/IxJS/commit/2a489e18dd1e1ee729e2bc62bb52a03765c4a7a0))
* **Abort:** fix debounce ([954ce58](https://github.com/ReactiveX/IxJS/commit/954ce588edd585c679db126e5b9faa166d261ef2))
* **Abort:** Fix most operators ([08a4c08](https://github.com/ReactiveX/IxJS/commit/08a4c08f768e9a9af5a421a0f7eb00b14c1bf017))
* **Abort:** fix reduce ([6e848f1](https://github.com/ReactiveX/IxJS/commit/6e848f16116a21cb650e441826c30893fd73c32b))
* **Abort:** Formatting ([d9e75ef](https://github.com/ReactiveX/IxJS/commit/d9e75efc622cf9b4639d2ba206e7b708c33c9248))
* **Abort:** Update all JSDocs ([313a1b4](https://github.com/ReactiveX/IxJS/commit/313a1b4af54dabadef07f3c0aca3cf17c8eccfd6))
* **asasynciterable:** add AsyncIterableTransform stream ([e3d12a1](https://github.com/ReactiveX/IxJS/commit/e3d12a1f999ce96ac3f68522609a342679eb34f0))
* **min/max:** Fix min and max ([37e7c0a](https://github.com/ReactiveX/IxJS/commit/37e7c0afd0a42909376c35db5ca5a9fc1dcda8d8))
* **never:** Adds never ([64a9c31](https://github.com/ReactiveX/IxJS/commit/64a9c311f7ef47b77fd7694641e8fe7ae3acc6c8))


* Adding converting docs and links ([6c493ae](https://github.com/ReactiveX/IxJS/commit/6c493ae446ae7c035ec3b93a9ef51eb6e37790f7))
* Updating through withLatestFrom ([79be89c](https://github.com/ReactiveX/IxJS/commit/79be89cdce26f65434072ddfcbd9bf815dc1df19))
* Adding docs through map ([cf6a509](https://github.com/ReactiveX/IxJS/commit/cf6a50914321760e809aadb983e45fa67667066a))


### Bug Fixes

* **aborterror:** add Symbol.hasInstance method to AbortSignal ([c9d9f1e](https://github.com/ReactiveX/IxJS/commit/c9d9f1e5666d9432b22c2871b37f260f5a0c3bb2))
* **closure:** fixing indexing ([8692d0c](https://github.com/ReactiveX/IxJS/commit/8692d0c17786de4e61e3cbd244be4c064c62bb5c))
* **debounce:** fix AsyncIterable debounce and reenable tests ([480996e](https://github.com/ReactiveX/IxJS/commit/480996e092f8db33cf68646f943ad74819bbfdbb))
* **extremaBy:** fixing extrema/minBy ([297d6e4](https://github.com/ReactiveX/IxJS/commit/297d6e4c9d31d8dbfa8044b79edb4c5d74ad03f6))
* **maxby-spec:** fix maxby test ([2699e40](https://github.com/ReactiveX/IxJS/commit/2699e40d0435487bddabf6def2b6a43b2f0a90a9))
* **minification:** fix test failures breaking due to aggressive closure-compiler minification ([a888ce8](https://github.com/ReactiveX/IxJS/commit/a888ce8d74a9f7154b1e5e5f938946cf3514736c))
* **specs:** fixing tests for single ([2793801](https://github.com/ReactiveX/IxJS/commit/2793801bcb344e0b4d01d2021ed887934bfdebde))
* **tests:** Fix bad max test ([3a853ee](https://github.com/ReactiveX/IxJS/commit/3a853ee8144fd936c26aeb3a922c024c5a2f22f4))
* **tests:** Fixing tests ([0affef1](https://github.com/ReactiveX/IxJS/commit/0affef1c806dd6444bfe5c0bf94163a5f3b688e4))
* **tests:** Fixing tests ([c0a3e68](https://github.com/ReactiveX/IxJS/commit/c0a3e68a2966f8b7bf4bb6c2a2d27d8b393702da))
* **tests:** Get closure working on tests ([4c0705f](https://github.com/ReactiveX/IxJS/commit/4c0705fc318d97b8cf7e8d701386644daf8526f6))


### Build System

* **jest:** disable jest test caching ([92a1978](https://github.com/ReactiveX/IxJS/commit/92a1978b45025f107c93277b1e86720cc8858581))
* **typescript:** update typescript, tslib, and google-closure-compiler versions ([37d66b3](https://github.com/ReactiveX/IxJS/commit/37d66b31f6cc303e6a69c1caa43e7f3147096bec))


### chore

* **Abort:** Adds docs ([6950e8e](https://github.com/ReactiveX/IxJS/commit/6950e8ef6d579847b567c5f7632ce1fbce5c9acf))
* **add:** clean up adds ([8371ee4](https://github.com/ReactiveX/IxJS/commit/8371ee4144c6557a44c76ab25e48495687313651))
* **add:** fix add operators ([bb38187](https://github.com/ReactiveX/IxJS/commit/bb3818767cfb72c6ec26f455843f104d01464fae))
* **build:** Fix build issues ([1ae7646](https://github.com/ReactiveX/IxJS/commit/1ae76461497578404f9d8435736dbd0e49adae6b))
* **tests:** refactor tests to fit new APIs ([c179ca9](https://github.com/ReactiveX/IxJS/commit/c179ca9d528a4d8db0028acb703f31a20fee6a21))


### Code Refactoring

* **abortsignal:** remove AbortSignal interface ([8ed7fca](https://github.com/ReactiveX/IxJS/commit/8ed7fcad5ae7c01b401424f38579d137333b8f17))


### Styles

* **specs:** reorder expected vs. actual comparisons for error-throwing tests ([3cc1d8d](https://github.com/ReactiveX/IxJS/commit/3cc1d8d6d5b35d6c67874aff141ee0acbc88c179))


### Tests

* **umd:** import test utils to fix missing window global when testing webpack-minified UMD bundles ([111f854](https://github.com/ReactiveX/IxJS/commit/111f854023320539dfa3ba4cbc9fcc1661467688))



## [3.0.1](https://github.com/ReactiveX/IxJS/compare/v3.0.0...v3.0.1) (2020-02-21)


### chore

* **ESLint:** move from TSLint to ESLint ([#295](https://github.com/ReactiveX/IxJS/issues/295)) ([b0c90cb](https://github.com/ReactiveX/IxJS/commit/b0c90cb0798639b2fc878d4e9b5521bfb2bb63d8)), closes [#284](https://github.com/ReactiveX/IxJS/issues/284)
* **lint:** Exorcise tslint from the project ([#296](https://github.com/ReactiveX/IxJS/issues/296)) ([#297](https://github.com/ReactiveX/IxJS/issues/297)) ([86e887d](https://github.com/ReactiveX/IxJS/commit/86e887dd3c2870461e2eb60c80e1403c5d879cf1))
* **release:** 3.0.1 ([544eb4a](https://github.com/ReactiveX/IxJS/commit/544eb4a7dedfb246527fc999dbcec806cb0e2939))


### Documentation

* **CHANGELOG:** 3.0.1 ([0ded8c9](https://github.com/ReactiveX/IxJS/commit/0ded8c9d8655a003f00ebc30755702a216cb11cf))
* **readme:** Fix package name in readme ([#291](https://github.com/ReactiveX/IxJS/issues/291)) ([85ad6f3](https://github.com/ReactiveX/IxJS/commit/85ad6f3eecc06a9dc8fbcf0b592af9179974d5c9))



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
