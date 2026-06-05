const BASE = import.meta.env.BASE_URL

export const asset = (path: string): string =>
  BASE + path.replace(/^\//, '')
