function foo() {
  getName = function () { console.log(1); };
  return this;
}
foo.getName = function () { console.log(2); };
foo.prototype.getName = function () { console.log(3); };
var getName = function () { console.log(4); };
function getName() { console.log(5); }

foo.getName();                // ?
getName();                    // ?
foo().getName();              // ?
getName();                    // ?
new foo.getName();            // ?
new foo().getName();          // ?
new new foo().getName();      // ?