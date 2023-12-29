import { h } from "../../core/dom.js";
import { useState } from "../../core/library.js";

/**
 * @typedef TestProps
 * @property {string} a
 */

/**
 * @param {TestProps} props 
 * @returns 
 */
export default function Test({a}) {
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
      `테스트 컴포넌트임 ${counter} ${a}`
    );
  };

  return render();
}
