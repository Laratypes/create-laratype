import { Controller } from "@laratype/http";
import { prisma } from "../../config/database/prisma";
import PostCollection from "../resources/PostCollection";

export default class PostController extends Controller {

  store() {
    return prisma.post.create({
      data: {
        content: "Hello World",
        title: "Test Post",
        authorId: 1,
      }
    })
  }

  async index() {
    return new PostCollection(await prisma.post.findMany())
  }
}