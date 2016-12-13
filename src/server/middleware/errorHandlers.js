/* @flow */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import type { KoaContext as $KoaContext } from 'koa-flow-declarations/KoaContext';
import compose from 'koa-compose';

const errorHandlersMiddleware = () => async (ctx: $KoaContext, next: Function) => {
  try {
    await next()
  } catch (err) {
    // Handle 404 errors.
    // Note: the react application middleware hands 404 paths, but it is good to
    // have this backup for paths not handled by the universal middleware. 
    // For example you may bind a /api path to koa.
    if (err.status === 400) {
      ctx.status = 400;
      ctx.body = 'Sorry, that resource was not found.';
    } else {
      // Handle all unhandled errors.
      // Typically you want to return a "500" response status.
      // Note: You must provide specify all 4 parameters on this callback function
      // even if they aren't used, otherwise it won't be used.

      console.log(err);
      console.log(err.stack);
      ctx.status = 500;
      ctx.body = 'Sorry, an unexpected error occurred.';
      await next();
    }
  }
}

export default (errorHandlersMiddleware : Function<Middleware>);
