import { useEffect, useMemo, useState } from "./core/library.js";
import { h } from "./core/dom.js";
import Test from "./pages/test/index.js";
import createComponent from "./utils/component.js";

export default function App() {
  const [counter, setCounter] = useState(0);

  const handleClickTest1 = (e) => {
    e.stopPropagation();
    console.log("222");
  };

  const handleClickTest2 = (e) => {
    e.stopPropagation();
    setCounter(counter + 2);
  };

  useEffect(() => {
    console.log("counter: ", counter);
  }, [counter]);

  return h("div", { className: "app-container" }, [
    `test1 -> ${counter}, ${a}`,
    h("div", { onClick: handleClickTest1 }, ["test2"]),
    h("button", { onClick: handleClickTest2 }, "클릭"),
    createComponent(Test, { a: "asd" }),
  ]);
}
