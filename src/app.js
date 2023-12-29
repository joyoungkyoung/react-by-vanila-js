import { useEffect, useState } from "./core/library.js";
import { h } from "./core/dom.js";
import Test from "./pages/test/index.js";
import "./types/dom.js";

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

  return h(
    "div",
    { className: "app-container", onclick: () => alert("123123123123") },
    [
      `test1 -> ${counter}`,
      h("div", { onclick: handleClickTest1 }, ["test2"]),
      h("button", { onclick: handleClickTest2 }, "클릭"),
      Test({ a: "1123" }),
    ]
  );
}
