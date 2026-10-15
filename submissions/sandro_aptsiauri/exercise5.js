function isEven(n) {
  return n % 2 === 0;
}

function biggest(a, b) {
  if (a > b) {
    return a;
  } else {
    return b;
  }
}

function passOrFail(score) {
  if (score >= 70) {
    return "Passed";
  } else {
    return "Failed";
  }
}

console.log("isEven(4):", isEven(4));
console.log("isEven(7):", isEven(7));
console.log("biggest(10, 3):", biggest(10, 3));
console.log("biggest(2, 8):", biggest(2, 8));
console.log("passOrFail(85):", passOrFail(85));
console.log("passOrFail(41):", passOrFail(41));