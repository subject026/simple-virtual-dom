// Default values mean we won't get errors if we don't pass attributes or children (or any options arg at all)
export default (tagName, { attrs = {}, children = [] } = {}) => {
  return {
    tagName,
    attrs: attrs,
    children: children
  };
};
