import { transformSync } from "@babel/core";
import logRenderPlugin from "./babel-transform-log-render";

const HelloWorld = `
const HelloWorld = () => {
  const [val, setVal] = useState(true);
  const [anotherVal, setAnotherVal] = useState(100);
  return <span>Hello World</span>;
};
`;

test("inject console.log", () => {
  const { code } = transformSync(HelloWorld, {
    ast: true,
    plugins: ["@babel/plugin-transform-react-jsx", logRenderPlugin]
  });

  expect(code).toMatchSnapshot();
});
