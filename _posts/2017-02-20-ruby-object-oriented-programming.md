---
title: Ruby object oriented programming
date: 2017-02-20 12:00
categories: [ruby, object-oriented-programming, oop]
---

    DESCRIPTION: Everything in Ruby is an object. Programming should be in an object-oriented way.

## Programming Object Oriented Design Rules

1. A class should have no more than 100 lines.
2. Classes should do one thing.
3. Methods should be no more than 5 lines.
4. Pass no more than 5 params in an argument.
5. Controller can only instantiate one object.
6. Views can know about only 1 instance variable.

`attr_reader` determines which variables are allowed to be passed into the class.

Start the class with the first method

```rb
class Test
  def initialize
  end
end
```
