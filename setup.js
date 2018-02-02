const read = require('./read');
const styles = require('./styles');
const fs = require('fs-extra');
const path = require('path');
const shell = require('./shell');
const config = require('./config-cli');
const serverConfig = require('./config-server');

module.exports = async function setup () {

  if (await fs.exists(config.CLI_CONFIG)) {
    throw styles.bad('Corsica is already installed!');
  }

  let installPath = await read({
    prompt: styles.notice('Where to install Corsica: '),
    default: path.join(process.env.HOME, 'corsica-server')
  });

  installPath = path.resolve(installPath);

  console.log(styles.info('Installing Corsica...\n'));

  await fs.ensureDir(installPath);

  await shell('npm', ['init', '-y'], { cwd: installPath });

  console.log(styles.info('Downloading Server...\n'));

  await shell('npm', ['install', 'corsica'], { cwd: installPath });

  console.log(styles.info('Writing config...\n'));

  await config.init();
  await config.set('installPath', installPath);

  await serverConfig.init();

  console.log(styles.good(`Wrote installation info to ${config.CLI_CONFIG}.\n`));

}
