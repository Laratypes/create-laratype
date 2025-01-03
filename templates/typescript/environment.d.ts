import { EnvVariables } from "@laratype/support"
import { Config } from "laratype"

export { }

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVariables {
    }
  }
}