/* @flow */
/* eslint-disable no-unused-vars */

import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
import type { KoaContext as $KoaContext } from 'koa-flow-declarations/KoaContext';
import send from 'koa-send';
import config from '../../../config';

// Middleware to server our service worker.
async function serviceWorkerMiddleware(
  ctx: $KoaContext, next: Function) {
  await send(ctx,
    pathResolve(
      appRootDir.get(),
      config.bundles.client.outputPath,
      config.serviceWorker.fileName,
    ), {
      root: '/',
    },
  );
}

export default serviceWorkerMiddleware;
