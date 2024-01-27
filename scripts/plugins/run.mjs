/**
 * @author Will Medina <williams.medinaa@gmail.com>
 */
import { spawn } from 'child_process';
import path from 'path';


export const start = (command, args, options) => {
  const child = spawn(command, args, options);
  if (child.stderr) {
    child.stderr.pipe(process.stderr, {
      end: false
    });
    child.stderr.setEncoding('utf8');
  }
  if (child.stdout) {
    child.stdout.pipe(process.stdout, {
      end: false
    });
    child.stdout.setEncoding('utf8');
  }
  child.on('error', (message) => {
    throw new Error(message.toString());
  });
  child.on('close', () => {
    if (child.stdin) {
      child.stdin.end();
    }
  });
  return child;
}

export const run = (entryFile, entryArgs = []) => {
  return {
    name: 'run',
    setup(build) {
      const { base } = path.parse(build.initialOptions.outdir);
      const entryLocation = path.join(base, entryFile);
      let task;
      build.onEnd(() => {
        if (task) task.kill();
        task = start('node', [...entryArgs, entryLocation], {
          cwd: process.cwd(),
          env: process.env
        });
      });
    },
  };
};

export default run;
