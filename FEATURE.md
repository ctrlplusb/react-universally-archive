# Koa

This is a feature branch of `react-universally` that is currently built against `v11.0.1`.

It provides you with a simple Koa2 base implementation.

<img src="https://dl.dropboxusercontent.com/u/6396913/koa/logo.png" alt="koa middleware framework for nodejs" width="255px" />

  Koa is the next generation web framework for node.js, designed by the same people who created Express.
  It allows writing code without using callbacks by using the `async/await` operators, therefore also greatly increasing the readability and robustness of the application.

  Koa is not bundled with any middleware, but there is a [large collection](https://github.com/koajs/koa/wiki) of community middleware to choose from.

## Koa v2

```js
// Koa application is now a class and requires the new operator.
const app = new Koa();

// uses async arrow functions
app.use(async (ctx, next) => {
  try {
    await next(); // next is now a function
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

app.use(async ctx => {
  const user = await User.getById(ctx.session.userid); // await instead of yield
  ctx.body = user; // ctx instead of this
});
```

## About

This is the `react-universally-koa2` feature repository for `react-universally` starter kit.

It provides you with the build tooling and configuration you need to kick off your next universal react koa project.

## Maintainer

  - [Lucian Lature](https://github.com/lucianlature)

# License

  MIT
