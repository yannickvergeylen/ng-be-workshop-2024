import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readProjectConfiguration, Tree } from '@nx/devkit';

import { updateScopeSchemaGenerator } from './generator';
import { UpdateScopeSchemaGeneratorSchema } from './schema';
import { generatorGenerator, pluginGenerator } from '@nx/plugin/generators';
import { Linter } from '@nx/eslint';

describe('update-scope-schema generator', () => {
  let tree: Tree;
  const options: UpdateScopeSchemaGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await updateScopeSchemaGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});

async function addUtilLibProject(tree: Tree) {
  await pluginGenerator(tree, {
    name: 'internal-plugin',
    directory: 'libs',
    skipTsConfig: false,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
    compiler: 'tsc',
    skipFormat: false,
    skipLintChecks: false
  });
  await generatorGenerator(tree, {
    name: 'util-lib',
    // directory: 'libs/internal-plugin/src/generators/util-lib',
    unitTestRunner: 'jest',
  });
}
