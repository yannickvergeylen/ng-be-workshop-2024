import { formatFiles, getProjects, ProjectConfiguration, Tree, updateJson } from '@nx/devkit';

async function updateScopeSchemaGenerator(tree: Tree) {
  const projects = getProjects(tree);
  const scopes = getScopes(projects);
  updateJson(tree, `${projects.get('internal-plugin').sourceRoot}/generators/util-lib/schema.json`, (json) => {
    json.properties.directory['x-prompt'].items = scopes.map((scope) => ({
      value: scope,
      label: scope
    }));
    return json;
  });
  const schemaDTSPath = `${projects.get('internal-plugin').sourceRoot}/generators/util-lib/schema.d.ts`;
  const schemaDTS = tree.read(schemaDTSPath).toString();
  tree.write(schemaDTSPath, replaceScopes(schemaDTS, scopes));
  await formatFiles(tree);
}

function replaceScopes(content: string, scopes: string[]): string {
  const joinScopes = scopes.map((s) => `'${s}'`).join(' | ');
  const PATTERN = /interface UtilLibGeneratorSchema \{\n.*\n.*\n\}/gm;
  return content.replace(
    PATTERN,
    `interface UtilLibGeneratorSchema {
  name: string;
  directory: ${joinScopes};
}`
  );
}

function getScopes(projectMap: Map<string, ProjectConfiguration>) {
  const allScopes: string[] = Array.from(projectMap.values())
    .map((project) => {
      if (project.tags) {
        return project.tags.filter((tag: string) => tag.startsWith('scope:'));
      }
      return [];
    })
    .flat()
    .map((scope: string) => scope.slice(6));

  // remove duplicates
  return Array.from(new Set(allScopes));
}

export default updateScopeSchemaGenerator;
