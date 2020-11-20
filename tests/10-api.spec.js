/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import * as lruMemoize from '..';

describe('API', () => {
  it('has the proper exports', async () => {
    should.exist(lruMemoize.default);
    should.exist(lruMemoize.default.LruMemoize);
    const m = new lruMemoize.default.LruMemoize();
    should.exist(m);
    m.memoize.should.be.a('function');
  });
});
