import { Controller } from "@laratype/http";
import User from "../../models/User";
import CreateUserRequest from "../requests/CreateUserRequest";
import UserCollection from "../resources/UserCollection";


export default class UserController extends Controller {

  async store(request: CreateUserRequest) {
    const params = request.validated();
    return {}
  }

  async index() {
    const users = await User.find();
    return new UserCollection(users)
  }
}