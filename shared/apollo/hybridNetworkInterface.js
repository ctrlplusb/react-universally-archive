import { createBatchingNetworkInterface, createNetworkInterface } from 'apollo-client';
import merge from 'lodash.merge';
import config from '../../config';

export class HTTPHybridNetworkInterface {
  constructor(opts = {}, headers = {}) {
    const richerOpts = merge(
      {},
      {
        uri: config('graphqlUri'),
        opts: {
          headers,
        },
      },
      opts,
    );

    this.batchedInterface = createBatchingNetworkInterface(richerOpts);
    this.networkInterface = createNetworkInterface(richerOpts);
  }

  query(request) {
    // eslint-disable-next-line no-underscore-dangle
    if (request.variables && request.variables.__disableBatch) {
      return this.networkInterface.query(request);
    }

    return this.batchedInterface.query(request);
  }

  use(middlewares) {
    this.networkInterface.use(middlewares);
    this.batchedInterface.use(middlewares);
    return this;
  }

  useAfter(afterwares) {
    this.networkInterface.useAfter(afterwares);
    this.batchedInterface.useAfter(afterwares);
    return this;
  }
}

export function createHybridNetworkInterface(opts = {}, headers = {}) {
  return new HTTPHybridNetworkInterface(opts, headers);
}
