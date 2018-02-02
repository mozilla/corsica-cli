const fs = require('fs-extra');
const path = require('path');
const cliConfig = require('./config-cli');

const defaultConfig = {
  port: 8080,
  plugins: ['brain', 'census', 'settings', 'command', 'content', 'timer', 'namer', 'glob', 'tags']
};

async function getConfigPath() {
  let { installPath } = await cliConfig.get();
  return path.join(installPath, 'config.json');
}

async function init() {
  await fs.writeFile(await getConfigPath(), JSON.stringify(defaultConfig));
}

async function get() {
  let data = await fs.readFile(await getConfigPath());
  let config = JSON.parse(data.toString('utf8'));
  return config;
}

async function set(key, value) {
  let config = await get();
  config[key] = value;
  await fs.writeFile(await getConfigPath(), JSON.stringify(config, null, 2));
}

module.exports = {get, set, init};
