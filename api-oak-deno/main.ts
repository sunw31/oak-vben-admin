import { Application, Middleware, oakCors } from "./deps.ts";
import * as middlewares from "./app/middleware/index.ts";
import { config } from "./config/config.ts";
import { rateLimit } from "./config/rate_limit.ts";
import { Context } from "./app/type/context.ts";
import { router } from "./app/router.ts";
import { jwtOptions } from "./app/extend/jwt.ts";
import {
  IgnorePattern,
  jwtMiddleware,
  OnSuccessHandler,
} from "./app/middleware/jwt.middleware.ts";

// fixme - add permission manifest
const app = new Application<Context>();

app.use(oakCors());
app.use(rateLimit);
// app.use(session.initMiddleware())

app.use(middlewares.loggerMiddleware);
app.use(middlewares.errorMiddleware);
app.use(middlewares.responseTimeHeader);

const onSuccess: OnSuccessHandler = (ctx, jwtPayload) => {
  ctx.state.cur_user = jwtPayload;
};
const ignorePatterns: IgnorePattern[] = ["/register", /login/];
// {
//   path: "/register",
//   methods: ["POST"],
// }];
app.use(
  jwtMiddleware<Middleware>({ ...jwtOptions, onSuccess, ignorePatterns }),
);
// app.use(middlewares.requestIdMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener(
  "listen",
  (e) =>
    console.log(
      `%cListening on http://localhost:${config.PORT} ${e.type}`,
      "color: blue",
    ),
);

await app.listen({ port: Number(config.PORT) });
