> 🇬🇪 [ქართული ვერსია](./README_ka.md)

# Homework 6 — Functions, the basics

Welcome to your sixth homework! 🎉

This homework is **short on purpose**. It is only about the four things every function is made of:

* **declaring** a function and **calling** it
* **parameters** — the values you give a function
* **`return`** — the value you get *back* from a function
* **using** what a function returned: printing it, storing it in a variable, doing maths with it, passing it into another function

There are **six small exercises**. Nothing else is new: everything around the functions is what you already know — variables, operators, `if` / `else`, loops, arrays and template literals.

Homework 5 asked for a lot at once: arrow functions, callbacks, `map` / `filter` / `reduce`, recursion. This one goes back to the foundation those things are built on. If you understand `return` after this homework, you understand functions. That is the whole goal.

**Deadline:** before Workshop 8.

---

## 📄 The two pages of this homework

| | |
|---|---|
| **[📚 Exercises](./EXERCISES.md)** | The six exercises, their expected output, and the rules |
| **[📤 How to submit](./SUBMITTING.md)** | Fork, branch, Pull Request — step by step, plus the checklist |

Read the short section below first, then go to the exercises.

---

## Before you start — the two shapes of a function

Every function in this homework is a **function declaration**:

```javascript
function name(parameter) {
    // the code block: what the function does
}
```

There are only two kinds of function in this homework, and knowing which one you are writing is the whole skill:

**A function that prints.** It shows something on the screen and gives nothing back.

```javascript
function printDouble(n) {
    console.log(n * 2);
}

printDouble(5);   // shows 10 on the screen
```

**A function that returns.** It hands a **value** back to the place where it was called, so your program can keep working with it.

```javascript
function doubleOf(n) {
    return n * 2;
}

console.log(doubleOf(5));      // 10
const x = doubleOf(5) + 1;     // x is 11 — you cannot do this with printDouble
```

> `console.log` talks to **you**. `return` talks to **your program**.

Now open the **[exercises](./EXERCISES.md)**.

---

## Helpful links

* Functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
* `function` declarations: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function
* `return`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return
* Template literals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
* `String.prototype.repeat()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
* `for...of`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
