/* @flow */

import Koa from 'koa';
import { devMiddleware as createWebpackMiddleware, hotMiddleware as createWebpackHotMiddleware } from 'koa-webpack-middleware';
// import createWebpackHotMiddleware from 'webpack-hot-middleware';
import ListenerManager from './listenerManager';
import { log } from '../utils';

class HotClientServer {
  webpackDevMiddleware: any;
  listenerManager: ListenerManager;

  constructor(compiler : Object) {
    const app = new Koa();

    const httpPathRegex = /^https?:\/\/(.*):([\d]{1,5})/i;
    const httpPath = compiler.options.output.publicPath;
    if (!httpPath.startsWith('http') && !httpPathRegex.test(httpPath)) {
      throw new Error(
        'You must supply an absolute public path to a development build of a web target bundle as it will be hosted on a seperate development server to any node target bundles.',
      );
    }

    const [_, host, port] = httpPathRegex.exec(httpPath); // eslint-disable-line no-unused-vars

    this.webpackDevMiddleware = createWebpackMiddleware(compiler, {
      quiet: true,
      noInfo: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      // Ensure that the public path is taken from the compiler webpack config
      // as it will have been created as an absolute path to avoid conflicts
      // with an node servers.
      publicPath: compiler.options.output.publicPath,
    });

    app.use(this.webpackDevMiddleware);
    app.use(createWebpackHotMiddleware(compiler));

    const listener = app.listen(port, host);

    this.listenerManager = new ListenerManager(listener, 'client');

    compiler.plugin('compile', () => {
      log({
        title: 'client',
        level: 'info',
        message: 'Building new bundle...',
      });
    });

    compiler.plugin('done', (stats) => {
      if (stats.hasErrors()) {
        log({
          title: 'client',
          level: 'error',
          message: 'Build failed, please check the console for more information.',
          notify: true,
        });
        console.error(stats.toString());
      } else {
        log({
          title: 'client',
          level: 'info',
          message: 'Running with latest changes.',
          notify: true,
        });
      }
    });
  }

  dispose() {
    this.webpackDevMiddleware.close();

    return this.listenerManager
      ? this.listenerManager.dispose()
      : Promise.resolve([]);
  }
}

export default HotClientServer;
