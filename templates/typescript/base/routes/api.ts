import { RouteOptions } from "@laratype/http";
import { BaseController } from "../src/http/controllers/BaseController";
import { LoginController } from "../src/http/controllers/LoginController";
import RegisterController from "../src/http/controllers/RegisterController";
import { LocalAuthentication, Web } from "../src/http/middleware/Middleware";
import CreateUserRequest from "../src/http/requests/CreateUserRequest";
import TestRequest from "../src/http/requests/TestRequest";

export const baseRouteApi: RouteOptions = {
  path: "",
  middleware: [
    Web
  ],
  controller: BaseController.__invoke('home'),
  request: TestRequest,
  method: "get",
  children: [
    {
      path: '/register',
      controller: RegisterController.__invoke('register'),
      method: "post",
      request: CreateUserRequest,
    },
    {
      path: '/passport',
      children: [
        {
          path: '/login',
          method: "post",
          controller: LoginController.__invoke('login'),
          middleware: [
            LocalAuthentication,
          ]
        },
      ]
    }
  ]
}