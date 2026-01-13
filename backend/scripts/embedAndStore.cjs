#!/usr/bin/env node
const path = require('path');
const { pathToFileURL } = require('url');

(async () => {
  try {
    const script = path.join(__dirname, '..', 'src', 'server', 'embeddings', 'embedAndStore.js');
    await import(pathToFileURL(script).href);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();