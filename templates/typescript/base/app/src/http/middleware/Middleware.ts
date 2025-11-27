import { Passport } from "@laratype/auth";
import { Middleware, type MiddlewareHandler } from "@laratype/http";


export class Web extends Middleware {
  handle: MiddlewareHandler = async (request, res, next) => {

    return next(request);
  }
}

export class LocalAuthentication extends Middleware {
  handle: MiddlewareHandler = async (request, res, next) => {
    const handler = await Passport.authenticate('web');

    return handler(res, next);
  }
}