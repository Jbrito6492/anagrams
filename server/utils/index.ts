export {};

function sortString(string: string) {
  return string.toLowerCase().split("").sort().join("");
}

console.log(sortString("string"));

function memoizedAnagram() {
  let cache = {};
  return (string: string) => {
    if (string in cache) {
      return cache[string];
    } else {
      // do computation to verify words
    }
  };
}
