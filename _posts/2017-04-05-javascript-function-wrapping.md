---
title: Javascript function wrapping
date: 2017-04-05
categories: javascript, functions
---
    DESCRIPTION: Making functions globally available becomes extremely confusing as your project builds in scale. Wrapping functions is a tidy solution to control accessibility to your functions. This blog will tackle this topic.

[Prior Reading](https://blog.sentry.io/2016/02/03/wrap-javascript-functions.html)

## Introduction

If you only just started writing JavaScript you will realise that initially it appears relatively easy to write and access your functions when they are globally available:

```js
function testingFunction() {
  console.log("This is a test")
}
```

As your project scales however and you get more and more functions, you will realise that it can get extremely confusing having to uniquely name each of your functions, and where they are located.

## Binding `this`

When calling a function you can pass an argument to be called within the function. The `call()` method can be used to call a function with a given `this` value and arguments provided individually.

```js
function testingMessage(message) {
  console.log(`${this} ${message}`)
}

testingMessage.call("hello", "Sam") // => "hello Sam"
```

[call() documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

We can also bind the value of `this` rather than individually setting the value of this in `call()`, by running this:

```js
function testingMessage(message) {
  console.log(`${this} ${message}`)
}

let bindingTestingMessage = testingMessage.bind('Action', 'Sam');

bindingTestingMessage(); // => 'Action Sam'
```

Even if you try calling `bindingTestingMessage.call("Test")` it will not change the value of `this`, and would therefore return `"Action Sam"` rather than `"Test Sam"`.

## Closure

Closures can be used to permanently change the value of `this` without using `bind`.

``` javascript
let name = "Sam"
let bindingMyName = function() {
  myName.call(name)
}

bindingMyName() // => "Sam"
bindingMyName.call("Bill") // => "Sam" - cannot override `this`
```
