# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.29](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.28...v0.0.29) (2022-07-19)


### Bug Fixes

* :bug: add context.ts to list of package exports ([8b40f06](https://github.com/a-luna/svelte-simple-tables/commit/8b40f06ddfaf6dbc9d448045a411ea56bb349c3a))

### [0.0.28](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.27...v0.0.28) (2022-07-19)

### Features

- :label: define types for events emitted by component (sortTable, rowClicked, changePageSize) ([6ed73d5](https://github.com/a-luna/svelte-simple-tables/commit/6ed73d5f7475d6222551e253791bddcbbed888e8))

### [0.0.27](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.26...v0.0.27) (2022-07-19)

### [0.0.26](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.25...v0.0.26) (2022-07-07)

### Features

- :sparkles: remove propType from ColumnSettings, now automatically inferred, simplifying config process ([85995ea](https://github.com/a-luna/svelte-simple-tables/commit/85995ea41df52f82836373296a5f77b2040915a5))

### [0.0.25](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.24...v0.0.25) (2022-07-07)

### Bug Fixes

- :bug: ([a222227](https://github.com/a-luna/svelte-simple-tables/commit/a222227de908542bca658d3e2fed6922ba6648f5))
- :bug: fix: page nav button container has wrong background-color when client has existing styles targeting nav element ([24f70bd](https://github.com/a-luna/svelte-simple-tables/commit/24f70bd7858987fff818b7290cc853edb8cb75ed))
- :recycle: add 'sst-' prefix to all responsive table css class names to avoid name collision with dependent code ([ae96ff2](https://github.com/a-luna/svelte-simple-tables/commit/ae96ff25432bb7b3fcddf80136172b205e0747af))

### [0.0.24](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.23...v0.0.24) (2022-07-06)

### Bug Fixes

- :bug: fix weird text mangling in TableHeader.svelte ([cb4ed4a](https://github.com/a-luna/svelte-simple-tables/commit/cb4ed4a22c8f1546e8831f0921dc033acdb1435c))
- :bug: fix: if page nav/range format=auto, use containerWidth rather than pageWidth for decision ([335681d](https://github.com/a-luna/svelte-simple-tables/commit/335681d2fb4ab0066d47a038444aaaa8de1e0d6a))

### [0.0.23](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.22...v0.0.23) (2022-07-05)

### Bug Fixes

- :label: minor typescript fixes to TableState nd TableSettings interfaces ([ef1d6f0](https://github.com/a-luna/svelte-simple-tables/commit/ef1d6f065a77c9753e066216c65f2fd931af22be))

### [0.0.22](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.21...v0.0.22) (2022-07-05)

### Bug Fixes

- :bug: allow user to choose how table is displayed when table is smaller than container ([b48f9fd](https://github.com/a-luna/svelte-simple-tables/commit/b48f9fd3e8e6b5a43a7680a1e843702e8c649692))
- :bug: overflow-x autoscroll behavior is broken when placed within a flex container ([fbba8e6](https://github.com/a-luna/svelte-simple-tables/commit/fbba8e621d43d207e320b99412cef0c0b35fd47a))
- :bug: remove role="navigation" from PageNavigationCompact component ([56f9aa5](https://github.com/a-luna/svelte-simple-tables/commit/56f9aa5bc2d64bf9711c079f4dc17bbbf0434d7b))

### [0.0.21](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.20...v0.0.21) (2022-03-11)

### Features

- :sparkles: removed fullWidth table config setting ([f63999d](https://github.com/a-luna/svelte-simple-tables/commit/f63999d6a08ffb6ef430c50c64c9346e0d2f899d))

### Bug Fixes

- :bug: improved componentWidth logic for annnoying corner-cases re: wrapper width, padding, etc ([3f3f583](https://github.com/a-luna/svelte-simple-tables/commit/3f3f5833efd565a91e0d9c20efe8440436bba83d))
- :bug: table should display with margin-left and margin-right = auto by default ([e201bf1](https://github.com/a-luna/svelte-simple-tables/commit/e201bf10d500f805c370b7d02749ce48d57710c0))

### [0.0.20](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.19...v0.0.20) (2022-03-09)

### Bug Fixes

- :bug: background-color should inherit when tableWrapper=false ([2ff1de8](https://github.com/a-luna/svelte-simple-tables/commit/2ff1de86756c888546e9f882c37bbed61db2fd05))
- :bug: remove role="navigation" from PaginationNavigation ([6a53966](https://github.com/a-luna/svelte-simple-tables/commit/6a53966f1ede4f9b331a70bae75bc85b9fa2f5c7))
- :bug: simplify how container/wrapper widths are determined ([3114f99](https://github.com/a-luna/svelte-simple-tables/commit/3114f9995b08437517a1c47946b473cb3dc0f402))
- :test_tube: update jest snapshots ([3f3d361](https://github.com/a-luna/svelte-simple-tables/commit/3f3d36199c1b85c838e50b0ff20acdea582f3400))

### [0.0.19](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.18...v0.0.19) (2022-02-07)

### Bug Fixes

- :bug: prevent accessing property of undefined object in PageSizeSettings component ([68f12cb](https://github.com/a-luna/svelte-simple-tables/commit/68f12cb909b67159040c2ce0b9ea56bfdbd4b32e))

### [0.0.18](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.17...v0.0.18) (2022-02-07)

### Bug Fixes

- :bug: hard crash when accessing page size options ([a0ab661](https://github.com/a-luna/svelte-simple-tables/commit/a0ab661e122e026a557ac0cebf8212df31265d16))

### [0.0.17](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.16...v0.0.17) (2022-02-03)

### Bug Fixes

- :bug: component width error when container width is less than 100% of page width ([693f928](https://github.com/a-luna/svelte-simple-tables/commit/693f9286e3d61d8888c7da0fed1665e2b12a2604))

### [0.0.16](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.15...v0.0.16) (2022-01-20)

### Bug Fixes

- :lipstick: border between valid/invalid page size buttons is missing ([0f39efc](https://github.com/a-luna/svelte-simple-tables/commit/0f39efccdf089d9936a361a0f44f35087cd639ed))

### [0.0.15](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.14...v0.0.15) (2022-01-19)

### Features

- :sparkles: add animateSorting property to TableSettings ([f806ff3](https://github.com/a-luna/svelte-simple-tables/commit/f806ff342cf553d4c6f50f14d287ae0eb05bf18e))

### [0.0.14](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.13...v0.0.14) (2022-01-18)

### Features

- :sparkles: add clickableRows property to tableSettings ([217f358](https://github.com/a-luna/svelte-simple-tables/commit/217f35814b3dc27704a13cd5f9be5826f8b6c82d))

### [0.0.13](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.12...v0.0.13) (2022-01-18)

### Features

- :sparkles: add reset method to tableState store ([ae20174](https://github.com/a-luna/svelte-simple-tables/commit/ae201740de44b254917557183b455ee36be9687f))

### [0.0.12](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.11...v0.0.12) (2022-01-18)

### Features

- :sparkles: add property to PageWidthState to return name of current page breakpoint ([9c41c51](https://github.com/a-luna/svelte-simple-tables/commit/9c41c51619ccd9995aa6d791f648e7ca81e22e86))

### [0.0.11](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.10...v0.0.11) (2022-01-05)

### Bug Fixes

- :bug: column is sortable when sortable=false ([a3c328d](https://github.com/a-luna/svelte-simple-tables/commit/a3c328de8f4ed9753f93bc5d0de23740719813ca)), closes [#5](https://github.com/a-luna/svelte-simple-tables/issues/5)

### [0.0.10](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.9...v0.0.10) (2021-12-27)

### [0.0.9](https://github.com/a-luna/svelte-simple-tables/compare/v0.0.8...v0.0.9) (2021-12-24)
