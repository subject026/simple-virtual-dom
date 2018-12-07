const renderElem = ({ tagName, attrs, children }) => {
  // Create element
  const $el = document.createElement(tagName);
  // Set attributes
  for (const [key, value] of Object.entries(attrs)) {
    $el.setAttribute(key, value);
  }
  // Set children
  for (const child of children) {
    const childEl = render(child);
    $el.appendChild(childEl);
  }
  return $el;
};

const render = vNode => {
  // If it's just a string coming in then we create a text node
  if (typeof vNode === "string") return document.createTextNode(vNode);
  return renderElem(vNode);
};

export default render;
