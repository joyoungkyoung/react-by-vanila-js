import { h } from "../../core/dom.js";
import { useState } from "../../core/library.js";

export default function Test(props) {
  const [counter, setCounter] = useState(123);

  const render = () => {
    return h(
      "div",
      {
        className: "app-container",
        onClick: (e) => {
          e.stopPropagation();
          setCounter(counter + 1);
        },
      },
      `테스트 컴포넌트임 ${counter} ${props.a}`
    );
  };

  return render();
}
