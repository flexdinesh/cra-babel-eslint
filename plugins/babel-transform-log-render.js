const template = require("@babel/template").default;
const t = require("@babel/types");

function logRenderPlugin() {
  return {
    visitor: {
      Function(path) {
        let hasUseState = false;

        path.traverse({
          Identifier(idPath) {
            if (idPath.node.name === "useState") {
              hasUseState = true;
            }
          }
        });

        if (hasUseState) {
          const componentName = path.parentPath.node.id.name;
          const buildLogStatement = template(`
                console.log("%c >> RenderLog >> ", "color: hotpink;", COMP_NAME);
              `);
          const logStatement = buildLogStatement({
            COMP_NAME: t.stringLiteral(String(componentName))
          });
          path.get("body").unshiftContainer("body", logStatement);
        }
      }
    }
  };
}

module.exports = logRenderPlugin;
