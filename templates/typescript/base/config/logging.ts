import { Env } from "@laratype/support";

export default {
  default: Env.get('LOG_CHANNEL', 'single'),
  channels: {
    stack: {
      driver: 'stack' as const,
      channel: ['single'],
    },
    single: {
      driver: 'single' as const,
      level: Env.get('LOG_LEVEL', 'debug'),
    },
    daily: {
      driver: 'daily' as const,
      level: Env.get('LOG_LEVEL', 'debug'),
      days: 14 as const,
    }
  }
}