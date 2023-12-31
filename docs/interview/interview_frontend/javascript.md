## JavaScript有哪些数据类型，它们的区别？

JavaScript共有八种数据类型，分别是 Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt。

其中 Symbol 和 BigInt 是ES6 中新增的数据类型：

1. ●Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。
2. ●BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

这些数据可以分为原始数据类型和引用数据类型：

1. ●栈：原始数据类型（Undefined、Null、Boolean、Number、String）
2. ●堆：引用数据类型（对象、数组和函数）

两种类型的区别在于存储位置的不同：

1. ●原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
2. ●引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

堆和栈的概念存在于数据结构和操作系统内存中，在数据结构中：

1. ●在数据结构中，栈中数据的存取方式为先进后出。
2. ●堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。

在操作系统中，内存被分为栈区和堆区：

1. ●栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
2. ●堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可能由垃圾回收机制回收。

## 数据类型检测的方式有哪些

1. typeof

   ```javascript
   console.log(typeof 2);               // number
   console.log(typeof true);            // boolean
   console.log(typeof 'str');           // string
   console.log(typeof []);              // object    
   console.log(typeof function(){});    // function
   console.log(typeof {});              // object
   console.log(typeof undefined);       // undefined
   console.log(typeof null);            // object
   ```

   其中数组、对象、null都会被判断为object，其他判断都正确。

2. instanceof
   instanceof可以正确判断对象的类型，其内部运行机制是判断**在其原型链中能否找到该类型的原型**。

   ```js
   console.log(2 instanceof Number);                    // false
   console.log(true instanceof Boolean);                // false 
   console.log('str' instanceof String);                // false 
    
   console.log([] instanceof Array);                    // true
   console.log(function(){} instanceof Function);       // true
   console.log({} instanceof Object);                   // true
   ```

   可以看到，instanceof只能正确判断**引用数据类型**，而不能判断基本数据类型。instanceof 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

3. constructor

   ```js
   console.log((2).constructor === Number); // true
   console.log((true).constructor === Boolean); // true
   console.log(('str').constructor === String); // true
   console.log(([]).constructor === Array); // true
   console.log((function() {}).constructor === Function); // true
   console.log(({}).constructor === Object); // true
   ```

   `constructor`有两个作用，一是判断数据的类型，二是对象实例通过 `constrcutor` 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，constructor就不能用来判断数据类型了：

   ```js
   function Fn(){};
    
   Fn.prototype = new Array();
    
   var f = new Fn();
    
   console.log(f.constructor===Fn);    // false
   console.log(f.constructor===Array); // true
   ```

4. Object.prototype.toString.call()

   `Object.prototype.toString.call()` 使用 Object 对象的原型方法 toString 来判断数据类型：

   ```js
   var a = Object.prototype.toString;
    
   console.log(a.call(2));
   console.log(a.call(true));
   console.log(a.call('str'));
   console.log(a.call([]));
   console.log(a.call(function(){}));
   console.log(a.call({}));
   console.log(a.call(undefined));
   console.log(a.call(null));
   ```

   同样是检测对象obj调用toString方法，obj.toString()的结果和Object.prototype.toString.call(obj)的结果不一样，这是为什么？

   这是因为toString是Object的原型方法，而Array、function等类型作为Object的实例，都重写了toString方法。不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串…），而不会去调用Object上原型toString方法（返回对象的具体类型），所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用Object原型上的toString方法。

## 判断数组的方式有哪些

1. ●通过Object.prototype.toString.call()做判断
2. ●通过原型链做判断
3. ●通过ES6的Array.isArray()做判断
4. ●通过instanceof做判断
5. ●通过Array.prototype.isPrototypeOf

## null和undefined区别

首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。

undefined 代表的含义是未定义，null 代表的含义是空对象。一般变量声明了但还没有定义的时候会返回 undefined，null主要用于赋值给一些可能会返回对象的变量，作为初始化。

undefined 在 JavaScript 中不是一个保留字，这意味着可以使用 undefined 来作为一个变量名，但是这样的做法是非常危险的，它会影响对 undefined 值的判断。我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。

当对这两种类型使用 typeof 进行判断时，Null 类型化会返回 “object”，这是一个历史遗留的问题。当使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。

## typeof null 的结果是什么，为什么？

typeof null 的结果是Object。

在 JavaScript 第一个版本中，所有值都存储在 32 位的单元中，每个单元包含一个小的 类型标签(1-3 bits) 以及当前要存储值的真实数据。类型标签存储在每个单元的低位中，共有五种数据类型：

```js
000: object   - 当前存储的数据指向一个对象。

  1: int      - 当前存储的数据是一个 31 位的有符号整数。

010: double   - 当前存储的数据指向一个双精度的浮点数。

100: string   - 当前存储的数据指向一个字符串。

110: boolean  - 当前存储的数据是布尔值。
```

如果最低位是 1，则类型标签标志位的长度只有一位；如果最低位是 0，则类型标签标志位的长度占三位，为存储其他四种数据类型提供了额外两个 bit 的长度。

