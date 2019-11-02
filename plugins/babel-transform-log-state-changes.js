const template = require("@babel/template").default;
const t = require("@babel/types");

function logStateChangesPlugin() {
  return {
    visitor: {
      Function(path) {
        let hasUseState = false;

        path.traverse({
          Identifier(useStateIdPath) {
            if (useStateIdPath.node.name === "useState") {
              hasUseState = true;
              const varDeclarationPath = useStateIdPath.findParent(p =>
                p.isVariableDeclaration()
              );
              // change const to let
              varDeclarationPath.node.kind = "let";
              const componentName = path.parentPath.node.id.name;

              const varDeclaratorPath = useStateIdPath.findParent(p =>
                p.isVariableDeclarator()
              );

              const stateName = varDeclaratorPath.node.id.elements[0].name;
              const stateSetter = varDeclaratorPath.node.id.elements[1];
              const replacementSetterName = stateSetter.name + "_INTERNAL";

              varDeclarationPath.insertAfter(
                t.assignmentExpression(
                  "=",
                  stateSetter,
                  t.identifier(replacementSetterName)
                )
              );

              varDeclarationPath.insertAfter(
                t.variableDeclaration("const", [
                  t.variableDeclarator(
                    t.identifier(replacementSetterName),
                    t.callExpression(t.identifier("customSetVal"), [
                      stateSetter,
                      t.stringLiteral(componentName),
                      t.stringLiteral(stateName)
                    ])
                  )
                ])
              );

              // varDeclaratorPath.skip()
            }
          }
        });

        if (hasUseState) {
          const buildCustomSetValMethod = template(`
            const customSetVal = (setter, cName, sName) => val => {
              if (!global.stateStore) {
                global.stateStore = {};
              }
              const str = global.stateStore;
              if (str[cName]) {
                if (str[cName][sName]) {
                  str[cName][sName].push(val);
                } else {
                  str[cName][sName] = [val];
                }
              } else {
                str[cName] = {
                  [sName]: [val]
                };
              }
            
              const vals = str[cName][sName];
              if (vals.length > 1) {
                const prevVal = vals[vals.length - 2];
                console.log("%c >> StateChangeLog >>", "color: green;", cName, ":", sName, ":", prevVal, "=>", val);
              } else {
                console.log("%c >> StateChangeLog >>", "color: green;", cName, ":", sName, ":", val);
              }
            
              return setter(val);
            };
          `);

          const customSetValMethod = buildCustomSetValMethod();
          const componentDeclarationPath = path.findParent(p =>
            p.isVariableDeclaration()
          );
          componentDeclarationPath.insertBefore(customSetValMethod);
        }
      }
    }
  };
}

module.exports = logStateChangesPlugin;
