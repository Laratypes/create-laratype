import { Controller } from "@laratype/http";
import User from "../../models/User";
import CreateUserRequest from "../requests/CreateUserRequest";

export default class RegisterController extends Controller {

  async register(request: CreateUserRequest) {

    const user = await User.save(request.validated());

    return user;
  }


}