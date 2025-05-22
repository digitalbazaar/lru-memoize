/*!
 * Copyright (c) 2020-2025 Digital Bazaar, Inc. All rights reserved.
 */
import delay from 'delay';
import {LruCache} from '../lib/index.js';

describe('API', () => {
  it('has the proper exports', async () => {
    should.exist(LruCache);
    const m = new LruCache({ttl: 10});
    should.exist(m);
    m.memoize.should.be.a('function');
  });
  describe('memoize', () => {
    it('adds an item to the cache', async () => {
      const m = new LruCache();
      let executedTestFn = false;
      const testFn = async () => {
        // simulate an async task
        await delay(100);
        executedTestFn = true;
        return {success: true, timestamp: Date.now()};
      };
      const result = await m.memoize({
        key: 'test1',
        fn: testFn
      });
      should.exist(result);
      result.success.should.be.true;
      result.timestamp.should.be.a('number');
      executedTestFn.should.be.true;

      // the second request should use the cached promise and resolved result
      executedTestFn = false;
      const result2 = await m.memoize({
        key: 'test1',
        fn: testFn
      });
      should.exist(result2);
      result2.should.eql(result);
      executedTestFn.should.be.false;
    });
    it('adds an item to the cache w/custom `ttl`', async () => {
      const m = new LruCache();
      let executedTestFn = false;
      const testFn = async () => {
        // simulate an async task
        await delay(100);
        executedTestFn = true;
        return {success: true, timestamp: Date.now()};
      };
      const ttl = 200;
      const result = await m.memoize({
        key: 'test1',
        fn: testFn,
        options: {ttl}
      });
      should.exist(result);
      result.success.should.be.true;
      result.timestamp.should.be.a('number');
      executedTestFn.should.be.true;

      // the second request should use the cached promise and resolved result
      executedTestFn = false;
      const result2 = await m.memoize({
        key: 'test1',
        fn: testFn
      });
      should.exist(result2);
      result2.should.eql(result);
      executedTestFn.should.be.false;

      // third test should not find the expired result
      await delay(ttl + 1);
      executedTestFn = false;
      const result3 = await m.memoize({
        key: 'test1',
        fn: testFn
      });
      should.exist(result3);
      result3.should.not.eql(result);
      executedTestFn.should.be.true;
    });
  });
  describe('delete', () => {
    it('removes an item from the cache', async () => {
      const m = new LruCache();
      let executedTestFn = false;
      const testFn = async () => {
        // simulate an async task
        await delay(100);
        executedTestFn = true;
        return {success: true, timestamp: Date.now()};
      };
      const result = await m.memoize({
        key: 'test1',
        fn: testFn
      });
      should.exist(result);
      result.success.should.be.true;
      result.timestamp.should.be.a('number');
      executedTestFn.should.be.true;

      // the second request should use the cached promise and resolved result
      // that includes the same timestamp
      executedTestFn = false;
      const result2 = await m.memoize({
        key: 'test1',
        fn: testFn
      });
      should.exist(result2);
      result2.success.should.be.true;
      result2.timestamp.should.equal(result.timestamp);
      executedTestFn.should.be.false;

      // delete the cached promise
      const deleted1 = m.delete('test1');
      // should return `true` because `test1` was removed
      deleted1.should.equal(true);
      // should now return `false` because `test1` was already removed
      const deleted2 = m.delete('test1');
      deleted2.should.equal(false);

      // after deleting the cache entry, testFn should be executed producing
      // a result with a new timestamp
      executedTestFn = false;
      const result3 = await m.memoize({
        key: 'test1',
        fn: testFn
      });
      should.exist(result3);
      result3.success.should.be.true;
      result3.timestamp.should.not.equal(result.timestamp);
      executedTestFn.should.be.true;
    });
  });
});
