# GitHub Issues Tracker Assignment

This repository contains a simple front-end application that interacts with the provided API to display, search, and filter GitHub-like issues. The app includes:

- Login page with demo credentials
- Main page with navbar, search, tabs (All/Open/Closed)
- Responsive, 4-column grid of issue cards
- Cards showing title, description, status border, author, priority, labels, created date
- Modal displaying detailed issue information, including assignee and priority
- Search, tabs, loading spinner, and active state styling

## Running the project

Serve the folder via a static server (e.g. VS Code Live Server, `python -m http.server`, etc.) and open `index.html` in your browser. Ensure you load pages over HTTP, not `file://`, so the `fetch` API works.

## JavaScript questions

1. **What is the difference between `var`, `let`, and `const`?**
   - `var` declarations are function-scoped or globally scoped if outside a function. They are hoisted to the top of their scope and can be re-declared or updated. This sometimes leads to unexpected behavior when variables shadow each other.
   - `let` is block-scoped (anything inside `{}`) and is not hoisted in the same way; it lives in the "temporal dead zone" until the execution reaches its declaration. You can update a `let` variable but cannot re-declare it in the same scope.
   - `const` is also block-scoped and cannot be reassigned after being initialized. It does not make the value immutable, only the binding; objects and arrays declared with `const` can still have their contents modified.

2. **What is the spread operator (`...`)?**
   - The spread operator expands iterables (arrays, strings, etc.) or object properties into individual elements. In array literals it can combine arrays or clone them (`[...a, ...b]`), and in function calls it lets you pass array elements as separate arguments (`fn(...args)`). For objects, it copies enumerable properties into a new object (`{...obj}`). It's a concise way to shallow copy or merge data.

3. **What is the difference between `map()`, `filter()`, and `forEach()`?**
   - `forEach()` executes a provided function once for each array element; it does not return a new array and is typically used for performing side effects.
   - `map()` also iterates through each element but returns a new array containing the results of calling the provided function on every element. Use it when you want to transform data.
   - `filter()` returns a new array containing only those elements for which the provided callback returns a truthy value. It's used to select a subset based on a condition.

4. **What is an arrow function?**
   - An arrow function is a concise syntax for writing functions using the `=>` notation, e.g. `const add = (a, b) => a + b;`. Unlike traditional functions, arrow functions inherit the `this` value from their surrounding lexical scope and cannot be used as constructors or have their own `arguments` object. They are useful for short inline callbacks and when you want to avoid manually binding `this`.

5. **What are template literals?**
   - Template literals are string literals enclosed by backticks (`` ` ``) that allow embedded expressions via `${expression}`. They support multi-line strings without escape characters and make it easier to build dynamic strings. Example: `` `Hello, ${name}!` ``.

---

This README answers the required JS theory questions and provides basic usage instructions for the assignment project.