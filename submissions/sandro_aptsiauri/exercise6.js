const numbers = [5, 7, 10, 11, 3];

function sum(numbers) {
  let total = 0;
  for (let num of numbers) {
    total += num;
  }
  return total;
}

function biggestOf(numbers) {
  let max = numbers[0];
  for (let num of numbers) {
    if (num > max) {
      max = num;
    }
  }
  return max;
}

function average(numbers) {
  return sum(numbers) / numbers.length;
}

console.log("Sum:", sum(numbers));
console.log("Biggest:", biggestOf(numbers));
console.log("Average:", average(numbers));
console.log("Sum of [1, 2, 3]:", sum([1, 2, 3]));