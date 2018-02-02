const shell = require('./shell');
const { spawn } = require('child_process');
const config = require('./config-cli');
const style = require('./styles');

async function start() {

  console.log(style.info('Starting Corsica...'));

  let { installPath, pid } = await config.get();

  if (pid) {
    throw style.bad('Corsica is already running!');
  }

  let subprocess = shell('node', ['node_modules/corsica/index.js'], {
    cwd: installPath
  });

  await config.set('pid', process.pid);

}

async function startInBackground() {

  console.log(style.info('Starting Corsica...'));

  let { installPath, pid } = await config.get();

  if (pid) {
    throw style.bad('Corsica is already running!');
  }

  let subprocess = spawn('node', ['node_modules/corsica/index.js'], {
    cwd: installPath,
    detached: true,
    stdio: 'ignore'
  });

  subprocess.unref();

  await config.set('pid', subprocess.pid);

}

async function stop() {

  console.log(style.info('Stopping Corsica...'));

  let { pid } = await config.get();

  if (pid) {
    try {
      await shell('kill', [pid]);
    } catch (e) {
      console.warn(style.notice('Unable match running Corsica to process id, cleaning up.'));
    }
    await config.set('pid', null);
  } else {
    throw style.bad('No Running Corsica Found!');
  }

}

module.exports = {start, startInBackground, stop};
