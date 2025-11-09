// // MITask-Q:
// // hasProperty({name: "BMW", model: "M3"}, "model") return true; hasProperty({name: "BMW", model: "M3"}, "year") return false
// function hasProperty(obj: object, prop: string): boolean {
//   return prop in obj;
// }

// console.log(hasProperty({ name: "BMW", model: "M3" }, "model")); // true
// console.log(hasProperty({ name: "BMW", model: "M3" }, "year"));

// MITask-R:
// calculate("1+3") return 4;

function calculate(str: string): number {
  const numbers: string[] = str.split("+");
  const result = numbers.reduce((acc, ele) => {
    return (acc += Number(ele));
  }, 0);
  return result;
}

console.log(calculate("1+ 33"));
console.log(calculate("11 +23"));
console.log(calculate("14+53"));
console.log(calculate("18+31"));
