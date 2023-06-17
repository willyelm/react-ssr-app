/**
 * @author Will Medina <williams.medinaa@gmail.com>
 */
import { PluginBuild } from 'esbuild';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
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

export const run = (entry: string) => {
  return {
    name: 'run',
    setup(build: PluginBuild) {
      const dir = build.initialOptions.outdir;
      const entryPath = path.join(dir, entry);
      let task: ChildProcessWithoutNullStreams;
      build.onEnd(() => {
        if (task) {
          task.kill();
        }
        task = start('node', [entryPath], {});
      });
    },
  };
};

export default run;
