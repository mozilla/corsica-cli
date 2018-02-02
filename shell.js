const { spawn } = require('child_process');

module.exports = function shell(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const cmd = spawn(command, args, options);
    const logging = options.logging || true;

    cmd.stdout.on('data', (data) => {
      if (logging) {
        process.stdout.write(data);
      }
    });

    cmd.stderr.on('data', (data) => {
      if (logging) {
        process.stderr.write(data);
      }
    });

    cmd.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  });
}
