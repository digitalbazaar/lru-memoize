/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import LRU from 'lru-cache';

/**
 * LruMemoize uses the npm module `lru-cache` to memoize promises.
 *
 * @see https://www.npmjs.com/package/lru-cache
 * @see https://en.wikipedia.org/wiki/Memoization
 * @param {object} cacheOptions - Options for `lru-cache`.
 *   See the npm docs for more options.
 * @param {number} [cacheOptions.max] - The max size of the cache.
 * @param {number} [cacheOptions.maxAge] - The maxAge of an item in ms.
 *
 * @returns {LruMemoize} The class.
*/
export default class LruMemoize {
  constructor(cacheOptions) {
    this.cache = new LRU(cacheOptions);
  }

  /**
   * Memoizes a promise via an LRU cache.
   *
   * @param {object} options - Options to use.
   * @param {string} options.key - A key for the cache.
   * @param {Function<Promise>} options.fn - A Function that returns a
   *   promise to memoize.
   * @param {object} [options.args] - The arguments to pass into the function
   *   `fn`.
   *
   * @returns {Promise} - The result of the memoized promise.
  */
  async memoize({key, fn, args}) {
    let promise = this.cache.get(key);
    if(promise) {
      return promise;
    }

    // cache miss
    promise = fn(args);
    this.cache.set(key, promise);

    let result;
    try {
      result = await promise;
    } catch(e) {
      // if the promise rejects, delete it
      this.cache.del(key);
      throw e;
    }

    return result;
  }
}
