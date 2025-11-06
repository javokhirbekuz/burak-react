// MITask-Q:
// hasProperty({name: "BMW", model: "M3"}, "model") return true; hasProperty({name: "BMW", model: "M3"}, "year") return false
function hasProperty(obj: object, prop: string): boolean {
  return prop in obj;
}

console.log(hasProperty({ name: "BMW", model: "M3" }, "model")); // true
console.log(hasProperty({ name: "BMW", model: "M3" }, "year"));
