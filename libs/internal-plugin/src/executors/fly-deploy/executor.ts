import { PromiseExecutor } from '@nx/devkit';
import { FlyDeployExecutorSchema } from './schema';
import { execSync } from 'child_process';

const runExecutor: PromiseExecutor<FlyDeployExecutorSchema> = async (
  options
) => {
  const cwd = options.dist;
  const results = execSync(`flyctl apps list`);
  try {
    if (results.toString().includes(options.name)) {
      execSync(`flyctl deploy`, { cwd, stdio: 'inherit' });
    } else {
      // consult https://fly.io/docs/reference/regions/ to get best region for you
      execSync(`flyctl launch --now --name=${options.name} --yes --copy-config --region=lax`, {
        cwd,
        stdio: 'inherit',
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Deployment failed:', error);
    return { success: false };
  }
};

export default runExecutor;
