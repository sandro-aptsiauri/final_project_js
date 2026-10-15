function printDouble(n) {
    console.log(n * 2);
}

function doubleOf(n) {
    return n * 2;
}

printDouble(5);

console.log(doubleOf(5));

const result = doubleOf(8);
console.log(result);

console.log(doubleOf(5) + doubleOf(10));

// კითხვაზე პასუხი:
// printDouble(5) + printDouble(10)-ით 30-ს ვერ მივიღებთ, რადგან printDouble ფუნქცია
// არ იყენებს return-ს (აბრუნებს undefined-ს). undefined + undefined კი არ არის რიცხვი (NaN).