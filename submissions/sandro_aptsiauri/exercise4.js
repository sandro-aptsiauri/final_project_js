function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function fullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

console.log(add(3, 4));
console.log(multiply(3, 4));
console.log(fullName("Nino", "Beridze"));
console.log(celsiusToFahrenheit(0));
console.log(celsiusToFahrenheit(100));
console.log(add(add(1, 2), 3));