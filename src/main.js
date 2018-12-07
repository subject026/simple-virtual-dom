import createElement from "./vdom/createElement";
import render from "./vdom/render";
import mount from "./vdom/mount";
import diff from "./vdom/diff";

/* Virtual DOM tree is just an object literal

createVApp() - takes the count in and creates our virtual DOM tree
render()     - creates a tree of actual DOM elements based on the object passed in 
mount()      - replaces target DOM element with the root element of the rendered tree

*/

const createVApp = count => {
  return createElement("div", {
    attrs: {
      id: "app",
      dataCount: count
    },
    children: [
      String(count),
      createElement("input", {
        attrs: {
          id: "important-input",
          type: "text"
        }
      }),
      createElement("img", {
        attrs: {
          src: "https://media.giphy.com/media/MWtVSXiqOYuqdfvqb0/giphy.gif"
        },
        children: []
      })
    ]
  });
};

let count = 0;
let vApp = createVApp(count);
const $app = render(vApp);

// This mounts our tree of DOM els
// rootEl will refer to that same tree
let $rootEl = mount($app, document.getElementById("app"));

setInterval(() => {
  count++;
  // Once data/prop has been changed we create a new virtual dom tree
  const vNewApp = createVApp(count);
  // Diff function checks what needs to be updated and returns a patch function which carries our necessary DOM updates
  const patch = diff(vApp, vNewApp);
  patch($rootEl);
  // Store updated vNewApp as vApp ready for next interval
  vApp = vNewApp;
}, 1000);
