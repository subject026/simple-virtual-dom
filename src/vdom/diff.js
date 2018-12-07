import render from "./render";

const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];
  // Set new attributes first
  for (const [key, value] of Object.entries(newAttrs)) {
    patches.push($node => {
      $node.setAttribute(key, value);
      return $node;
    });
  }
  // Then we remove the old ones
  for (const key in oldAttrs) {
    // if the key in the old attributes isn't in the new attributes
    if (!(key in newAttrs)) {
      patches.push($node => {
        $node.removeAttribute(key);
        return $node;
      });
    }
  }
  // return function that applies all the patches
  return $node => {
    for (const patch of patches) {
      patch($node);
    }
  };
};

const diffChildren = (oldVChildren, newVChildren) => {
  const childPatches = [];
  // first go through old children, if a child isn't in vNewChildren it will be removed by diff
  for (const [oldVChild, newVChild] of zip(oldVChildren, newVChildren)) {
    childPatches.push(diff(oldVChild, newVChild));
  }

  // Additional patches are for the children not included in the zipped array
  const additionalPatches = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push($node => {
      $node.appendChild(render(additionalVChild));
      return $node;
    });
  }

  return $parent => {
    for (const [patch, child] of zip(childPatches, $parent.childNodes)) {
      patch(child);
    }
    for (const patch of additionalPatches) {
      patch($parent);
    }
    return $parent;
  };
};

const diff = (vNewNode, vOldNode) => {
  // First if vNewNode is undefined we'll just remove it
  if (vNewNode === undefined) {
    return $node => {
      $node.remove();
      return undefined;
    };
  }

  // If either node is a string
  if (typeof vOldNode === "string" || typeof vOldNode === "string") {
    // Replace old with new if they're not the same
    if (vOldNode !== vNewNode) {
      return $node => {
        const $newNode = render(vNewNode);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      return $node => undefined;
    }
  }

  /* To calculate the minimal differences between 2 trees takes (((blugh N Q...))) With some assumption in mind we can make the calculation to be (((all of N))) which is much more efficent??
  Assumption is that if element tags have different tag names they we don't apply patch we just replace. According to React, most of the time this is good for practical uses. */

  // So, if the tag names are difference the function will replace the whole element node:
  if (vOldNode.tagname !== vNewNode.tagname) {
    return $node => {
      const $newNode = render(vNewNode);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  // If tag names are the same we have to compare attributes and children:
  const patchAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs);
  const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

  // Once we have patches based on these comparisons we return a function that applies them to whatever node is passed in:
  return $node => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};

export default diff;
