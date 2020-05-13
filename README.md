TypeScript.NET-Core
==============

### A JavaScript-Friendly .NET Based TypeScript Library

This library now lives as individual modules here: https://github.com/tsdotnet 
With each module published to NPM as CommonJS and ECMA Script Modules.

Originally: https://github.com/electricessence/TypeScript.NET

<span>Or support by taking this course: https://www.udemy.com/stepping-up-to-typescript-fundamentals/</span>

The intention of this project to to allow for the evolution of a .NET based TypeScript (and resultant JavaScript) library.
Contributions are welcomed as the .NET Library (meaning it's class structure and classes, not necessarily its content) has a substantial amount of usefulness.  With the open sourcing of .NET, TypeScript seems the most logical means to take advantage of it.  Typing, generics, classes, modules, inheritance, all are required to make a resultant JavaScript library that takes advantage of this elegance.

Much inspiration comes from TypeScript itself and from libraries like linq.js.
There is of course some variance away from .NET's convention (camelCase methods in favor of TitleCase) and some things simply have to be done different.  "Extensions" as a feature might be one of the greatest additions to .NET that JavaScript does not have a plan for, but it does have some tricky equivalents.

If you have a .NET Library class that you want to see represented in TypeScript, submit it (as an issue), or contribute it yourself! :)

## Why should I use this, let alone TypeScript?
1. **It's 100% compatible with JavaScript.**  Currently TypeScript .NET's target is ES5, so legacy ES3 won't work. Mainly because of accessors.  But going forward, TypeScript is nearly the same as ES6 and you don't have to change your source code to target newer versions. :)
2. TypeScript is lead by Anders Hejlsberg, the founder of C#.  You will feel quite at home in TypeScript if you are a fan of typed languages (like C#), but at the same time you'll get all the flexibility and compatibility of JavaScript.  See [www.typescriptlang.org](http://www.typescriptlang.org/) for more information about the TypeScript language.  Also some more good info on [Wikipedia](http://en.wikipedia.org/wiki/TypeScript).
3. The benefits of intellisense and using an IDE for programming should be obvious especially if you are coding for a larger project.  Typed compilation is less forgiving in a good way.  You simply make much less mistakes in the long run.  TypeScript might be the best answer to JavaScript yet.  It's still JavaScript, but with many bonuses including a growing community. :)
4. Most major IDEs and text editors now support TypeScript either built in, or via a plug-in:
  * Visual Studio
  * VS Code
  * WebStorm (Strongly recommended! Makes NodeJS development a dream.) 
  * Sublime Text
  * Atom

To name a few.


## Release Notes:
* 1.0.0: New 'Core' version forked from https://github.com/electricessence/TypeScript.NET
