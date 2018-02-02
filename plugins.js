const format = require('./format');
const serverConfig = require('./config-server');
const cliConfig = require('./config-cli');
const shell = require('./shell');
const style = require('./styles');

async function install(name) {
  let { installPath } = await cliConfig.get();

  await shell('npm', ['install', name], { cwd: installPath });

  let cfg = await serverConfig.get();

  if (cfg.plugins.indexOf(name) === -1) {
    cfg.plugins.push(name);
  }

  await serverConfig.set('plugins', cfg.plugins);
}

async function remove(name) {
  let { installPath } = await cliConfig.get();

  let lsInfo = await shell('npm', ['ls', '--json'], { cwd: installPath, logging: false });
  lsInfo = JSON.parse(lsInfo);

  let npmPlugins = Object.keys(lsInfo.dependencies);

  let cfg = await serverConfig.get();

  if (cfg.plugins.indexOf(name) !== -1) {
    if (npmPlugins.indexOf(name) === -1) {
      throw style.bad(`Cannot remove built-in plugin ${name}!`);
    } else {
      cfg.plugins.splice(cfg.plugins.indexOf(name), 1);
      await shell('npm', ['uninstall', name], { cwd: installPath });
      await serverConfig.set('plugins', cfg.plugins);
    }
  } else {
    throw style.bad(`Plugin ${name} not installed!`);
  }
}

async function list() {
  let { installPath } = await cliConfig.get();

  let lsInfo = await shell('npm', ['ls', '--json'], { cwd: installPath, logging: false });
  lsInfo = JSON.parse(lsInfo);

  let npmPlugins = Object.keys(lsInfo.dependencies);

  let cfg = await serverConfig.get();

  console.log(style.info('Currently installed plugins:\n'));

  format.table(cfg.plugins.map(p => {
    if (npmPlugins.indexOf(p) === -1) {
      return [p, '', '(built-in plugin)'];
    } else {
      return [p, 'v' + lsInfo.dependencies[p].version, 'installed from npm'];
    }
  }), [style.notice,, s => s[0] === '(' ? s : style.info(s)]);
}

module.exports = {install, remove, list};