有两种特殊数据类型：

1. ●undefined的值是 (-2)30(一个超出整数范围的数字)；
2. ●null 的值是机器码 NULL 指针(null 指针的值全是 0)

那也就是说null的类型标签也是000，和Object的类型标签一样，所以会被判定为Object。

## intanceof 操作符的实现原理及实现

 instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。

```js
function myInstanceof(left, right) {

  // 获取对象的原型

  let proto = Object.getPrototypeOf(left)

  // 获取构造函数的 prototype 对象

  let prototype = right.prototype; 

 

  // 判断构造函数的 prototype 对象是否在对象的原型链上

  while (true) {

   if (!proto) return false;

    if (proto === prototype) return true;

    // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型

    proto = Object.getPrototypeOf(proto);

  }

}
```

## 为什么0.1+0.2 ! == 0.3，如何让其相等

在开发过程中遇到类似这样的问题：

```js
let n1 = 0.1, n2 = 0.2

console.log(n1 + n2)  // 0.30000000000000004
```

这里得到的不是想要的结果，要想等于0.3，就要把它进行转化：

```js
(n1 + n2).toFixed(2) // 注意，toFixed为四舍五入
```

toFixed(num) 方法可把 Number 四舍五入为指定小数位数的数字。那为什么会出现这样的结果呢？

计算机是通过二进制的方式存储数据的，所以计算机计算0.1+0.2的时候，实际上是计算的两个数的二进制的和。0.1的二进制是0.0001100110011001100...（1100循环），0.2的二进制是：0.00110011001100...（1100循环），这两个数的二进制都是无限循环的数。那JavaScript是如何处理无限循环的二进制小数呢？

一般我们认为数字包括整数和小数，但是在 JavaScript 中只有一种数字类型：Number，它的实现遵循IEEE 754标准，使用64位固定长度来表示，也就是标准的double双精度浮点数。在二进制科学表示法中，双精度浮点数的小数部分最多只能保留52位，再加上前面的1，其实就是保留53位有效数字，剩余的需要舍去，遵从“0舍1入”的原则。

## 如何获取安全的 undefined 值？

因为 undefined 是一个标识符，所以可以被当作变量来使用和赋值，但是这样会影响 undefined 的正常判断。表达式 void ___ 没有返回值，因此返回结果是 undefined。void 并不改变表达式的结果，只是让表达式不返回值。因此可以用 void 0 来获得 undefined。

## typeof NaN 的结果是什么？

NaN 指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。

```js
typeof NaN; // "number"
```

NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 NaN !== NaN 为 true。

 10. isNaN 和 Number.isNaN 函数的区别？

 1. ●函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
 2. ●函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，不会进行数据类型的转换，这种方法对于 NaN 的判断更为准确。

## 其他值到字符串的转换规则？

1. Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，
2. ●Boolean 类型，true 转换为 "true"，false 转换为 "false"。
3. ●Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。
4. ●Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。
5. ●对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。

## 其他值到数字值的转换规则？

1. ●Undefined 类型的值转换为 NaN。
2. ●Null 类型的值转换为 0。
3. ●Boolean 类型的值，true 转换为 1，false 转换为 0。
4. ●String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。
5. ●Symbol 类型的值不能转换为数字，会报错。
6. ●对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有valueOf()方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。

如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

## 其他值到布尔类型的值的转换规则？

以下这些是假值：

- • undefined
- • null
- • false
- • +0、-0 和 NaN
- • ""

假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。

## || 和 && 操作符的返回值？

|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先强制转换为布尔类型，然后再执行条件判断。

1. ●对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。
2. ●&& 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果

|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先强制转换为布尔类型，然后再执行条件判断。

●对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。
●&& 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

## || 和 && 返回它们其中一个操作数的值，而非条件判断的结果

1. ●使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
2. ●使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
3. ●使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。

## 什么是 JavaScript 中的包装类型？

在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象，如：

```js
const a = "abc";
a.length; // 3
a.toUpperCase(); // "ABC"
```

在访问`'abc'.length`时，JavaScript 将'abc'在后台转换成String('abc')，然后再访问其length属性。

JavaScript也可以使用Object函数显式地将基本类型转换为包装类型：

## 如何进行隐式类型转换？

首先要介绍ToPrimitive方法，这是 JavaScript 中每个值隐含的自带的方法，用来将值 （无论是基本类型值还是对象）转换为基本类型值。如果值为基本类型，则直接返回值本身；如果值为对象，其看起来大概是这样：

type的值为number或者string。

（1）当type为number时规则如下：

1. ●调用obj的valueOf方法，如果为原始值，则返回，否则下一步；
2. ●调用obj的toString方法，后续同上；
3. ●抛出TypeError 异常。

（2）当type为string时规则如下：

1. ●调用obj的toString方法，如果为原始值，则返回，否则下一步；
2. ●调用obj的valueOf方法，后续同上；
3. ●抛出TypeError 异常。

可以看出两者的主要区别在于调用toString和valueOf的先后顺序。默认情况下：

