# @digitalbazaar/lru-memoize ChangeLog

## 4.0.0 - 2025-mm-dd

### Changed
- **BREAKING**: Use `lru-cache@11`. This replaces `lru-cache@6` which has a
  number of breaking changes that impact any use of this library that
  previously accessed the underlying cache interface. The main interface
  of this module has only changed in that the options it accepts when
  creating the cache need to now conform to v11 of `lru-cache` instead of
  v6. The v6 `maxAge` option, if given, will be coerced to `ttl` to match
  v11.
- **BREAKING**: The `delete()` method now returns `true` if the passed key was
  removed from the cache and `false` if not, matching the v11 `delete()`
  interface. Previously, `undefined` was returned in both cases.

## 3.0.2 - 2023-08-27

### Fixed
- Only remove promise entries from cache after settling if the entry has not
  changed.

## 3.0.1 - 2023-08-27

### Fixed
- Ensure same promise is returned from `memoize` that is cached.

## 3.0.0 - 2022-06-02

### Changed
- **BREAKING**: Convert to module (ESM).
- **BREAKING**: Require Node.js >=14.
- Update dependencies.
- Lint module.

## 2.2.0 - 2022-02-27

### Added
- Allow cache `options` to be passed to `memoize`. Only cache options
  that are supported by the underlying LRU instance will be used.

## 2.1.0 - 2021-06-30

### Added
- Add dispose on settle feature.

## 2.0.0 - 2021-03-02

### Changed
- **BREAKING**: Rename `LruMemoize` class to `LruCache`.
- **BREAKING**: Use named export for `LruCache`.

## 1.1.0 - 2020-11-24

- Implement `delete` API.

## 1.0.0 - 2020-11-23

- See git history for details.
