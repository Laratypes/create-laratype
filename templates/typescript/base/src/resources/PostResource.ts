import { JsonResource } from "@laratype/http";
import { Prisma } from "@prisma/client";

export default class PostResource<T extends Prisma.postsGetPayload<{}>[]> extends JsonResource<T> {
  public toJson() {
    return this.data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      user_id: post.user_id,
    }))
  }
}