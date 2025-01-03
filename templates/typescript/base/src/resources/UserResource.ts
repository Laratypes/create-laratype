import { JsonResource } from "@laratype/http";
import { Prisma } from "@prisma/client";

type WrapResource<T> = Array<T>

export default class UserResource<T extends WrapResource<Prisma.usersGetPayload<{}>>> extends JsonResource<T> {
  public toJson() {
    return this.data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }))
  }
}