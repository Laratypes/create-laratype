import { Auth } from "@laratype/auth";
import { Controller, Request, UseStatusCode } from "@laratype/http";
import User from "../../models/User";

export class LoginController extends Controller {

  public loginWithGoogle(req: Request) {
    return {
      test: true,
    }
  }

  @UseStatusCode(201)
  public login(req: Request) {
    const user = Auth.user<User>()
    return {
      user: user.getUser(),
    }
  }

  public handleGoogleCallback(req: Request) {
    return {
      callback: true,
    }
  }

  public handleGoogleLogin(req: Request) {
    return {
      callback: true,
    }
  }
}