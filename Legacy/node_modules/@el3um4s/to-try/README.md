# To Try

Wrapper for error handling without try-catch

Based on:

- [Functional Try-catch In JavaScript](https://medium.com/weekly-webtips/functional-try-catch-in-javascript-8b9923c3e395)
- [How to avoid try/catch statements nesting/chaining in JavaScript?](https://javascript.plainenglish.io/how-to-avoid-try-catch-statements-nesting-chaining-in-javascript-a79028b325c5)
- [Let’s Clean Up: Ugly Try-Catches in JavaScript!](https://javascript.plainenglish.io/lets-clean-up-ugly-try-catches-e4e1a53de500)
- [scopsy/await-to-js](https://github.com/scopsy/await-to-js)
- [Coly010/no-try](https://github.com/Coly010/no-try)

### Install and use the package
To use the package in a project:

```bash
npm i @el3um4s/to-try
```

and then in a file:

```ts
import { toTry, toTryAsync } from "@el3um4s/to-try";

// Without a custom error handler
const [result, error] = toTry(() => myThrowableMethod());

// With a custom error handler
const [res, err] = toTry(
  () => myThrowableMethod(),
  error => {
    console.log(error);
  }
);

// Handle methods that return a Promise without a custom error handler
const [res2, err2] = await toTryAsync(() => myAsyncThrowableMethod());

// Handle methods that return a Promise with a custom error handler
const [res3, err3] = await toTryAsync(
  () => myAsyncThrowableMethod(),
  error => {
    console.log(error);
  }
);

// Use result
if (error || err || err2 || err3) {
  // Show error alert
}

sendMyResultToMethod(result);
```