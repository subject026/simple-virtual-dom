[talk link](https://www.reddit.com/r/reactjs/comments/a3t8mt/building_a_simple_virtual_dom_from_scratch/)
[blog post](https://dev.to/ycmjason/building-a-simple-virtual-dom-from-scratch-3d05)

Check out [Imba](http://imba.io/) for some [memorized DOM](https://medium.freecodecamp.org/the-virtual-dom-is-slow-meet-the-memoized-dom-bb19f546cc52) madness.

# 4 types of node in actual DOM

## Document Node

Represents the entire page and corresponds to the document object.

## Element Node

HTML elements describe the structure of a HTML page. You can access text and attribute nodes after finding an element node.

## Text Node

Once you have an element node you can access it's text node if it has one. Text nodes cannot have children.

## Attribute Node

Opening tags of HTML elements can carry attributes. These are not children, they are part of that element.

// Virtual dom is just a plain object
