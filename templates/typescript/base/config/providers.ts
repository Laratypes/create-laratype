import { ServiceProvider } from "@laratype/support";
import RouteServiceProvider from "../src/providers/RouteServiceProvider";

export default [
  RouteServiceProvider,
] satisfies Array<typeof ServiceProvider>