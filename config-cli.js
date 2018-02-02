const fs = require('fs-extra');
const path = require('path');

const CLI_CONFIG_PATH = path.join(process.env.HOME, '.corsica');
const CLI_CONFIG = path.join(CLI_CONFIG_PATH, 'config.json');

async function init() {
  await fs.ensureDir(CLI_CONFIG_PATH);
  await fs.writeFile(CLI_CONFIG, JSON.stringify({}));
}

async function get() {
  let data = await fs.readFile(CLI_CONFIG);
  let config = JSON.parse(data.toString('utf8'));
  return config;
}

async function set(key, value) {
  let config = await get();
  config[key] = value;
  await fs.writeFile(CLI_CONFIG, JSON.stringify(config, null, 2));
}

module.exports = {CLI_CONFIG, CLI_CONFIG_PATH, get, set, init};