1. ●如果对象为 Date 对象，则type默认为string；
2. ●其他情况下，type默认为number。

总结上面的规则，对于 Date 以外的对象，转换为基本类型的大概规则可以概括为一个函数：

而 JavaScript 中的隐式类型转换主要发生在+、-、*、/以及==、>、<这些运算符之间。而这些运算符只能操作基本类型值，所以在进行这些运算前的第一步就是将两边的值用ToPrimitive转换成基本类型，再进行操作。

以下是基本类型的值在不同操作符的情况下隐式转换的规则 （对于对象，其会被ToPrimitive转换成基本类型，所以最终还是要应用基本类型转换规则）：

1. +操作符+操作符的两边有至少一个string类型变量时，两边的变量都会被隐式转换为字符串；其他情况下两边的变量都会被转换为数字。

```js
1 + '23' // '123'

 1 + false // 1 

 1 + Symbol() // Uncaught TypeError: Cannot convert a Symbol value to a number

 '1' + false // '1false'

 false + true // 1
```

2. -、*、\操作符NaN也是一个数字

```js
1 * '23' // 23

 1 * false // 0

 1 / 'aa' // NaN
```

3. 对于==操作符

​ 操作符两边的值都尽量转成number：

```js
3 == true // false, 3 转为number为3，true转为number为1

​ '0' == false //true, '0'转为number为0，false转为number为0

​ '0' == 0 // '0'转为number为0
```

4. 对于<和>比较符

如果两边都是字符串，则比较字母表顺序：

```js
'ca' < 'bd' // false

'a' < 'b' // true
```

其他情况下，转换为数字再比较：

```js
'12' < 13 // true

false > -1 // true
```

以上说的是基本类型的隐式转换，而对象会被ToPrimitive转换为基本类型再进行转换：

```js
var a = {}

a > 2 // false
```

其对比过程如下：

```js
a.valueOf() // {}, 上面提到过，ToPrimitive默认type为number，所以先valueOf，结果还是个对象，下一步

a.toString() // "[object Object]"，现在是一个字符串了

Number(a.toString()) // NaN，根据上面 < 和 > 操作符的规则，要转换成数字

NaN > 2 //false，得出比较结果
```

又比如：

```js
var a = {name:'Jack'}

var b = {age: 18}

a + b // "[object Object][object Object]"
```

运算过程如下：

```js
a.valueOf() // {}，上面提到过，ToPrimitive默认type为number，所以先valueOf，结果还是个对象，下一步

a.toString() // "[object Object]"

b.valueOf() // 同理

b.toString() // "[object Object]"

a + b // "[object Object][object Object]"
```

## \+ 操作符什么时候用于字符串的拼接？

根据 ES5 规范，如果某个操作数是字符串或者能够通过以下步骤转换为字符串的话，+ 将进行拼接操作。如果其中一个操作数是对象（包括数组），则首先对其调用 ToPrimitive 抽象操作，该抽象操作再调用 [[DefaultValue]]，以数字作为上下文。如果不能转换为字符串，则会将其转换为数字类型来进行计算。

简单来说就是，如果 + 的其中一个操作数是字符串（或者通过以上步骤最终得到字符串），则执行字符串拼接，否则执行数字加法。

那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字。

## 为什么会有BigInt的提案？

JavaScript中Number.MAX_SAFE_INTEGER表示最⼤安全数字，计算结果是9007199254740991，即在这个数范围内不会出现精度丢失（⼩数除外）。但是⼀旦超过这个范围，js就会出现计算不准确的情况，这在⼤数计算的时候不得不依靠⼀些第三⽅库进⾏解决，因此官⽅提出了BigInt来解决此问题。

## object.assign和扩展运算法是深拷贝还是浅拷贝，两者区别

扩展运算符：

```js
let outObj = {
  inObj: {a: 1, b: 2}
}
let newObj = {...outObj}
newObj.inObj.a = 2
console.log(outObj) // {inObj: {a: 2, b: 2}}
```

Object.assign():

```js
let outObj = {
  inObj: {a: 1, b: 2}
}
let newObj = Object.assign({}, outObj)
newObj.inObj.a = 2
console.log(outObj) // {inObj: {a: 2, b: 2}}
```

可以看到，两者都是浅拷贝。

1. ●Object.assign()方法接收的第一个参数作为目标对象，后面的所有参数作为源对象。然后把所有的源对象合并到目标对象中。它会修改了一个对象，因此会触发 ES6 setter。
2. ●扩展操作符（…）使用它时，数组或对象中的每一个值都会被拷贝到一个新的数组或对象中。它不复制继承的属性或类的属性，但是它会复制ES6的 symbols 属性。

## 如何判断一个对象是空对象

1. 使用JSON自带的.stringify方法来判断：

   ```js
   
   if(Json.stringify(Obj) == '{}' ){
       console.log('空对象');
   }
   ```

2. 使用ES6新增的方法Object.keys()来判断：

   ```js
   
   if(Object.keys(Obj).length < 0){
       console.log('空对象');
   }
   ```
