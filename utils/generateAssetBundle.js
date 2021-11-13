// this script creates a lookup of calcite-component assets
const fs = require("fs");
const path = require('path');

(async function () {
  const outputTarget = `./node_modules/@esri/calcite-components/dist/calcite/`;
  const assetBase = `${outputTarget}assets/`;
  const dirs = await fs.promises.readdir(assetBase)

  /**
   * asset lookup object of the form: { [assetPath]: assetContent }
   */
  const lookup = {};

  /**
   * This method will build a path by recursively looking into each directory until asset files are reached (when innermost directory is reached)
   */
  async function getAssetPath(base) {
    const contents = await fs.promises.readdir(base, { withFileTypes: true });
    const nestedDirectory = contents.find(content => content.isDirectory());

    // for our purposes, we only need to process one directory
    if (nestedDirectory) {
      return getAssetPath(`${base}/${nestedDirectory.name}`);
    }

    return base;
  }

  for (const componentDir of dirs) {
    const assetDir = await getAssetPath(`${assetBase}${componentDir}`);
    const assetFiles = await fs.promises.readdir(assetDir);

    for (const asset of assetFiles) {
      const assetPath = `${assetDir}/${asset}`;
      const assetContent = await fs.promises.readFile(assetPath, { encoding: "utf8" });
      lookup[assetPath.replace(outputTarget, "")] = assetContent;
    }
  }

  const scriptName = path.basename(__filename);
  const content = `// this file is generated by \`${scriptName}\`
export default ${JSON.stringify(lookup, null, 2)}
`;
  await fs.promises.writeFile("src/assetLookup.js", content);
})();

