/**
 * @param {keyof HTMLElementTagNameMap} nodeName
 * @param {HTMLElement} attributes
 * @param  {string | number | any[]} args
 * @returns {VDom}
 */
export const h = (nodeName, attributes, ...args) => {
  const children = args.length ? [].concat(...args) : null;
  return { nodeName, attributes, children };
};

/**
 * virtual DOM -> real DOM
 * @param {VDom | string | number} vDom
 * @returns
 */
export const createElements = (vDom) => {
  if (typeof vDom === "string" || typeof vDom === "number") {
    return document.createTextNode(vDom);
  }

  /** @type {HTMLElement} */
  const element = document.createElement(vDom.nodeName);

  // element에 attr 등록
  const attributes = vDom.attributes || {};
  Object.keys(attributes).forEach((k) => {
    if (k.startsWith("on") && typeof attributes[k] === "function") {
      element.addEventListener(k.substring(2).toLowerCase(), attributes[k]);
    } else {
      element.setAttribute(k, attributes[k]);
    }
  });

  // children이 존재할 경우 재귀 형태로 렌더링
  (vDom.children || []).forEach((child) => {
    element.appendChild(createElements(child));
  });

  return element;
};
