import { Controller, Request } from "@laratype/http";
import { Log } from "@laratype/log";
import dayjs from "dayjs";
import { prisma } from "../../config/database/prisma";
import CreateUserRequest from "../requests/CreateUserRequest";
import UserCollection from "../resources/UserCollection";

export default class UserController extends Controller {

  async store(request: CreateUserRequest) {
    const params = request.validated();
    return prisma.user.create({
      data: {
        ...params,
        test: "11",
      }
    })
  }

  async index() {
    const now = dayjs().tz();

    Log.info(now);

    const users = await prisma.user.findMany({})
    return new UserCollection(users)
  }
}