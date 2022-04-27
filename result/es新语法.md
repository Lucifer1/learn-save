---
title: ESNEXT
date: 2022-04-22
categories: js
author: ludonghao
---
# ESNEXT <Badge type="tip" text="ludonghao" vertical="middle" /> <Badge type="tip" text="2022.04.24" vertical="middle" />

## 运算符扩展

### [可选链操作符 ?.](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
在引用为空(nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined

```js
res && res.data && res.data.value // 旧写法
res?.data?.value // 新写法
```

### [空值合并运算符 ??](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。

#### 与逻辑或操作符（||）区别
* 逻辑或操作符（||）左侧操作数为0， ''， NaN， null， undefined, 返回右侧操作数
* 空值合并运算符 (??）左侧操作数为null， undefined, 返回右侧操作数
```js
0 || 42 // 42
0 ?? 42 // 0

'' || 'string' // 'string'
'' ?? 'string' // ''
```
#### 与可选链操作符 ?. 一起使用
```js
res?.data?.name ?? ''
```
注意：?? 不能与&& 或 || 混用

### [逻辑空赋值 (??=)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment)
```js
x ??= y
// 等价于
x ?? (x = y)
```
### [逻辑与赋值 (&&=)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment)
```js
x &&= y
// 等价于
x && (x = y)
```
### [逻辑或赋值 (||=)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)
```js
x ||= y
// 等价于
x || (x = y)
```

## 数组扩展
### [Array.prototype.includes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
```js
if (a === 1 || a === 2 || a === 3) // 旧写法
if ([1, 2, 3].includes(a)) // 新写法
```
### [Array.prototype.at](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/at)
```js
arr[arr.length - 1] // 旧写法
arr.at(-1) // 新写法
```

## 字符串扩展
### [String.prototype.includes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
```js
'Blue Whale'.indexOf('Blue') !== -1    // true
'Blue Whale'.includes('Blue') // true
```
### [String.prototype.startsWith](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
```js
/^Hello/.test('Hello World') // true
'Hello World'.startsWith('Hello') // true
```
### [String.prototype.endsWith](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
```js
/World$/.test('Hello World') // true
'Hello World'.endsWith('World') // true
```
### [String.prototype.repeat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)
```js
'abc'.repeat(2) // 'abcabc'
```
### [String.prototype.padStart](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
```js
const date = new Date()
const time = `${date.getHours()}`.padStart(2, '0') + `:${date.getMinutes()}`.padStart(2, '0') + `:${date.getSeconds()}`.padStart(2, '0')
```
### [String.prototype.padEnd](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)
### [String.prototype.replaceAll](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
```js
'aabbcc'.replace(/b/g, '_') // 'aa__cc'
'aabbcc'.replaceAll('b', '_') // 'aa__cc'
```
