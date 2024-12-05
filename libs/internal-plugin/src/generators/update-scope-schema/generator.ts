import { formatFiles, getProjects, ProjectConfiguration, Tree, updateJson } from '@nx/devkit';

async function updateScopeSchemaGenerator(tree: Tree) {
  const projects = getProjects(tree);
  const scopes = getScopes(projects);
  updateJson(tree, `${projects.get('internal-plugin').sourceRoot}/generators/util-lib/schema.json`, (json) => {
    json.properties.directory['x-prompt'].items = scopes.map((scope) => ({
      value: scope,
      label: scope,
    }));
    return json;
  });
  await formatFiles(tree);
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
