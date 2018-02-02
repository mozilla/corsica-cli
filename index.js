#!/usr/bin/env node

const program = require('commander');
const {version} = require('./package.json');
const setup = require('./setup');
const style = require('./styles');
const shell = require('./shell');
const lifecycle = require('./lifecycle');
const serverConfig = require('./config-server');
const cliConfig = require('./config-cli');

// wrapper for cli actions. Provides more useful error info.
function helpful (fn) {
  return async function (...args) {
    try {
      await fn(...args);
      console.log(style.good('Done!'));
    } catch (e) {
      console.error(`
${style.bad('Something Went Wrong!')}

${style.info('If you ask for help, be sure to provide the following details:')}

CLI version: ${version}

Command run: ${program.rawArgs}

Error:
${e}
      `);
    }
  }
}

program.version(version);

program.command('setup')
  .description('setup a Corsica server')
  .action(helpful(async function () {

    console.log(style.info('\nSetting up Corsica...\n'));

    await setup();

  }));

program.command('start')
  .description('start the Corsica server')
  .option('-b, --background', 'run Corscia in the background')
  .action(helpful(async function (options) {

    if (options.background) {
      await lifecycle.startInBackground();
    } else {
      await lifecycle.start();
      console.log(style.info('Press Ctrl+C to exit.'));
    }

  }));

program.command('stop')
  .description('stop a running Corsica server')
  .action(helpful(async function () {

    await lifecycle.stop();

  }));

program.command('add-plugin [name]')
  .description('install a plugin')
  .action(helpful(async function (name) {

    let { installPath } = await cliConfig.get();

    console.log(style.info(`Installing ${name}...\n`));

    await shell('npm', ['install', name], { cwd: installPath });

    let cfg = await serverConfig.get();

    if (cfg.plugins.indexOf(name) === -1) {
      cfg.plugins.push(name);
    }

    await serverConfig.set('plugins', cfg.plugins);

  }));

program.command('update')
  .description('update Corsica and its plugins')
  .action(helpful(async function () {

    let { installPath } = await cliConfig.get();

    console.log(style.info('Updating...'));

    await shell('npm', ['update'], { cwd: installPath });

  }));


program.parse(process.argv);

if (program.args.length === 0) {
  program.outputHelp();
  process.stdout.write('\n');
}
