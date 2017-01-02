/* eslint-disable no-unused-vars */

import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
import send from 'koa-send';
import config from '../../../config';

// Middleware to server our service worker.
async function serviceWorkerMiddleware(ctx, next) {
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
