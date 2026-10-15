> 🇬🇪 [ქართული ვერსია](./EXERCISES_ka.md) · [← Back to the overview](./README.md) · [📤 How to submit](./SUBMITTING.md)

# Homework 6 — Exercises

Create the files below inside `submissions/<your-username>/` and write JavaScript code to solve each task.

Use only what the [Rules](#rules) at the bottom allow. You can run each file with:

```bash
node exercise_1.js
```

Every exercise shows its **expected output**. Your program should print exactly that.

When you print a value with a label, pass the label and the value as **two arguments**: `console.log("Sum:", total);` Use the labels shown in each expected output.

---

## `exercise_1.js` — Declare a function, call a function

Write two functions that take **no parameters** and only print:

1. `sayHello()` — prints `Hello!`
2. `printLine()` — prints twenty `-` characters

Then, below the functions, call them in this order: `sayHello`, `sayHello`, `printLine`, `sayHello`.

Expected output:

```text
Hello!
Hello!
--------------------
Hello!
```

Notice two things. The function body does **not** run when you write it — only when you **call** it. And one function you wrote once can be called as many times as you like.

> Hint: `"-".repeat(20)` gives you twenty dashes, so you do not have to type them.

---

## `exercise_2.js` — Parameters

A parameter is a value you hand to the function when you call it. Inside the function it behaves like a normal variable.

Write three functions that print:

1. `greet(name)` — prints `Hello, <name>!`
2. `printAge(name, age)` — prints `<name> is <age> years old`
3. `printSquare(n)` — prints `n` multiplied by itself

Then call them, in this order:

```javascript
greet("Nino")
greet("Giorgi")
printAge("Mariam", 22)
printSquare(6)
printSquare(9)
```

Expected output:

```text
Hello, Nino!
Hello, Giorgi!
Mariam is 22 years old
36
81
```

The same `greet` function produced two different lines, because you gave it two different values. That is the whole point of a parameter.

> Hint: use a template literal — `` console.log(`Hello, ${name}!`); ``

---

## `exercise_3.js` — `return` is not `console.log`

This is the most important exercise of the homework. Take your time with it.

Copy these two functions into your file:

```javascript
function printDouble(n) {
    console.log(n * 2);
}

function doubleOf(n) {
    return n * 2;
}
```

They look almost the same, but only one of them gives a **value back** to the place where it was called.

Now write these four lines, in this order:

1. Call `printDouble(5)` on its own.
2. Print the result of `doubleOf(5)`.
3. Store `doubleOf(8)` in a `const` called `result`, then print `result`.
4. Print `doubleOf(5) + doubleOf(10)`.

Expected output:

```text
10
10
16
30
```

Then answer this question in a comment at the bottom of the file:

**Why can you not write `printDouble(5) + printDouble(10)` and get `30`?**

> Hint: `return` puts a real value in the exact spot where you wrote the call — after it runs, JavaScript sees `doubleOf(5) + doubleOf(10)` as `10 + 20`. A function without `return` gives back `undefined`, and `undefined + undefined` is not a number.

---

## `exercise_4.js` — Small functions that return

Write four functions. Each one **returns** its answer, and none of them uses `console.log` inside:

1. `add(a, b)` — returns the sum of the two numbers.
2. `multiply(a, b)` — returns the two numbers multiplied.
3. `fullName(firstName, lastName)` — returns the two names with a space between them.
4. `celsiusToFahrenheit(celsius)` — returns `celsius * 9 / 5 + 32`.

Then print, in this order:

```javascript
add(3, 4)
multiply(3, 4)
fullName("Nino", "Beridze")
celsiusToFahrenheit(0)
celsiusToFahrenheit(100)
add(add(1, 2), 3)
```

Expected output:

```text
7
12
Nino Beridze
32
212
6
```

Look closely at the last line. `add(1, 2)` runs first, `return` turns it into `3`, and *that* is what the outer `add` receives as its first parameter. **A call that returns a value can be used anywhere a value can be used.**

---

## `exercise_5.js` — `return` inside an `if`

Write three functions:

1. `isEven(n)` — returns `true` or `false`. Return the comparison itself; you do not need `if`.
2. `biggest(a, b)` — returns the bigger of the two numbers, using `if` / `else`.
3. `passOrFail(score)` — returns the string `"Passed"` when the score is `70` or more, and `"Failed"` otherwise.

Print the results with these labels:

```text
isEven(4): true
isEven(7): false
biggest(10, 3): 10
biggest(2, 8): 8
passOrFail(85): Passed
passOrFail(41): Failed
```

> Hint: `n % 2 === 0` is already `true` or `false` — you can `return` it directly instead of writing `if (…) { return true; } else { return false; }`.
>
> In `biggest` and `passOrFail` every branch of the `if` needs its own `return`. As soon as one of them runs, the function stops right there.

---

## `exercise_6.js` — A function with a loop inside

Start with this array:

```javascript
const numbers = [5, 7, 10, 11, 3];
```

Write three functions. Each one takes the **whole array** as a parameter and returns a single number:

1. `sum(numbers)` — returns the total of every number in the array.
2. `biggestOf(numbers)` — returns the largest number, without using `Math.max`.
3. `average(numbers)` — returns the average. **Call your own `sum` function inside it** instead of writing the loop a second time.

Print:

```text
Sum: 36
Biggest: 11
Average: 7.2
Sum of [1, 2, 3]: 6
```

> Hint: the pattern is always the same — make a variable **before** the loop, change it **inside** the loop, and `return` it **after** the loop. If you put the `return` inside the loop, the function stops on the very first element.
>
> For `biggestOf`, start with `numbers[0]` as the biggest so far, exactly like we did in the array workshop.
>
> The last line shows why a parameter is better than reaching for the outside `numbers` variable: the same function works on any array you give it.

---

## Rules

You may use:

* Operators (`+ - * / % ** += ++ === < >= && || !`), `.length`, array indexes, `Math` methods
* `const` and `let`
* Template literals and string methods, including `.repeat()`
* `if` / `else if` / `else`
* `for`, `while` and `for...of` loops
* Arrays
* **Functions written as declarations**, parameters, and `return`

Not allowed **in this homework**:

* **Arrow functions** (`const f = (x) => x + 1`) and function expressions (`const f = function (x) { … }`). Every function here is written as `function name(parameters) { … }`
* `map`, `filter`, `find`, `some`, `every`, `reduce`, `forEach` and any other method that takes a function as an argument — write the loop yourself
* Default parameter values (`function greet(name = "stranger")`)
* `prompt()` — it does not exist in Node.js, so the file would crash

You met arrow functions, callbacks and `map` / `filter` / `reduce` in Homework 5, so some of this list is not new to you. That is fine — this homework deliberately puts those tools away. All of them are built on top of the plain function declaration and `return`, and the point here is to make that foundation completely solid.

---

When your six files are ready, go to **[How to submit](./SUBMITTING.md)**.
