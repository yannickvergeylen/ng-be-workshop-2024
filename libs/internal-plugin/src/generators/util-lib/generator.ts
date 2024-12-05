import {
  formatFiles,
  Tree
} from '@nx/devkit';
import { UtilLibGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/js';

export async function utilLibGenerator(
  tree: Tree,
  options: UtilLibGeneratorSchema
) {
  const prefixedName = `${options.directory}-util-${options.name}`;
  const directory = `libs/${options.directory}/${prefixedName}`;
  await libraryGenerator(tree, {

    directory, tags: `scope:${options.directory}, type:util`
  });
  console.log('full directory', directory);
  await formatFiles(tree);
}

export default utilLibGenerator;
