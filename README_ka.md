> 🇬🇧 [English version](./README.md)

# საშინაო დავალება 6 — ფუნქციები, საფუძვლები

მოგესალმებით მეექვსე საშინაო დავალებაზე! 🎉

ეს დავალება **განზრახ მოკლეა**. ის მხოლოდ იმ ოთხ რამეზეა, რისგანაც ყოველი ფუნქცია შედგება:

* ფუნქციის **გამოცხადება** (declaration) და მისი **გამოძახება** (call)
* **პარამეტრები** — მნიშვნელობები, რომლებსაც ფუნქციას გადასცემთ
* **`return`** — მნიშვნელობა, რომელსაც ფუნქციისგან *უკან* იღებთ
* დაბრუნებული მნიშვნელობის **გამოყენება**: მისი დაბეჭდვა, ცვლადში შენახვა, მასზე არითმეტიკის ჩატარება, სხვა ფუნქციისთვის გადაცემა

სულ **ექვსი პატარა სავარჯიშოა**. სხვა არაფერია ახალი: ფუნქციების გარშემო ყველაფერი ის არის, რაც უკვე იცით — ცვლადები, ოპერატორები, `if` / `else`, ციკლები, მასივები და შაბლონური სტრიქონები.

მე-5 საშინაო დავალება ბევრს ითხოვდა ერთდროულად: ისრიან ფუნქციებს, callback-ებს, `map` / `filter` / `reduce`-ს, რეკურსიას. ეს დავალება იმ საძირკველს უბრუნდება, რომელზეც ეს ყველაფერი დგას. თუ ამ დავალების შემდეგ `return` გესმით, ესე იგი ფუნქციები გესმით. სწორედ ეს არის მთელი მიზანი.

**ვადა:** მე-8 workshop-მდე.

---

## 📄 ამ დავალების ორი გვერდი

| | |
|---|---|
| **[📚 სავარჯიშოები](./EXERCISES_ka.md)** | ექვსი სავარჯიშო, მათი მოსალოდნელი შედეგი და წესები |
| **[📤 როგორ ჩააბაროთ](./SUBMITTING_ka.md)** | fork, ბრენჩი, Pull Request — ნაბიჯ-ნაბიჯ, ჩეკლისტთან ერთად |

ჯერ წაიკითხეთ ქვემოთ მოცემული მოკლე სექცია, შემდეგ კი სავარჯიშოებზე გადადით.

---

## სანამ დაიწყებთ — ფუნქციის ორი სახე

ამ დავალებაში ყოველი ფუნქცია არის **ფუნქციის დეკლარაცია** (function declaration):

```javascript
function name(parameter) {
    // კოდის ბლოკი: ის, რასაც ფუნქცია აკეთებს
}
```

ამ დავალებაში ფუნქციის მხოლოდ ორი სახეა და მთელი უნარი იმაშია, რომ იცოდეთ, რომელს წერთ:

**ფუნქცია, რომელიც ბეჭდავს.** ის რაღაცას ეკრანზე აჩვენებს და უკან არაფერს აბრუნებს.

```javascript
function printDouble(n) {
    console.log(n * 2);
}

printDouble(5);   // ეკრანზე აჩვენებს 10-ს
```

**ფუნქცია, რომელიც აბრუნებს.** ის **მნიშვნელობას** უკან აძლევს იმ ადგილს, საიდანაც გამოიძახეს, ასე რომ თქვენს პროგრამას მასზე მუშაობის გაგრძელება შეუძლია.

```javascript
function doubleOf(n) {
    return n * 2;
}

console.log(doubleOf(5));      // 10
const x = doubleOf(5) + 1;     // x არის 11 — ამას printDouble-ით ვერ გააკეთებთ
```

> `console.log` ესაუბრება **თქვენ**. `return` ესაუბრება **თქვენს პროგრამას**.

ახლა გახსენით **[სავარჯიშოები](./EXERCISES_ka.md)**.

---

## სასარგებლო ბმულები

* ფუნქციები: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
* `function` დეკლარაციები: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function
* `return`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return
* შაბლონური სტრიქონები (template literals): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
* `String.prototype.repeat()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
* `for...of`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
