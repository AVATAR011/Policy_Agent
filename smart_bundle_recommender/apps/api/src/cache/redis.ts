// // Redis disabled intentionally. No caching.

export async function getCache(_key: string) {
  return null;
}

export async function setCache(
  _key: string,
  _val: string,
  _ttlSeconds: number,
) {
  // no-op
}
