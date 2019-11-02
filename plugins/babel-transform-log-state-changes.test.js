import { transformSync } from "@babel/core";
import logStateChangesPlugin from "./babel-transform-log-state-changes";

const HelloWorld = `
const HelloWorld = () => {
  const [val, setVal] = useState(true);
  const [anotherVal, setAnotherVal] = useState(100);
  return <span>Hello World</span>;
};
`;

test("inject state change wrapper", () => {
  const { code } = transformSync(HelloWorld, {
    ast: true,
    plugins: ["@babel/plugin-transform-react-jsx", logStateChangesPlugin]
  });

  expect(code).toMatchSnapshot();
});
