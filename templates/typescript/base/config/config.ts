
import { Env } from "@laratype/support";
import { Config } from "laratype";
import logging from "./logging";

export default {
  name: Env.get('APP_NAME', 'localhost'),
  env: Env.get('APP_ENV', 'local'),
  debug: Env.get('APP_DEBUG', true),
  url: Env.get('APP_URL', 'http://localhost'),
  timezone: Env.get('TIMEZONE', 'Asia/Tokyo'),
  schedule_timezone: Env.get('SCHEDULE_TIMEZONE', 'UTC'),
  locale: Env.get('LOCALE', 'en'),
  fallback_locale: Env.get('FALLBACK_LOCALE', 'en'),
  key: Env.get('APP_KEY', null),
  cipher: 'AES-256-CBC',
  logging,
} satisfies Config.AppConfig