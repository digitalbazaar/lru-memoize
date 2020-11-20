/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import LRU from 'lru-cache';

export default class LruMemoize {
  constructor(cacheOptions) {
    this.cache = new LRU(cacheOptions);
  }

  async memoize({key, fn}) {
    let promise = this.cache.get(key);
    if(promise) {
      return promise;
    }

    // cache miss
    promise = fn();
    this.cache.set(key, promise);

    let result;
    try {
      result = await promise;
    } catch(e) {
      this.cache.del(key);
      throw e;
    }

    return result;
  }
}
