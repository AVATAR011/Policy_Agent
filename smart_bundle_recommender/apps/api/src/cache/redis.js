// // Redis disabled intentionally. No caching.
export async function getCache(_key) {
    return null;
}
export async function setCache(_key, _val, _ttlSeconds) {
    // no-op
}
