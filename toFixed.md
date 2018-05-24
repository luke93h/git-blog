# toFixed踩坑记录
> 吐槽：一直以来对js的使用一直都很满意，知道遇到了toFixed，此文用于踩坑心得。
### 遇到的问题:
1. js的浮点数运算不准确，(a + b).toFixed(2)能解决一部分问题，但并不完美
```javascript
0.1 + 0.2 //0.30000000000000004
(0.1 + 0.2).toFixed(2) // 0.30
0.815 + 0.1 // 0.9149999999999999
(0.815 + 0.1).toFixed(2) // 0.91，错误！期望0.92
```
2. toFixed并不是我们通常理解的“四舍五入”，而是“四舍六入五留双”  
简单来说就是：四舍六入五考虑，五后非零就进一，五后为零看奇偶，五前为偶应舍去，五前为奇要进一。

```javascript
(0.225).toFixed(2) // 0.23
(0.235).toFixed(2) // 0.23，错误！期望0.24
```
### 解决方案
> 网络上有很多种解决方案，可以修正toFixed方法，也可以重新定义四则运算。重新定义四则运算，最为规范，但使用麻烦，故我最终选择了修正toFixed。
> 声明：源码来源于网络，本文只是添加了注释和分析。
```jsx
// 直接替换原型链上的方法，方便使用
Number.prototype.toFixed = function (n) {
  // n为期望保留的位数，超过限定，报错！
  if (n > 20 || n < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }
  // 获取数字
  const number = this;
  // 如果是NaN,或者数字过大，直接返回'NaN'或者类似'1e+21'的科学计数法字符串
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString();
  }
  // 默认保留整数
  if (typeof (n) == 'undefined' || n == 0) {
    return (Math.round(number)).toString();
  }

  // 先获取字符串
  let result = number.toString();
  // 获取小数部分
  const arr = result.split('.');

  // 整数的情况，直接在后面加上对应个数的0即可
  if (arr.length < 2) {
    result += '.';
    for (let i = 0; i < n; i += 1) {
      result += '0';
    }
    return result;
  }

  // 整数和小数
  const integer = arr[0];
  const decimal = arr[1];
  // 如果已经符合要求位数，直接返回
  if (decimal.length == n) {
      return result;
  }
  // 如果小于指定的位数，补上
  if (decimal.length < n) {
    for (let i = 0; i < n - decimal.length; i += 1) {
      result += '0';
    }
    return result;
  }
  // 如果到这里还没结束，说明原有小数位多于指定的n位
  // 先直接截取对应的位数
  result = integer + '.' + decimal.substr(0, n);
  // 获取后面的一位
  const last = decimal.substr(n, 1);

  // 大于等于5统一进一位
  if (parseInt(last, 10) >= 5) {
    // 转换倍数，转换为整数后，再进行四舍五入
    const x = Math.pow(10, n);
    // 进一位后，转化还原为小数
    result = (Math.round((parseFloat(result) * x)) + 1) / x;
    // 再确认一遍
    result = result.toFixed(n);
  }

  return result;
};
```